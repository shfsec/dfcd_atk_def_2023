// docker run -it --rm -w /opt -v /tmp/playwright:/tmp/files:rw -v /mnt/d/home/irlab-auto-verify:/opt/app:ro --ipc=host mcr.microsoft.com/playwright:v1.32.0-focal /bin/bash
// untrusted website
// docker run -it --rm --ipc=host --user pwuser --security-opt seccomp=seccomp_profile.json mcr.microsoft.com/playwright:v1.32.0-focal /bin/bash
// npm i playwright undici

import { chromium, firefox, webkit, devices } from 'playwright'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
import crypto from 'crypto'
const sha256 = b => crypto.createHash('sha256').update(b).digest('hex')
import fs from 'fs'
import path from 'path'
import { fetch, FormData } from 'undici'

import { createPool } from 'mysql2'
const dbPoolPromise = createPool({
  host: 'db',
  user: 'root',
  database: 'local_db',
  password: 'chien_than_huy_hoai_ctf'
}).promise()
while (true) {
  try {
    const conn = await dbPoolPromise.getConnection()
    conn.release()
    break
  } catch (e) {
    console.error(e)
  }
  await delay(2000)
}
console.log('Database is ready..')


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const defaultOpts = {
  headers: {
    'Content-Type': 'application/json',
  }
}

let browser
let exited = false
async function exitHandler(options, exitCode) {
  if (exited) return
  exited = true
  console.log('Exiting..')

  try {
    if (browser)
      await browser.close()
  } catch (e) {
    console.error(e)
  }

  if (exitCode || exitCode === 0) console.log('exitCode:', exitCode)
  if (options.exit) process.exit(exitCode || 0)
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }))

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }))

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }))

const browserReady = chromium.launch().then(b => {
  browser = b
  b.once('disconnected', exitHandler.bind(null, { exit: true }, 1))
}).catch(e => {
  console.error(e)
  exitHandler()
})


const iPhone = devices['iPhone 12 Pro']
// true: verify not error, false: verify error please retry
async function genPDFWebsite(url) {
  let finalResult = false
  if (!browser) return finalResult
  if (!browser.isConnected()) return finalResult

  let browserContext
  const intv = setTimeout(() => {
    console.log('timedout')
    if (browserContext) browserContext.close()
  }, 25000)
  try {
    // Create a new incognito browser context
    const ctxOpt = {}
    delete ctxOpt.recordVideo
    ctxOpt.hasTouch = false
    ctxOpt.serviceWorkers = 'block'
    ctxOpt.ignoreHTTPSErrors = true
    ctxOpt.acceptDownloads = false
    // ctxOpt.viewport = null
    // ctxOpt.screen = null
    // ctxOpt.deviceScaleFactor = 1
    console.log('Start pdf:', url)
    browserContext = await browser.newContext(ctxOpt)
    // Add addInitScript
    await browserContext.addInitScript({
      content: `window.alert = console.log; window.confirm = console.log;`
    })
    await browserContext.clearPermissions()
    // await browserContext.setDefaultTimeout(1000) // include wait events
    await browserContext.setDefaultNavigationTimeout(20000)

    /* console
    browserContext.on('console', async msg => {
      const values = []
      for (const arg of msg.args())
        values.push(await arg.jsonValue())
      console.log('[browserContext]', ...values)
    })
    // */
    // accept dialog
    browserContext.on('dialog', dialog => {
      dialog.accept()
    })

    const page = await browserContext.newPage()

    try {
      await page.goto(url, { waitUntil: 'networkidle' })
      finalResult = true
    } catch (e) {
      console.error(e)
      // set error
      await page.goto('about:blank')
      await page.setContent(`
            <div style="font-size: 40px; font-weight: bold;">Loading error: <span id="title" style="color: red"></span></div>
            <script>title.innerText = ${JSON.stringify(url + "\r\n\r\n" + e)}</script>
          `)
    }

    const path = '/tmp/'
    const filepath = 'files/pdf-' + crypto.randomBytes(16).toString('hex') + '.pdf'
    await page.emulateMedia({ media: 'screen' })
    await page.pdf({ path: path + filepath, format: 'A4' })

    // done, close context
    if (browserContext) try {
      await browserContext.close()
      browserContext = undefined
    } catch (e) { }
    finalResult = filepath
  } catch (e) {
    // error
    if (browserContext) try {
      await browserContext.close()
    } catch (e) { }
    console.error(e)
    clearTimeout(intv)
    return finalResult
  }
  // success
  if (browserContext) try {
    await browserContext.close()
  } catch (e) { }
  clearTimeout(intv)
  return finalResult
}

console.log('Play is running..')
browserReady.then(async () => {
  console.log('Browser is ready!')
  do {
    try {
      if (browser && !browser.isConnected()) {
        exitHandler({ exit: true }, 1)
        return
      }
      const text = 'Screenshot website: '
      const [rows] = await dbPoolPromise.query(`select * from tasks where result is null AND \`desc\` like "${text}%"`)
      for (const r of rows) {
        try {
          const url = r.desc.substring(text.length)
          const parsed = new URL(url, 's://1/')
          if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('denied protocol: ' + parsed.protocol)
          const filepath = await genPDFWebsite(url)
          if (typeof filepath === 'string')
            await dbPoolPromise.query(`update tasks set result = ? where result is null AND id = ? limit 1`, [filepath, r.id])
          else
            await dbPoolPromise.query(`update tasks set result = ? where result is null AND id = ? limit 1`, ['Error during export pdf', r.id])
        } catch (e) {
          console.error(e)
          try {
            await dbPoolPromise.query(`update tasks set result = ? where result is null AND id = ? limit 1`, [String(e), r.id])
          } catch (e) { }
        }
      }
    } catch (e) {
      console.error(e)
    }
    await delay(2000)
  } while (true)
}).then(console.log).then(async () => {
  try {
    await browser.close()
  } catch (e) { }
  exitHandler({ exit: true }, 0)
}).catch(e => {
  console.error(e)
  exitHandler({ exit: true }, 1)
})
