import Vue from 'vue'
import store, { RootState } from '@/store'
import { Store } from 'vuex'

export default class VuePage extends Vue {
  // 以下 override 在微信小程序中会报错，故使用 getter
  // $store: Store<RootState> = store

  get $store(): Store<RootState> {
    return store
  }

  set $store(value) {
    console.warn(`Warning: DON'T assign to VuePage.$store!`)
  }

  get $state(): RootState {
    return this.$store.state
  }
  get $user() {
    return this.$state.global.user
  }
  checkLogin(): boolean {
    return this.$user === null
  }
}
