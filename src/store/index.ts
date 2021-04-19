
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export class RootState {
  user = {
    nickname: null,
    phone: null,
    avatar: null
  }
}

export default new Vuex.Store<RootState>({
  state: new RootState(),
  mutations: {},
  actions: {},
  modules: {},
})