import { API_BASE_URL } from '../config'
import { getToken } from '.'

console.log({ API_BASE_URL })

export default async function request(
  options: UniApp.RequestOptions,
  loading = true,
  loadingText: string | null = null
) {
  options.url = API_BASE_URL + options.url
  options.header = options.header || {}

  const token = getToken()
  if (token) {
    options.header['Authorization'] = `Bearer ${token}`
  }

  options.header['ClientId'] = 'Basic YXBwOmFwcA=='
  options.header['Content-Type'] = 'application/json'
  const method = options.method || 'GET'
  options.method = method.toUpperCase() as any

  if (loading) {
    uni.showLoading({
      mask: true,
      title: loadingText ? `[${loadingText}]加载中...` : '加载中...'
    })
  }

  const [error, res] = await _request(options)
  console.log({ url: options.url, error, res })

  if (loading) {
    uni.hideLoading()
  }

  if (error) {
    console.log('request error:', error)
    uni.showToast({
      title: JSON.stringify(error),
      icon: 'none'
    })
    return false
  }

  // if (res.statusCode == 401) {
  //   uni.showToast({ title: '请先登录', icon: 'none' })
  //   setTimeout(_ => {
  //     uni.navigateTo({
  //       url: '/pages/auth/auth'
  //     })
  //   }, 500)
  //   return false
  // }

  return res.data
}

function _request(options: UniApp.RequestOptions): Promise<[any, any]> {
  return new Promise((resolve, reject) => {
    options.success = function(data: any) {
      resolve([null, data])
    }

    options.fail = function(err: any) {
      reject([err, null])
    }
    uni.request(options)
  })
}
