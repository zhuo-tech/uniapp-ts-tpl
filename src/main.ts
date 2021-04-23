import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { createConsole } from './utils/vconsole'

if (['staging'].includes(process.env.NODE_ENV)) {
  createConsole()
}

Vue.config.productionTip = false

new App({
  store
}).$mount()
