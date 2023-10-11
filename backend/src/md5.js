import crypto from 'node:crypto'
const md5 = d => crypto.createHash('md5').update(d).digest('hex')
export default md5
