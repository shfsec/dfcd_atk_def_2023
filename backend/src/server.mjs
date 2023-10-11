process.on('uncaughtException', err => {
  console.error((new Date()).toUTCString(), 'uncaughtException:', err)
  process.exit(1)
})
process.on('SIGINT', err => {
  console.error((new Date()).toUTCString(), 'SIGINT:', err)
  process.exit(1)
})
process.on('SIGTERM', err => {
  console.error((new Date()).toUTCString(), 'SIGTERM:', err)
  process.exit(1)
})

process.on('ELIFECYCLE', err => {
  console.error((new Date()).toUTCString(), 'ELIFECYCLE:', err)
  process.exit(1)
})
process.on('unhandledRejection', (err) => {
  console.error((new Date()).toUTCString(), 'unhandledRejection:', err)
})

import url from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
const fastify = Fastify({
  bodyLimit: 5 * 1024 * 1024,
  logger: false
})

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'files'),
  prefix: '/files/'
})

fastify.register(fastifyStatic, {
  root: '/home/public_html/',
  decorateReply: false,
})

fastify.setErrorHandler((error, request, reply) => {
  console.error(`[fastify]`, error)
  reply.status(503).send({ error: 'Please try again later' })
})

import models from './models/index.js'
import User from './models/user.model.js'

// authen
import jwt from './jwt.js'
import constants from './constants.js'

const HCAPTCHA_SECRET = `0x115f55C9F10b3DD85ECA04a70D2a95b8c1A0E1CF`

// Check login user, cors
const corsDomains = [constants.ROOT_DOMAIN, '127.0.0.1', 'localhost']
fastify.addHook('preValidation', async (req, reply) => {

  // Check cors
  if (req.headers.origin)
    try {
      const origin = new URL(req.headers.origin, 'a://b')
      for (const d of corsDomains) {
        if (d === origin.hostname || origin.hostname.endsWith('.' + d)) {
          // allows origin
          if (req.headers['access-control-request-headers']) reply.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
          if (req.headers['access-control-request-method']) reply.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'])
          reply.header('Access-Control-Allow-Credentials', 'true')
          reply.header('Access-Control-Allow-Origin', req.headers.origin)
        }
      }
    } catch (e) { }

  if (['OPTIONS', 'HEAD'].includes(req.method.toUpperCase())) return reply.status(200).send()

  req.query.captchaOk = false
  if (req.query?.hcaptcha) {
    const resp = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: (new URLSearchParams({
        secret: HCAPTCHA_SECRET,
        response: String(req.query.hcaptcha),
      })).toString(),
    }).then(r => r.json())
    if (!resp.success) return reply.send({ error: 'Please resubmit the form' })
    req.query.captchaOk = true
  }

  // Check jwt
  let authorization = req.headers['authorization']
  if (/Bearer /i.test(authorization)) authorization = authorization.substring(7)
  else authorization = undefined

  if (authorization) {
    let jwtData
    try {
      jwtData = await jwt.verify(authorization)
    } catch (e) {
      console.error(e)
      return reply.send({ error: 'Please login first' })
    }

    // Check db
    try {
      const u = await User.findByPk(jwtData.id)
      req.user = u
    } catch (e) {
      return reply.send({ error: 'Please login first' })
    }
  }

  // whitelist basic http route auth, not thehive cookie
  const url = new URL(req.url, 'http://a')
  if (['/signup', '/login', '/graphql'].includes(url.pathname) || url.pathname.startsWith('/files/')) return

  // static files
  // if (!req.user) return reply.send({ error: 'Please login first' })
})

// fastify
import compress from "@fastify/compress"
import cors from "@fastify/cors"
// import helmet from "@fastify/helmet"
import rateLimit from "@fastify/rate-limit"
await fastify.register(rateLimit)
// await fastify.register(helmet)
await fastify.register(cors)
await fastify.register(compress)

// graphql
import { ApolloServer } from "@apollo/server"
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from "@as-integrations/fastify"
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize'

import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers.js'
import sequelize from './models/connect.js'

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [fastifyApolloDrainPlugin(fastify)],
  introspection: true,
  modules: [],
})
await apollo.start()

fastify.route({
  url: "/graphql",
  method: ["POST", "OPTIONS"/*, "GET"*/],
  handler: fastifyApolloHandler(apollo, {
    context: async (req, reply) => {
      let user
      if (req.user) user = req.user
      else if (req.headers.authorization) {
        let authorization = req.headers['authorization']
        if (/Bearer /i.test(authorization)) authorization = authorization.substring(7)
        else authorization = undefined

        if (authorization) {
          let jwtData
          try {
            jwtData = await jwt.verify(authorization)
          } catch (e) {
            console.error(e)
            return reply.send({ error: 'Please login first' })
          }

          // Check db
          try {
            user = await User.findByPk(jwtData.id)
          } catch (e) {
            return reply.send({ error: 'Please login first' })
          }
        }
      }


      // For each request, create a DataLoader context for Sequelize to use
      const dataloaderContext = createContext(sequelize)

      // Using the same EXPECTED_OPTIONS_KEY, store the DataLoader context
      // in the global request context
      return {
        [EXPECTED_OPTIONS_KEY]: dataloaderContext,
        user,
        captchaOk: req.query.captchaOk
      }
    }
  }),
})

fastify.get('/files/:file', (req, reply) => {
  reply.sendFile(req.params.file)
})

const unixSocket = '/tmp/.run/http.sock'
if (unixSocket && fs.existsSync(unixSocket)) fs.unlinkSync(unixSocket)
fastify.listen(process.env.PORT ? { port: process.env.PORT, host: '::' } : { path: unixSocket }, () => {
  if (!process.env.PORT)
    try {
      fs.chmodSync(unixSocket, 755)
    } catch (e) {
      console.error(e)
    }
  console.log('Server running at', fastify.addresses())
})