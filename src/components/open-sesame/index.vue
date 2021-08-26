<template>
  <view class="sesame" @click="onHit">
    <slot />
  </view>
</template>

<script>
import { createConsole, destroyConsole, getConsole } from '../../util/vconsole'
export default {
  name: 'OpenSesame',
  data() {
    return {
      count: 0,
      hitTime: Date.now(),
    }
  },
  methods: {
    onHit() {
      const now = Date.now()
      // ignore hit
      if (now - this.hitTime > 3000) {
        this.resetCount()
      }
      if (now - this.hitTime < 1000) {
        this.resetCount()
      }

      // accumulate hits
      this.count++
      this.hitTime = Date.now()

      console.log('on hit: ', this.count)

      // check trigger condition
      if (this.count >= 5) {
        this.trigger()
        this.resetCount()
      }
    },
    trigger() {
      if (!getConsole()) {
        createConsole()
      } else {
        destroyConsole()
      }
    },
    resetCount() {
      this.count = 0
      this.hitTime = Date.now()
      this.pharse2count = 0
    },
  },
}
</script>

<style scoped></style>
