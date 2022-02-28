import { UserInfo } from './types'

const kToken = 'token'
const kTokenExpire = 'token_expire'
const kUserInfo = 'user_info'

/**
 * @param token
 * @param expire 过期时间，时间戳，秒
 */
export function saveToken(token: string, expire: number) {
  uni.setStorageSync(kToken, token)
  uni.setStorageSync(kTokenExpire, expire)
}

export function getToken(): string | undefined {
  const expire = uni.getStorageSync(kTokenExpire) || 0
  if (expire < Date.now() / 1000) {
    clearUserInfo()
    return undefined
  }
  return uni.getStorageSync(kToken) || undefined
}

export function saveUserInfo(info: UserInfo) {
  uni.setStorageSync(kUserInfo, info)
}

export function getUserInfo(): UserInfo {
  return uni.getStorageSync(kUserInfo)
}

export function clearUserInfo() {
  uni.removeStorageSync(kToken)
  uni.removeStorageSync(kUserInfo)
  uni.removeStorageSync(kTokenExpire)
}

/**
 * Check login status
 */
export function checkLogin(): void {
  if (!getToken()) {
    uni.reLaunch({
      url: '/pages/login/index',
    })
  }
}
