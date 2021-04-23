import VConsole from 'vconsole'

let vconsole: VConsole | null

export function getConsole() {
  return vconsole
}

export function createConsole() {
  if (!vconsole) {
    vconsole = new VConsole()
  }
  console.log('vconsole version: ', vconsole.version)
}

export function destroyConsole() {
  if (vconsole) {
    vconsole.destroy()
  }
  vconsole = null
}
