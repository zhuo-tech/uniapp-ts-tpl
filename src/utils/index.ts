import { UserInfo } from '@/types'
import URL from 'url-parse'

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

/**
 * 获取当前页面的 base url， like "http://domain:port"
 * @returns URL
 */
export function getCurrentBaseURL(): string {
  const href = window.location.href
  const { protocol, host } = new URL(href)
  return `${protocol}//${host}`
}

/**
 * 显示成功提示消息
 * @param {string} message
 */
export function showSuccess(message: string) {
  uni.showToast({
    title: message,
    icon: 'success',
    duration: 1500
  })
}

/**
 * 显示「非」成功提示消息
 * @param {string} message
 */
export function showTip(message: string) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}

/**
 * 显示失败提示消息
 * @param {string} message
 */
export function ShowError(message: string) {
  showTip(message)
}

/**
 * Resove image url from server-side
 * @param image_url
 * @returns
 */
export function resolveImageUrl(image_url: string) {
  // json: {labe, value}
  // 先进行 JSON 解析，如果是 JSON 则不会报错，则按 JSON 格式的数据处理
  try {
    const parsed = JSON.parse(image_url)
    if (parsed instanceof Array) {
      return '/' + parsed[0].label
    }
    if (parsed.label) {
      return '/' + parsed.label
    }
  } catch (error) {
    // DO NOTHING
    // 如果报错了，则说明不是 JSON，走后续逻辑
  }

  // 存在以下两种情况
  // 1. /admin/sys-file/bucketname/image.jpg 需要拆分
  // 2. image.jpg 直接返回
  const arr = image_url.split('/')
  const url = arr[arr.length - 1]

  return '/' + url
}
