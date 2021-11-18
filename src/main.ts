import Vue from 'vue'
import App from './App.vue'
import { BUILD_INFO } from './config'
import store from './store'

/**
 * Trace build info
 */
console.log('build info: ', BUILD_INFO)

Vue.config.productionTip = false

new App({
  store: store,
}).$mount()
