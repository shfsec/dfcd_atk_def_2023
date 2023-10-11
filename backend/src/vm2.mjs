import util from 'util'
import { NodeVM, VM } from "vm2"
import { resolverFromOptions } from 'vm2/lib/resolver-compat.js'
import fs from 'node:fs'

const code = fs.readFileSync(0).toString()

let _util = util
try {
  const util = {
    format: _util.format.bind(_util),
  }
  const returns = { output: '' }
  const sandbox = {
    util,
    returns
  }
  const vm = new VM({
    allowAsync: true,
    timeout: 4000,
    wrapper: 'none',
    console: 'off',
    eval: true,
    sandbox,
  })
  sandbox.resolver = resolverFromOptions(vm, {
    external: true,
    builtin: ['fs', 'path', 'util'],
    root: './',
    mock: {
      fs: {
        readFileSync: () => 'Nice try!'
      }
    }
  })
  vm.setGlobal('resolver', sandbox.resolver)

  vm.run(`
  var ret = '';
  try {
    console.log = function () {
      for(const a of arguments) ret += util.format(a)+' '
      ret += '\\r\\n'
    };
    
    function alert() {
      for(const a of arguments) ret += util.format(a)+' '
      ret += '\\r\\n'
    };
    
    var output = (function (){
      ${code}
    })();

    ret += '\\r\\nReturn: '+ util.format(output);
  }catch(e){
    console.log(e)
  }

  returns.output = ret;
  `)
  process.stdout.write(util.format(returns.output))
} catch (e) {
  process.stderr.write(String(e))
}