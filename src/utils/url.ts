/**
 * 获取当前页面的 base url， like "http://domain:port"
 * @returns URL
 */
export function getCurrentBaseURL(): string {
  const href = window.location.href
  const { protocol, host } = new URL(href)
  return `${protocol}//${host}`
}
