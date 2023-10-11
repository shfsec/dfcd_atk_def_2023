// /*
import argon2 from 'argon2'
export default {
  hash: argon2.hash, // plaintext
  verify: (plaintext, hash) => argon2.verify(hash, plaintext), // hash, plaintext
}
// */
/*
const bcrypt = require('bcryptjs')
module.exports = exports = {
  hash: plaintext => new Promise((resolve, reject) => bcrypt.hash(plaintext, 10, (e, hash) => e ? reject(e) : resolve(hash))),
  verify: bcrypt.compare, // plaintext, hash 
}
// */