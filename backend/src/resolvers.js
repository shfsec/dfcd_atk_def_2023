import models from '../models/index.js' // for associations
import url from 'node:url'
import path from 'node:path'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize'
import graphqlSequelize from 'graphql-sequelize'
// Tell `graphql-sequelize` where to find the DataLoader context in the
// global request context
graphqlSequelize.resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY, }
const resolver = (model, opts = {}) => {
  /**
    * Manipulate the query before it's sent to Sequelize.
    * @param findOptions {object} - Options sent to Seqeulize model's find function
    * @param args {object} - The arguments from the incoming GraphQL query
    * @param context {object} - Resolver context, see more at GraphQL docs below.
    * @returns findOptions or promise that resolves with findOptions
    */
  opts.before = (findOptions, args, context) => {
    if (!findOptions.limit || findOptions.limit > 50) findOptions.limit = 50
    return findOptions;
  }
  /**
   * Manipulate the Sequelize find results before it's sent back to the requester.
   * @param result {object|array} - Result of the query, object or array depending on list or not.
   * @param args {object} - The arguments from the incoming GraphQL query
   * @param context {object} - Resolver context, see more at GraphQL docs below.
   * @returns result(s) or promise that resolves with result(s)
   */
  opts.after = (result, args, context) => {
    return result;
  }
  return graphqlSequelize.resolver(model, opts)
}

import { OAuth2Client } from 'google-auth-library'
const GOOGLE_CLIENT_ID = '211801194209-jo1hjru76gamk0ad39dsm2takk9l1q4d.apps.googleusercontent.com'
const oauth2Client = new OAuth2Client(GOOGLE_CLIENT_ID)

import Task from '../models/task.model.js'
import User from '../models/user.model.js'
import password from '../password.js'
import jwt from '../jwt.js'
import Role from '../models/role.model.js'
import { Op } from 'sequelize'
import uuid from 'uuid'
import Passwd from '../models/passwd.model.js'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import { NodeVM, VM } from "vm2"
import util from 'util'
import MP3Tag from 'mp3tag.js'

import { parseString } from "xml2js"
// Convert string/XML to JSON
function toJson(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false }, function (err, r) {
      if (err) return reject(err)
      resolve(r)
    })
  })
}

const resolvers = {
  SequelizeJSON: graphqlSequelize.JSONType,

  // So admin panel can call this
  Query: {
    user: resolver(User),
    users: resolver(User),

    task: resolver(Task),
    tasks: resolver(Task),

    role: resolver(Role),
    roles: resolver(Role),

    // passwds: resolver(Passwd),
    passwd: resolver(Passwd),
  },
  User: {
    passwds: resolver(User.Passwds),
    tasks: resolver(User.Tasks),
    role: resolver(User.Role),
  },
  Task: {
    owner: resolver(Task.Owner),
  },

  Mutation: {
    signUp: async (parent, args) => {
      if (await User.findOne({
        where: {
          [Op.or]: [
            { email: args.user.email },
            { username: args.user.username },
          ]
        }
      })) throw new Error('Username, email exist!')
      args.user.uuid = '1'
      return User.create(args.user)
    },

    signIn: async (parent, args) => {
      const user = await User.findOne({
        where: {
          [Op.or]: [{
            email: args.key
          }, {
            username: args.key
          }],
        }
      })
      if (!user) throw new Error('No user found')
      if (!await password.verify(args.password, user.password)) throw new Error('Password does not match!')
      return {
        access_token: await jwt.create(user),
        user
      }
    },

    signInWithGoogle: async (parent, args) => {
      const ticket = await oauth2Client.verifyIdToken({
        idToken: args.idToken,
        audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      })

      const payload = ticket.getPayload()

      // const [r] = await dbPromisePool.query(`insert into users (username, password, name, create_at, phone, email, active) values (?, ?, ?, ?, ?, ?, '1')`, [uuid.v4(), googleTokenPassword, String(payload.name), Math.floor(Date.now() / 1000), null, String(payload.email)])

      const [created, user] = await User.findOrCreate({
        where: {
          email: String(payload.email)
        },
        defaults: args.user
      })

      return {
        access_token: await jwt.create(user),
        user
      }
    },

    addTask: async (parent, args, ctx) => {
      if (!ctx.captchaOk) throw new Error('Please solve the captcha')
      return Task.create(args.task)
    },

    updateTask: async (parent, args) => {
      return Task.update(args.task, {
        where: {
          id: args.id
        }
      })
    },

    addPasswd: async (parent, args, ctx) => {
      args.passwd.UserId = ctx.user.id
      const parts = args.passwd.password.split(',')
      parts.pop()
      args.passwd.password = parts.join(',')
      return Passwd.create(args.passwd)
    },

    deletePasswd: async (parent, args, ctx) => {
      const oldPasswd = Passwd.findOne({
        where: {
          UserId: ctx.user.id,
          id: args.id
        }
      })
      if (!oldPasswd) throw new Error('No password found')
      return Passwd.destroy({
        where: {
          id: args.id
        }
      })
    },

    cv2Pdf: async (parent, args) => {
      return new Promise((resolve, reject) => {
        const filename = `${uuid.v4()}.pdf`
        const filepath = `${__dirname}/../files/${filename}`
        const cmd = spawn('/bin/sh', ['-c', `wkhtmltopdf - "${filepath}"`], {
        })
        cmd.stdin.end(args.cv)
        cmd.stdout.pipe(process.stdout)
        cmd.stderr.pipe(process.stdout)
        let exited = false
        const onExit = () => {
          if (exited) return
          exited = true
          if (!fs.existsSync(filepath)) return reject(new Error('Unknown error'))
          resolve(filename)
        }
        cmd.on('close', onExit)
        cmd.on('exit', onExit)
      })
    },

    jsFiddle: async (parent, args) => {
      return new Promise((resolve, reject) => {
        const cmd = spawn('/bin/sh', ['-c', `node vm2.mjs`], {
          cwd: '/opt/src'
        })
        let stdout = ''
        let stderr = ''
        cmd.stdin.end(args.js)
        cmd.stdout.on('data', d => void (stdout += d.toString()))
        cmd.stderr.on('data', d => void (stderr += d.toString()))
        let exited = false
        const onExit = () => {
          if (exited) return
          clearTimeout(intv)
          try{
            cmd.kill('SIGKILL')
          }catch(e){}
          exited = true
          if (stderr) reject(stderr)
          else resolve(stdout)
        }
        const intv = setTimeout(onExit, 5000)
        cmd.on('close', onExit)
        cmd.on('exit', onExit)
      })
    },

    convertXml2Json: async (parent, args) => {
      return JSON.stringify(await toJson(args.xml), null, 2)
    },

    mp3tag: async (parent, args) => {
      const mp3Buffer = Buffer.from(args.mp3Buffer, 'base64')

      // Now, pass it to MP3Tag
      const mp3tag = new MP3Tag(mp3Buffer, true)

      // Read the audio tags if there's any
      mp3tag.read()
      if (mp3tag.errorCode > -1) throw new Error('Error read tags: ' + mp3tag.error)

      const covers = []
      for (const apic of mp3tag.tags?.v2?.APIC || []) {
        const coverpath = 'files/' + uuid.v4() + '.jpg'
        await fs.promises.writeFile(coverpath, Buffer.from(apic.data))
        covers.push(coverpath)
      }
      try {
        delete mp3tag.tags.v2.APIC
      } catch (e) { }
      mp3tag.tags.covers = covers
      const ret = JSON.stringify(mp3tag.tags)
      mp3tag.remove()

      return ret
    }
  },
}

export default resolvers