const { spawnSync } = require('child_process')
const path = require('path')

const root = process.cwd()
const bin = path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'uni.cmd' : 'uni')

const result = spawnSync(bin, process.argv.slice(2), {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: {
    ...process.env,
    UNI_INPUT_DIR: root,
    VITE_ROOT_DIR: root
  }
})

if (result.error) {
  console.error(result.error.message)
}

process.exit(result.status === null ? 1 : result.status)
