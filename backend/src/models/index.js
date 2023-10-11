import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import sequelize from './connect.js'
import User from './user.model.js'
import Role from './role.model.js'
import Task from './task.model.js'
import Passwd from './passwd.model.js'
import uuid from 'uuid'
import md5 from '../md5.js'
import getFlag from '../get-flag.js'


const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await Promise.all(fs.readdirSync(__dirname)
  .filter(f => f.endsWith('.model.js'))
  .map(f => {
    return import(path.join(__dirname, f))
  }))

const { default: associationsFn } = await import(path.join(__dirname, 'associations.js'))

await associationsFn(sequelize)
export default sequelize.models

// init data, create schema
// await sequelize.sync({ force: true })

const [r1] = await Role.findOrCreate({
  where: {
    name: 'Admin'
  },
  defaults: {
    name: 'Admin'
  }
})
const [r2] = await Role.findOrCreate({
  where: {
    name: 'Guest'
  },
  defaults: {
    name: 'Guest'
  }
})

const [u1] = await User.findOrCreate({
  where: { username: 'admin_1' },
  defaults: {
    name: 'Admin 1', username: 'admin_1', email: 'admin1@local.host', password: md5(await getFlag()), RoleId: r1.id, uuid: '1'
  }
})
const [u2] = await User.findOrCreate({
  where: { username: 'user_1'},
  defaults: {
    name: 'User 1', username: 'user_1', email: 'user1@local.host', password: 'Abc@1234', RoleId: r2.id, uuid: '1'
  }
})
const [u3] = await User.findOrCreate({
  where: {  username: 'user_2' },
  defaults: {
    name: 'User 2', username: 'user_2', email: 'user2@local.host', password: 'Abc@1234', RoleId: r2.id, uuid: '1'
  }
})

await Task.findOrCreate({
  where: { UserId: u1.id },
  defaults: { desc: 'Task 1: Hello u1', UserId: u1.id }
})
await Task.findOrCreate({
  where: { UserId: u2.id },
  defaults: { desc: 'Task 1: Hello u2', UserId: u2.id }
})
await Task.findOrCreate({
  where: { UserId: u3.id },
  defaults: { desc: 'Task 1: Hello u3', UserId: u3.id }
})

await Passwd.findOrCreate({
  where: {
    username: 'user',
    UserId: u1.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u1.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user1',
    UserId: u1.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user1', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u1.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user2',
    UserId: u1.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user2', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u1.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user',
    UserId: u2.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u2.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user1',
    UserId: u2.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user1', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u2.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user2',
    UserId: u2.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user2', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u2.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user',
    UserId: u3.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u3.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user1',
    UserId: u3.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user1', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u3.id }
})
await Passwd.findOrCreate({
  where: {
    username: 'user2',
    UserId: u3.id
  }, defaults: { url: 'http://1.1.1.1', username: 'user2', password: '13341235,13250234,13251325,13251234,13240325,12250235,13241225,13351224,13251324,12251225,13351334,13241324,13351325,13340324', UserId: u3.id }
})
