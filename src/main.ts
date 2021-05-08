import Vue from 'vue'
import App from './App.vue'
import { BUILD_INFO } from './config'

import { createConsole } from './utils/vconsole'

if (['staging'].includes(process.env.NODE_ENV)) {
  createConsole()
}

// trace build info
console.log('build info: ', BUILD_INFO)

Vue.config.productionTip = false

new App().$mount()
