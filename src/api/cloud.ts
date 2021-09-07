import { showError } from '@/utils/show'
import { Cloud, EnvironmentType, UniRequest } from 'less-api-client'
import { API_BASE_URL } from '../config'
import { getToken } from '../utils'

/**
 * 自定义请求类，截获请求响应错误
 */
class CloudRequest extends UniRequest {
  async request(url: string, data: any) {
    try {
      const res = await super.request(url, data)
      return res
    } catch (error) {
      console.error(error)
      showError('出错了:' + error.toString())
      throw error
    }
  }
}

export const cloud = new Cloud({
  baseUrl: API_BASE_URL,
  entryUrl: '/proxy/app',
  getAccessToken: () => getToken() || '',
  requestClass: CloudRequest,
  environment: EnvironmentType.UNI_APP,
})

export const db = cloud.database()
