import { UserInfo } from '@/types'

export function saveToken(token: string) {
  uni.setStorageSync('token', token)
}

export function getToken(): string | undefined {
  return uni.getStorageSync('token') || undefined
}

export function saveUserInfo(info: UserInfo) {
  uni.setStorageSync('user_info', info)
}

export function getUserInfo(): UserInfo {
  return uni.getStorageSync('user_info') as UserInfo
}

export function clearUserInfo() {
  uni.clearStorageSync()
}

/**
 * Check login status
 */
export function checkLogin(): void {
  if (!getToken()) {
    uni.reLaunch({
      url: '/pages/login/index'
    })
  }
}
