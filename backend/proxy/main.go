package main

import (
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"errors"
	"flag"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/valyala/fasthttp"
)

var httpClientTimeout = 15 * time.Second
var dialTimeout = 7 * time.Second

var netDialer = &net.Dialer{
	KeepAlive: -1,
	Timeout:   dialTimeout,
	DualStack: true,
}
var localDialFunc = netDialer.Dial

var httpClientLocal = &fasthttp.Client{
	ReadTimeout:         30 * time.Second,
	MaxConnsPerHost:     1024 * 3,
	MaxIdleConnDuration: -1,
	ReadBufferSize:      1024 * 8,
	Dial: func(addr string) (net.Conn, error) {
		// no suitable address found => ipv6 can not dial to ipv4,..
		hostname, port, err := net.SplitHostPort(addr)
		if err != nil {
			if err1, ok := err.(*net.AddrError); ok && strings.Contains(err1.Err, "missing port") {
				hostname, port, err = net.SplitHostPort(strings.TrimRight(addr, ":") + ":80")
			}
			if err != nil {
				return nil, err
			}
		}
		if port == "" || port == ":" {
			port = "80"
		}
		if hostname == "php" {
			// php
			return localDialFunc("unix", "/home/run/php/http.sock")
		}
		// node
		return localDialFunc("unix", "/home/run/node/http.sock")
		// return nil, errors.New("Unexpected error")
		// return localDialFunc("tcp", "["+hostname+"]:"+port)
	},
}

func requestHandler(ctx *fasthttp.RequestCtx) {
	secret, err := os.ReadFile("/secret_check/token")
	if err != nil {
		log.Println(err)
		return
	}

	uri := ctx.RequestURI()
	x := md5.New()
	timeNow := []byte(strconv.FormatInt(time.Now().UnixMilli(), 10))
	x.Write(timeNow)
	x.Write(ctx.URI().Host())
	x.Write(uri)
	x.Write(ctx.Request.Header.Peek("authorization"))
	x.Write(ctx.Request.Body())
	x.Write(secret)
	reqSum := x.Sum(nil)
	defer func() {
		x.Reset()
		x.Write(reqSum)
		body, err := GetResponseBody(&ctx.Response)
		if err != nil {
			log.Println(err)
		}
		x.Write(body)
		x.Write(secret)
		respSum := x.Sum(nil)
		ctx.Response.Header.SetConnectionClose()
		ctx.Response.Header.SetBytesV("request-time", timeNow)
		ctx.Response.Header.Set("request-id", hex.EncodeToString(reqSum))
		ctx.Response.Header.Set("response-id", hex.EncodeToString(respSum))
	}()

	if bytes.HasPrefix(uri, []byte("/cv-editor/")) || bytes.Equal(uri, []byte("/cv-editor")) || bytes.HasPrefix(uri, []byte("/image-sharing/")) || bytes.Equal(uri, []byte("/image-sharing")) {
		// forward to php
		ctx.Request.URI().SetHost("php")
	} else {
		ctx.Request.URI().SetHost("node")
	}
	// forward to node
	err = httpClientLocal.DoTimeout(&ctx.Request, &ctx.Response, httpClientTimeout)
	if err != nil {
		log.Println(err)
	}
}

var listen = flag.String(`l`, `:8081`, `Listen address. Eg: :8443; unix:/tmp/proxy.sock`)

func main() {
	flag.Parse()

	// Server
	var err error
	var ln net.Listener
	if strings.HasPrefix(*listen, `unix:`) {
		unixFile := (*listen)[5:]
		os.Remove(unixFile)
		ln, err = net.Listen(`unix`, unixFile)
		os.Chmod(unixFile, os.ModePerm)
		log.Println(`Listening:`, unixFile)
	} else {
		ln, err = net.Listen(`tcp`, *listen)
		log.Println(`Listening:`, ln.Addr().String())
	}
	if err != nil {
		log.Panicln(err)
	}
	if ln == nil {
		log.Panicln(`Error listening:`, *listen)
	}

	srv := &fasthttp.Server{
		// ErrorHandler: nil,
		Handler:               requestHandler,
		NoDefaultServerHeader: true, // Don't send Server: fasthttp
		// Name: "nginx",  // Send Server header
		ReadBufferSize:                2 * 4096, // Make sure these are big enough.
		WriteBufferSize:               4096,
		ReadTimeout:                   5 * time.Second,
		WriteTimeout:                  time.Second,
		IdleTimeout:                   time.Minute, // This can be long for keep-alive connections.
		DisableHeaderNamesNormalizing: false,       // If you're not going to look at headers or know the casing you can set this.
		// NoDefaultContentType: true, // Don't send Content-Type: text/plain if no Content-Type is set manually.
		MaxRequestBodySize: 10 * 1024 * 1024, // 10MB
		DisableKeepalive:   false,
		KeepHijackedConns:  false,
		// NoDefaultDate: len(*staticDir) == 0,
		ReduceMemoryUsage: true,
		TCPKeepalive:      false,
		// TCPKeepalivePeriod: 10 * time.Second,
		// MaxRequestsPerConn: 1000,
		// MaxConnsPerIP: 20,
	}

	log.Panicln(srv.Serve(ln))
}

// GetResponseBody return plain response body of resp
func GetResponseBody(resp *fasthttp.Response) ([]byte, error) {
	var contentEncoding = string(resp.Header.Peek("Content-Encoding"))
	if len(contentEncoding) < 1 {
		return resp.Body(), nil
	}
	if contentEncoding == "br" {
		return resp.BodyUnbrotli()
	}
	if contentEncoding == "gzip" {
		return resp.BodyGunzip()
	}
	if contentEncoding == "deflate" {
		return resp.BodyInflate()
	}
	return nil, errors.New("unsupported response content encoding: " + string(contentEncoding))
}
