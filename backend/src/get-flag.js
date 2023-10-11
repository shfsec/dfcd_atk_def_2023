import fs from 'node:fs'
function getFlag() {
  return fs.promises.readFile('/flag/flag')
}
export default getFlag