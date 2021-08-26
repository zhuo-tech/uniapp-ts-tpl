/**
 * 显示成功提示消息
 * @param {string} message
 */
export function showSuccess(message: string) {
  uni.showToast({
    title: message,
    icon: 'success',
    duration: 1500,
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
    duration: 2000,
  })
}

/**
 * 显示失败提示消息
 * @param {string} message
 */
export function showError(message: string) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 4000,
  })
}
