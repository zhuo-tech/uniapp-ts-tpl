import { API_BASE_URL } from '../config'
import { clearUserInfo, getToken } from '.'
import { ApiResponseType } from '@/types'
import { showError } from './show'

export default async function request<T>(
  options: UniApp.RequestOptions,
  loading = true,
  loadingText: string | null = null
): Promise<ApiResponseType<T>> {
  options.url = API_BASE_URL + options.url
  options.header = options.header || {}
  const reg = /token/g
  const token = getToken()
  if (token) {
    options.header['Authorization'] = `Bearer ${token}`
  }

  options.header['ClientId'] = 'Basic c3RvcmU6c3RvcmU='
  options.header['Content-Type'] =
    options.header['Content-Type'] || 'application/json'
  if (uni.getStorageSync('accessToken') && !reg.test(options.url)) {
    options.header['Authorization'] =
      'Bearer ' + uni.getStorageSync('accessToken')
  }
  const method = options.method || 'GET'
  options.method = method.toUpperCase() as any

  if (loading) {
    uni.showLoading({
      mask: true,
      title: loadingText ? `[${loadingText}]加载中...` : '加载中...'
    })
  }

  const [error, res] = await _request(options)

  if (loading) {
    uni.hideLoading()
  }

  if (error) {
    console.log('request error:', error)
    showError(JSON.stringify(error))
    throw error
  }

  if (res.statusCode == 401) {
    clearUserInfo()
  }

  if (res.statusCode >= 400) {
    const _data = JSON.stringify(res.data)
    const msg = `
      HTTP Error!
      URL: ${options.url}
      Status: ${res.statusCode},
      Response: ${_data}
    `
    showError(msg)
  }

  return res.data
}

/**
 * 封装 uni.request 以支持 Promise
 * 说明：虽然 uni.request 本身支持 Promise，但是其类型文件中未声明此项，导致无法正常推导出，故进行二次封装
 * @param options
 * @returns
 */
function _request(options: UniApp.RequestOptions): Promise<[any, any]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    options.success = function(data: any) {
      resolve([null, data])
    }

    options.fail = function(err: any) {
      // 我们希望出错不抛异常，而是返回给调用端处理，故用 resolve 而非 reject
      resolve([err, null])
    }
    uni.request(options)
  })
}
