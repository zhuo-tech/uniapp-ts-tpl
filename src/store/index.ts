
import Vue from 'vue'
import Vuex, { MutationTree, Mutation } from 'vuex'

Vue.use(Vuex)

export class    RootState {
  user = {
    nickname: null,
    phone: null,
    avatar: null
  }
}
const abc = 1

export default new Vuex.Store<RootState>({
  state: new RootState(),
  mutations: {},
  actions: {},
  modules: {},
})