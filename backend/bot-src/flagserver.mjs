import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fs from 'node:fs'


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

const getFlag = () => {
  return fs.readFileSync('/flag/flag').toString()
}

const fastify = Fastify({
  bodyLimit: 5,
  logger: false
})
fastify.addHook('preValidation', async (req, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
})

fastify.register(fastifyStatic, {
  root: '/opt/src/git-repo/',
  decorateReply: false,
})

fastify.get('/very-long-flag-part3-what-you-dont-guest-hi', (req, reply) => {
  reply.send(`Well done! Flag part 3: ${getFlag().substring(20)}`)
})

fastify.get('/', (req, reply) => {
  reply.send(`OK, flag part 2/3: ${getFlag().substring(10, 20)}
// Hint part 3:
// hack me
`)
})
// https://github.com/Rust-for-Linux/linux/blob/0bb80ecc33a8fb5a682236443c1e740d5c917d1d/Documentation/networking/ip-sysctl.rst#ip-variables
fastify.listen({ port: 0, host: '127.0.0.1' }, () => {
  console.log('Flag server 2 running at', fastify.addresses())
})

const app1 = Fastify({
  bodyLimit: 5,
  logger: false
})
app1.get('/', (req, reply) => {
  reply.send(`OK, flag part 1/3: ${getFlag().substring(0, 10)}

// Hint part 2:
fastify.listen({ port: 0, host: '127.0.0.1' }, () => {
  console.log('Flag server 2 running at', fastify.addresses())
})
`)
})
// https://github.com/Rust-for-Linux/linux/blob/0bb80ecc33a8fb5a682236443c1e740d5c917d1d/Documentation/networking/ip-sysctl.rst#ip-variables
app1.listen({ port: 8080, host: '127.0.0.1' }, () => {
  console.log('Flag server 1 running at', app1.addresses())
})

