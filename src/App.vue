<script lang="ts">
import Vue from 'vue'
import { checkAndUpdateApp } from '@/api/hot-update'

export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch')
    checkAndUpdateApp()
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
})
</script>

<style>
/*每个页面公共css */
</style>
