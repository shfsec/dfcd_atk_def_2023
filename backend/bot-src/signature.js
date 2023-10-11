import crypto from 'node:crypto'
import fs from 'node:fs'

let privateKey, publicKey
if (!fs.existsSync('/secret_dir/key.pub')) {
  const gen = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  })
  privateKey = gen.privateKey
  publicKey = gen.publicKey
  fs.writeFileSync('/secret_dir/key.pub', publicKey)
  fs.writeFileSync('/secret_check/priv.key', privateKey)
} else {
  privateKey = fs.readFileSync('/secret_check/priv.key').toString()
}

export const sign = d => {
  const sign = crypto.createSign('SHA256')
  sign.update(d)
  sign.end()
  return sign.sign(privateKey)
}

export const verify = (data, signature) => {
  const verify = crypto.createVerify('SHA256')
  verify.update(data)
  verify.end()
  return verify.verify(publicKey, signature)
}
