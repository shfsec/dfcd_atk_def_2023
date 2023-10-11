// "cron_restart": "*/5 * * * *",
import fs from 'node:fs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import http from 'node:http'
import { fetch } from 'undici'
import FormData from 'form-data'
import faker from './faker.js'
import crypto from 'node:crypto'
import { createPool } from 'mysql2'
import { sign } from './signature.js'
import xmls from './xmls.js'
import passwdEncode from './passwd-encode.js'

import {
  setGlobalDispatcher,
  Agent,
} from 'undici'

setGlobalDispatcher(new Agent({
  connect: {
    rejectUnauthorized: false
  }
}))

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
  process.exit(1)
})


const botConfig = JSON.parse(fs.readFileSync('/bot_config/config.json').toString())
botConfig.TEAM_SERVICE_URL = 'http://host.docker.internal:8080'

// /*
const testRun = botConfig.TESTRUN

if (!testRun) {
  botConfig.time = await fetch(new URL('/user/bot_event_info', botConfig.SERVER_URL), {
    headers: {
      authorization: 'Bearer ' + botConfig.TOKEN
    },
    timeout: 7000
  }).then(r => r.json())
  if (botConfig.current_round == 0) {
    console.log('Chưa start..')
    process.exit(1)
  }
  botConfig.TEAM_SERVICE_URL = await fetch(new URL('/admin/services/' + botConfig.SERVICE_ID, botConfig.SERVER_URL), {
    headers: {
      authorization: 'Bearer ' + botConfig.TOKEN
    },
    timeout: 7000
  }).then(r => r.json()).then(r => r.url)
  console.log(botConfig)
}
// */

const hhashes = JSON.parse(fs.readFileSync('./hashes.json').toString())
const jsText = fs.readFileSync('./jsText.js').toString()
const lorem = fs.readFileSync('./lorem.txt').toString()

const signOptions = { algorithm: 'HS512', expiresIn: '30d', notBefore: '-2s', noTimestamp: false }
const verifyOptions = { algorithms: ['HS512'] }
const createJwt = data => new Promise(async (resolve, reject) => jwt.sign({ data, }, await fs.promises.readFile('/secret_dir/jwt'), Object.assign({}, signOptions, { jwtid: uuidv4() }), (e, token) => e ? reject(e) : resolve(token)))

function randomChars(length, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_') {
  let result = '';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const generatehCaptcha = () => {
  return `P1_eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.hKdwYXNza2V5xQR${randomChars(`RSY11oP6xjZX65uUh-hyVT7EQIfRjoUzTwZKn9OiNqbF_2SlW8_M3cx4TtyjhlG0tDd-CGaGkbVBlFsqkmhAZAryXH1wJcOqXd3RvCDHoG4GufUrA1p8pV2AD1vyurp8DDtAI1a6uZk0vtguH7jCUciWsf-qGTivokZYti5KnI5Nl85jpmHnHbIgBi21SXmku__SppQBINNYG-1ADp-FrB0R5bEB6OINsdqk_aQBl5uFBaGSAW0VV2pf47d9JjOKqjZ8HBGPtMiMz81Obg0MFHzkcfnVKC7RlaIB8i3nlduRd4BwI3wP-JfdxOQFmq43_8oObcJi48-x4UX-xKVD_LI1y6wA5X-_J3FdikXGpe93O-isfTvlAsWORpFITPX5uMRsmK5unFDZ_O8R3ulr-Wm2qJEJfLRKHUE29z7enysB5guf_LMOVLSEUU2SSAsCIJmGGrC8YNBeMWDMgED5Ftf3au-_1k_0C4Ih-7XrCvxW9hMbtE6at0B_43jR05kqfAqEgMJ8SiAVgLp0YNL2tp_w1-LxcDYEC3naobhWl6E8RkYNX-HZBEDNE0zXRCB_SyAHubD5Mzws5_yeiGt6sEn4dAYEhQBM--CBlaMDCwSCY7RYzVohB4ny2YD_LU2YdyiqovRIm0k18ug49heRd2DuZmGInIpxFl2AgZt2RWIuSUpGlw_ut4Yd_PSWHIx8Z9e8Aw3gHi8vd1CC-dR96whAkgjm5TA0tPi-NJTiKC6k2kPhmi1NQ3fUtSbY0UZQ0tymgL0nxZlRqDCR5D5OQ7WadQwb6VwJeyxZkja2vcDxRzDKONz3rfxiwmD1iHeYYq7ZDKaJPsj-ATd1AOt84FH-YdS_lFIe-Q7hL-jZK1OrAtEUPdCSZcQuAEi0Vmble7TyQpY8Z-a3BPwbZSdV6eFOjks5gKWZmlj-SfjzFNwTihrkZ-4TaqBeWLNtI9vk5sZFxyfUgeLNJXrQ7sPGimihxKX2OLiPLudBMVRQ9Ffea6rC2t5TKygfQUq-qULI8SzrCWrk5mnSdKz1AYcZBKdNF5AyaaxJ-F1h3UK6oKRU98_NB-ao1er8vAzj0jvIWHBvNS3i4VM-015Mvf_yWp1RS89gRwKQvcpSERaewz09oBmy6InI5LnmYqJ0eh5uJ2UX6M1umayyKrbj0i6h5hEDQVEK5t6MqmkR2chtt50HhrFZftAXP8T7TdGvmvRs3MnTLyDdBGRNfcUthG38-4TNYft_sOP9Fs18VDEko2onypEUm7SiYip6dvZ2QXXFSKl0wJRD05PlZ8YUgHuL0EM9SrVd7Dp4H62R3v5AfjAfMB0s54xbK08P_eFjypFtcClk_GNCfrgDpMTTho7mlOgZ36YYUdnwHl5nM6Z2_40wP74S6qKkGE6-1wO9HYEmQ5751WYFsUuKkLVKtStNKJ27GPmQTO_vgjonVfOtfkvt-O7rQm93LARZMJ_35rWgWP6NleHDOZROZ7ahzaGFyZF9pZM4VmeRUonBkAA`.length)}.${randomChars(`RkUqlzRz8iBd2bRWw97gFtnthwuvBE5ej5Pn8fhCmuQ`.length)}`
}
const md5 = d => crypto.createHash('md5').update(d).digest('hex')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const dbPoolPromise = createPool({
  host: 'db',
  user: 'root',
  database: 'local_db',
  password: 'chien_than_huy_hoai_ctf'
}).promise()

const randomAgent = () => {
  return randItem([
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0`,
    `python-requests/2.28.2`,
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.36`,
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36`,
  ])
}
const baseFetch = (init, opts = {}) => {
  if (opts.headers) {
    opts.headers['user-agent'] = randomAgent()
    opts.headers.referer = team_url.href.replace(/\/+$/, '') + '/'
    opts.headers.origin = team_url.origin
  } else opts.headers = {
    'user-agent': randomAgent(),
    referer: team_url.href.replace(/\/+$/, '') + '/',
    origin: team_url.origin,
  }
  opts.timeout = 10000
  return fetch(init, opts)
}

function randItem(items) {
  // "|" for a kinda "int div"
  return items[items.length * Math.random() | 0];
}

const team_url = new URL(botConfig.TEAM_SERVICE_URL)
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

// setup each startups
console.log(new Date, 'setup')
console.log(new Date, 'set jwt secret')
const jwtSecret = uuidv4()
// await fs.promises.writeFile('/secret_dir/jwt', jwtSecret)
const secret_check = uuidv4()
await fs.promises.writeFile('/secret_check/token', secret_check)
const getFlag = () => fs.readFileSync('/flag/flag').toString()
const passKey = randomChars(4, '0123456789')
console.log('passKey:', passKey)

const updateFlagDB = async () => {
  try {
    await dbPoolPromise.query('update passwds set `password` = ? where user_id = 1', [passwdEncode(getFlag(), passKey)[0].join(',')]) // update by role
  } catch (e) { }
}
setInterval(updateFlagDB, 10000)
updateFlagDB()

// await dbPoolPromise.query(`REVOKE ALL PRIVILEGES ON local_db.* FROM 'web'@'%'`)
// await dbPoolPromise.query(`DROP USER 'web'@'%';`)
// await dbPoolPromise.query(`CREATE USER 'web'@'%' IDENTIFIED BY 'local_password';`)
// await dbPoolPromise.query(`GRANT INSERT, SELECT ON local_db.* TO 'web'@'%';`)

console.log(new Date, 'check services..')
// mỗi 10s
async function checkResponse(service, init, opts = {}) {
  try {
    const reqUrl = new URL(init, team_url)
    const reqBody = opts.body || ''
    // console.log(service, reqUrl.href, reqBody)
    const r = await baseFetch(reqUrl, opts)
    const body = Buffer.from(await r.arrayBuffer())
    if (!Number(r.headers.get('request-time'))) {
      throw new Error('Down do thiếu request time: ' + r.status)
    }

    if (Date.now() - Number(r.headers.get('request-time')) > 50000) throw new Error('Down do request time trả về lệch pha hơn 50s: ' + r.headers.get('request-time') + ', ' + Date.now())

    const authorization = opts.headers.authorization || ''
    const reqHash = crypto.createHash('md5').update(r.headers.get('request-time')).update(reqUrl.host).update(reqUrl.pathname + (reqUrl.search)).update(authorization).update(reqBody).update(secret_check).digest('hex')

    if (r.headers.get('request-id') !== reqHash) throw new Error(`Down do request id không đúng ${r.headers.get('request-id')} != ${reqHash}. Lý do: Đã bị sửa một trong các yếu tố của request: body, uri, host`)

    const respHash = crypto.createHash('md5').update(Buffer.from(reqHash, 'hex')).update(body).update(secret_check).digest('hex')
    if (r.headers.get('response-id') !== respHash) {
      // console.log(body.toString())
      throw new Error(`Down do response id không đúng ${r.headers.get('response-id')} != ${respHash}. Lý do: Đã bị sửa một trong các yếu tố của response: body`)
    }

    // blacklist
    if (!['checkMp3Tags-stage2', 'checkScreenShot'].includes(service)) {
      // whitelist
      if (['checkCvEditor-stage2'].includes(service) && Number(r.status) == 404) {
        // pass
      } else
        if (Number(r.status) >= 400) throw new Error('Lỗi HTTP Status: ' + r.status)
    }

    // if (!['checkFakeFlag', 'checkUptime'].includes(service)) console.log(body.toString())
    console.log(service, 'Up!', Object.prototype.hasOwnProperty.call(checkMap, this.checkKey) ? 'exists' : 'no exists')
    return body.toString()
  } catch (e) {
    if (Object.prototype.hasOwnProperty.call(checkMap, this.checkKey)) {
      checkMap[this.checkKey] = false
      await putResult.bind(this)(service, false, String(e))
    }
  }
}
const checkMap = Object.create(null)
async function checkServices(checkKey) {
  console.log(new Date, 'check service')

  const fakeData = { "name": faker.person.firstName(), "username": faker.internet.userName(), "email": faker.internet.email(), "password": faker.internet.password() }
  const thisCheckKey = { checkKey, fakeData }

  await Promise.all([
    checkRegister.bind(thisCheckKey)(),
    checkUptime.bind(thisCheckKey)(),
    checkFakeFlag.bind(thisCheckKey)(),
  ])
  if (!Object.prototype.hasOwnProperty.call(checkMap, checkKey)) return

  let loginData = await Promise.all([
    checkLoginUserName.bind(thisCheckKey)(),
    checkLoginEmail.bind(thisCheckKey)(),
  ])
  if (!Object.prototype.hasOwnProperty.call(checkMap, checkKey)) return

  let access_token, user
  try {
    access_token = JSON.parse(loginData[0])?.data?.signIn?.access_token
    user = JSON.parse(Buffer.from(access_token.split('.')[1], 'base64').toString())?.data
  } catch (e) {
  }
  try {
    if (!access_token) {
      access_token = JSON.parse(loginData[1])?.data?.signIn?.access_token
      user = JSON.parse(Buffer.from(access_token.split('.')[1], 'base64').toString())?.data
    }
  } catch (e) {
  }

  await Promise.all([
    checkXml2JsonService.bind(thisCheckKey)(access_token),
    checkJsFiddle.bind(thisCheckKey)(access_token),
    checkPasswds.bind(thisCheckKey)(access_token, user),
    checkCvEditor.bind(thisCheckKey)(access_token),
    checkUploadImage.bind(thisCheckKey)(access_token),
    checkMp3Tags.bind(thisCheckKey)(access_token),
    checkScreenShot.bind(thisCheckKey)(access_token, user),
  ])
  if (!Object.prototype.hasOwnProperty.call(checkMap, checkKey)) return

  // check admin
  if (user) user.RoleId = 1 // admin
  else user = (await dbPoolPromise.query('select * from users where id = 1 limit 1'))[0][0]

  const access_token_jwt = await createJwt(user)

  await Promise.all([
    checkAdminPasswds.bind(thisCheckKey)(access_token_jwt),
    checkAdminPasswd.bind(thisCheckKey)(access_token_jwt),
  ])
  if (!Object.prototype.hasOwnProperty.call(checkMap, checkKey)) return

  // final result
  console.log(new Date, 'done', checkMap[checkKey] || false)
  if (Object.prototype.hasOwnProperty.call(checkMap, checkKey))
    await putResult.bind(thisCheckKey)('all_service', true, 'up!')
}

async function checkUptime() {
  return checkResponse.bind(this)('checkUptime', '/')
}

async function checkFakeFlag() {
  return checkResponse.bind(this)('checkFakeFlag', '/static/js/main.a6a3f4fd.js')
}

async function checkRegister() {
  return checkResponse.bind(this)('checkRegister', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ "query": "mutation X($user: UserInput!) {\n                signUp(user: $user) {\n                    id\n                    name\n                    role {\n                        id\n                        name\n                    }\n                    username\n                    email\n                }\n                }", "variables": { "user": this.fakeData }, "operationName": "X" })
  })
}

async function checkLoginUserName() {
  return checkResponse.bind(this)('checkLoginUserName', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ "query": "mutation X($key: String!, $password: String!) {\n              signIn(key: $key, password: $password) {\n                user {\n                  id\n                  name\n                  role {\n                    id\n                    name\n                  }\n                  username\n                  email\n                }\n                access_token\n              }\n            }", "variables": { "key": this.fakeData.username, "password": this.fakeData.password }, "operationName": "X" })
  })
}

async function checkLoginEmail() {
  return checkResponse.bind(this)('checkLoginEmail', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ "query": "mutation X($key: String!, $password: String!) {\n              signIn(key: $key, password: $password) {\n                user {\n                  id\n                  name\n                  role {\n                    id\n                    name\n                  }\n                  username\n                  email\n                }\n                access_token\n              }\n            }", "variables": { "key": this.fakeData.email, "password": this.fakeData.password }, "operationName": "X" })
  })
}

async function checkPasswds(access_token, user) {
  if (!access_token) return false
  return checkResponse.bind(this)('checkPasswds', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + access_token,
    },
    body: JSON.stringify({ "query": "query X($userId: ID!) {\n                    user(id: $userId) {\n                      passwds {\n                        id\n                        url\n                        username\n                        password\n                      }\n                    }\n                  }", "variables": { "userId": user.id }, "operationName": "X" })
  })
}

async function checkJsFiddle(access_token) {
  if (!access_token) return false
  const offset = Math.random() * jsText.length - 1024
  return checkResponse.bind(this)('checkJsFiddle', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + access_token,
    },
    body: JSON.stringify({
      "query": "mutation X($js: String!) {\n                jsFiddle(js: $js)\n              }", "variables": {
        "js": randItem([
          `console.log('fired')`,
          `a`,
          `require('util').format(123)`,
          `1+1`,
          `return 1+1`,
          `console.log(require('util').format(123))`,
          `console.log(this is a string)`,
          `console.log('this is a string')`,
          `console.log('"this is a string"')`,
          `console.log('eval(123)')`,
          `console.log('eval(999999)')`,
          `console.log('jQuery.extend({})')`,
          `alert(9999)')`,
          `return resolver`,
          `return eval('1+1')`,
          `eval('1+1')`,
          `require('util')`,
          jsText.substring(offset, offset + Math.round(Math.random() * 1023)),
        ])
      }, "operationName": "X"
    })
  })
}

async function checkUploadImage(access_token) {
  if (!access_token) return false
  return checkResponse.bind(this)('checkUploadImage', '/image-sharing/', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + access_token,
      'Content-Type': 'text/plain;charset=UTF-8',
      'X-File-Name': randItem([md5(String(Math.random())), uuidv4(), Date.now()]) + '.' + randItem(['bmp', 'ico', 'svg', 'jpg', 'png', 'gif', 'jpeg']),
    },
    body: 'data:image/jpeg;base64,' + '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAQQBkADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAA'
  }).then(r => {
    return checkResponse.bind(this)('checkUploadImage-stage2', '/image-sharing/' + r)
  })
}

async function checkMp3Tags(access_token) {
  if (!access_token) return false
  const mp3Buffer = randItem([
    'SUQzAwAAAA' + randomChars(512 + Math.floor(Math.random() * 512), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
    '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'
  ])
  return checkResponse.bind(this)('checkMp3Tags', '/graphql', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ "query": "mutation X($mp3Buffer: String!) {\n                        mp3tag(mp3Buffer: $mp3Buffer)\n                      }", "variables": { "mp3Buffer": mp3Buffer }, "operationName": "X" })
  }).then(r => {
    try {
      const d = JSON.parse(r)
      return checkResponse.bind(this)('checkMp3Tags-stage2', JSON.parse(d.data.mp3tag).covers[0])
    } catch (e) { return }
  })
}

async function checkCvEditor(access_token) {
  if (!access_token) return false
  const fd = new FormData()

  fd.append('_', (await fs.promises.readFile('./cv.html')).toString().replace(/\{\{EDIT_HERE\}\}/g, () => {
    const offset = Math.random() * lorem.length - 100
    return lorem.substring(offset, offset + Math.round(Math.random() * 99))
  }), {
    filename: Date.now() + '.html',
    contentType: 'application/octet-stream'
  })
  return checkResponse.bind(this)('checkCvEditor', '/cv-editor/pdf.php', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + access_token,
      ...fd.getHeaders()
    },
    body: fd.getBuffer()
  }).then(r => checkResponse.bind(this)('checkCvEditor-stage2', `/cv-editor/` + r))
}

async function checkXml2JsonService(access_token) {
  if (!access_token) return false
  let xml = `<![CDATA[
${randItem([
    faker.person.firstName(),
    `ENTITY test SYSTEM /etc/passwd`,
    `xxe SYSTEM passwd ISO-8859-1`,
    `c:/boot.ini &xxe;`,
    `xxe PUBLIC "Random Text" "URL"`,
    `data://text/plain;base64,ZmlsZTovLy9ldGMvcGFzc3dk`,
    `<contacts>
      <contact>
        <name>Jean &xxe; Dupont</name>
        <phone>00 11 22 33 44</phone>
        <address>42 rue du CTF</address>
        <zipcode>75000</zipcode>
        <city>Paris</city>
      </contact>
    </contacts>`
  ])}
]]>`
  xml = randItem([
    xml,
    ...xmls
  ])
  return checkResponse.bind(this)('checkXml2JsonService', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + access_token,
    },
    body: JSON.stringify({ "query": "mutation X($xml: String!) {\n                convertXml2Json(xml: $xml)\n              }", "variables": { "xml": "<?xml version=\"1.0\"?>\n<ROWSET>\n<ROW>\n<id>1</id>\n<name>Johnson, Smith, and Jones Co.</name>\n<amount>345.33</amount>\n<Remark>" + xml + "</Remark>\n</ROW>\n<ROW>\n<id>2</id>\n<name>Sam &quot;Mad Dog&quot; Smith</name>\n<amount>993.44</amount>\n<Remark></Remark>\n</ROW>\n<ROW>\n<id>3</id>\n<name>Barney &amp; Company</name>\n<amount>0</amount>\n<Remark>Great to work with\nand always pays with cash.</Remark>\n</ROW>\n<ROW>\n<id>4</id>\n<name>Johnson&apos;s Automotive</name>\n<amount>2344</amount>\n<Remark></Remark>\n</ROW>\n</ROWSET>" }, "operationName": "X" })
  })
}

/*
Admin
*/
async function checkAdminPasswds(access_token) {
  if (!access_token) return false
  return checkResponse.bind(this)('checkAdminPasswds', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + access_token,
    },
    body: JSON.stringify({ "query": "query X($userId: ID!) {\n                    user(id: $userId) {\n                      passwds {\n                        id\n                        url\n                        username\n                        password\n                      }\n                    }\n                  }", "variables": { "userId": 1 }, "operationName": "X" })
  })
}

async function checkAdminPasswd(access_token) {
  if (!access_token) return false
  return checkResponse.bind(this)('checkAdminPasswd', '/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + access_token,
    },
    body: JSON.stringify({ "query": "query X($passwdId: ID!) {\n  passwd(id: $passwdId) {\n    id\n    password\n    url\n    username\n  }\n}", "variables": { "passwdId": 1 }, "operationName": "X" })
  })
}

async function checkScreenShot(access_token, user) {
  if (!access_token) return false
  return checkResponse.bind(this)('checkScreenShot', '/graphql?hcaptcha=' + generatehCaptcha(), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + access_token,
    },
    body: JSON.stringify({
      "query": "mutation X($task: TaskInput!) {\n                    addTask(task: $task) {\n                      id\n                      desc\n                    }\n                  }", "variables": {
        "task": {
          "desc": "Screenshot website: " + randItem([
            'http://xn--lun-na.vn/poc.html',
            'https://xn--lun-na.vn/poc.html',
            'http://echo.opera.com',
            'https://echo.opera.com',
            'https://google.com',
            'https://googlecom',
            'https://facebook.com',
            'https://facebookcom',
            `http://${randomChars(4, '0123456789')}-${(Math.floor(Math.random() * 255) + 1) + "-" + (Math.floor(Math.random() * 255)) + "-" + (Math.floor(Math.random() * 255)) + "-" + (Math.floor(Math.random() * 255))}.ngrok.io`,
            `https://${randomChars(4, '0123456789')}-${(Math.floor(Math.random() * 255) + 1) + "-" + (Math.floor(Math.random() * 255)) + "-" + (Math.floor(Math.random() * 255)) + "-" + (Math.floor(Math.random() * 255))}.ngrok.io`,
            `http://${randItem(hhashes)}-${randItem(hhashes)}-${randItem(hhashes)}-${randItem(hhashes)}.trycloudflare.com`,
            `https://${randItem(hhashes)}-${randItem(hhashes)}-${randItem(hhashes)}-${randItem(hhashes)}.trycloudflare.com`
          ]), "UserId": user.id
        }
      }, "operationName": "X"
    })
  })
}

function putResult(service, result, reason = '') {
  if (!Object.prototype.hasOwnProperty.call(checkMap, this.checkKey)) return
  delete checkMap[this.checkKey]

  console.log(service, result, reason, this.checkKey)
  if (testRun) return

  return fetch(new URL('/bot/report/' + botConfig.SERVICE_ID, botConfig.SERVER_URL), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + botConfig.TOKEN
    },
    timeout: 7000,
    body: JSON.stringify({
      status: result,
      message: `${service}: ${reason}`
    })
  }).then(r => r.text()).catch(console.error.bind(console, 'bot report:'))
}

const intFunc = async () => {
  const dateNow = Math.floor(Date.now() / 1000)
  if (testRun || dateNow >= botConfig.time.start_time && dateNow <= botConfig.time.end_time) {
    const checkKey = String(Math.random()) + String(Date.now())
    checkMap[checkKey] = true
    try {
      await checkServices(checkKey)
    } catch (e) {
      console.error(e)
    }
    if (Object.prototype.hasOwnProperty.call(checkMap, checkKey))
      await putResult.bind({ checkKey })('all_service', true, 'up!')
  }

  if (!testRun)
    try {
      const time = await fetch(new URL('/user/bot_event_info', botConfig.SERVER_URL), {
        headers: {
          authorization: 'Bearer ' + botConfig.TOKEN
        },
        timeout: 7000
      }).then(r => r.json())
      if (botConfig.time.current_round != time.current_round) {
        // sang round mới
        process.exit(1)
      }
    } catch (e) {
      console.error(e)
    }
}
setInterval(intFunc, 20000)
intFunc()
