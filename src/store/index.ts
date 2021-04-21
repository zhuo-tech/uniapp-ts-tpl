import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
  user: {
    nickname: string | null;
    phone: string | null;
    avatar: string | null;
  };
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
});
