import { UserInfo } from '@/types'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface RootState {
  user: UserInfo
}
export default new Vuex.Store<RootState>({
  state: {
    user: {
      nickname: null,
      phone: null,
      avatar: null
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
