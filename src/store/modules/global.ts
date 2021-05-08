import { UserInfo } from '@/types'
import { ActionTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'

export interface GlobalState {
  user: UserInfo
}

const state: GlobalState = {
  user: {
    nickname: null,
    phone: null,
    avatar: null
  }
}

const mutations: MutationTree<GlobalState> = {
  setUser(state, user) {
    state.user = user
  }
}

const actions: ActionTree<GlobalState, RootState> = {}

const globalModule: Module<GlobalState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default globalModule
