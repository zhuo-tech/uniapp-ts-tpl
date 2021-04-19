<template>
  <view class="content">
    <image class="logo" src="../../static/logo.png" />
    <view>
      <text class="title">{{ title }}</text>
      {{ state.user.nickname }}
    </view>
    <view v-for="item in lists" :key="item.id">
      {{ item.name }}
    </view>
  </view>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { RootState } from '@/store'

@Component
export default class IndexPage extends Vue {
  title = 'Zhuo-zhuo'

  lists = [
    { id: 0, name: 'A' },
    { id: 1, name: 'B' },
    { id: 2, name: 'C' }
  ]

  get state(): RootState {
    return this.$store.state
  }

  // computed
  get MyName(): string {
    return `My name is ${this.title}`
  }

  // methods
  sayHello(): void {
    console.log(`Hello ${this.title}`)
  }

  mounted(): void {
    this.sayHello()
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
