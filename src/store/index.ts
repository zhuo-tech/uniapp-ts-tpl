import Vue from 'vue'
import Vuex from 'vuex'
import global, { GlobalState } from './modules/global'

Vue.use(Vuex)

export interface RootState {
  global: GlobalState
}

export default new Vuex.Store<RootState>({
  modules: {
    global
  }
})
