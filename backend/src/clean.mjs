import { exec } from 'node:child_process'
import fs from 'node:fs'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

await delay(5000)
console.log(new Date, 'cleaning..')

const pids = await fs.promises.readdir(`/proc/`)
for (const pid of pids) {
  if (/[^\d]/.test(pid)) continue
  try {
    const cmdline = (await fs.promises.readFile(`/proc/${pid}/cmdline`)).toString()
    if (cmdline === "") {
      console.log('clean:', pid, cmdline)
      continue
    }
    if (pid === '1') {
      console.log('clean:', cmdline)
      continue
    }
    //Todo: check /proc/*/exe

    // pm2-runtime
    if (/^(\/usr\/local\/bin\/)?node[\x00\s]\/opt\/node_modules\/pm2\/bin\/pm2-runtime[\x00\s]start[\x00\s].\/pm2(-clean).json[\s\x00]*$/.test(cmdline)) {
      if (await fs.promises.realpath(`/proc/${pid}/cwd`) === '/opt/src') {
        console.log('clean:', cmdline)
        continue
      }
    }

    // node
    if (/^(\/usr\/local\/bin\/)?node[\x00\s]\/opt\/src\/(server|clean).mjs[\s\x00]*$/.test(cmdline)) {
      console.log('clean:', cmdline)
      continue
    }
    console.log(`kill: ${cmdline}(${pid})`)
    exec(`kill -9 ${pid}`, (error, stdout, stderr) => {
      if (error)
        console.error(`kill ${cmdline}(${pid}) error: ${error}`)
      else
        console.error(`killed ${cmdline}(${pid})`)
    })
  } catch (e) {
    console.error(e)
  }
}

console.log('done')
await delay(10000000)