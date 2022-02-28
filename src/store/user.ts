
import { defineStore } from 'pinia'
import { ref } from 'vue'


export interface UserState {
  username: string;
  phone: string;
  nickname: string;
  avatar: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserState>({
    username: '',
    phone: '',
    nickname: '',
    avatar: ''
  })

  function update(data: UserState) {
    user.value = { ...data }
  }

  return { user, update }
})