import uuid from 'uuid'
import jwt from 'jsonwebtoken'
import fs from 'node:fs'

const secret = () => {
  return fs.readFileSync('/secret_dir/jwt').toString()
}
const signOptions = { algorithm: 'HS512', expiresIn: '30d', notBefore: '-2s', noTimestamp: false }
const verifyOptions = { algorithms: ['HS512'] }

export default {
  // Return token string
  create: data => new Promise((resolve, reject) => jwt.sign({ data, }, secret(), Object.assign({}, signOptions, { jwtid: uuid.v4() }), (e, token) => e ? reject(e) : resolve(token))),
  // Return data object
  verify: token => new Promise((resolve, reject) => jwt.verify(token, secret(), verifyOptions, (e, decoded) => e ? reject(e) : resolve(decoded.data))),
  // Return new token string
  refresh: token => new Promise((resolve, reject) => {
    jwt.verify(token, secret(), verifyOptions, (e, payload) => {
      if (e) return reject(e)
      delete payload.iat
      delete payload.exp
      delete payload.nbf
      delete payload.jti //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
      const newSignOptions = Object.assign({}, signOptions, { jwtid: uuid.v4() })
      // The first signing converted all needed options into claims, they are already in the payload
      jwt.sign(payload, secret(), newSignOptions, (e, token) => e ? reject(e) : resolve(token))
    })
  }),
}