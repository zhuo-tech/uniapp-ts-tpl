import { showError } from '@/utils/show'
import * as less from 'less-api-client'
import { API_BASE_URL } from '../config'
import { getToken } from '../utils'
import request from '../utils/request'

type GetAccessTokenFuncType = () => string

interface CloudOptions {
  baseUrl: string
  getAccessToken: GetAccessTokenFuncType
  requestClass?: any
  timeout?: number
  environment: less.EnvironmentType
  requestOptions?: any
  primaryKey?: string
}

export class Cloud extends less.Cloud {
  readonly baseUrl: string = ''
  readonly options: CloudOptions

  get fileBaseUrl(): string {
    return this.baseUrl + '/file'
  }

  get funcBaseUrl(): string {
    return this.baseUrl + '/func'
  }

  constructor(options: CloudOptions) {
    super({
      entryUrl: options.baseUrl + '/app/entry',
      getAccessToken: options.getAccessToken,
      requestClass: options.requestClass,
      timeout: options.timeout,
      environment: options.environment,
      requestOptions: options.requestOptions,
      primaryKey: options.primaryKey
    })
    this.options = options
    this.baseUrl = options.baseUrl
  }

  /**
   * 运行云函数
   */
  async invokeFunctin(functionName: string, data: any) {
    const res = await request({
      url: this.funcBaseUrl + `/invoke/${functionName}`,
      data: data,
      method: 'POST'
    })

    return res.data
  }

  /**
   * 上传文件
   */
  async uploadFile(filePath: string) {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: this.fileBaseUrl + '/upload',
        filePath: filePath,
        name: 'file',
        success: res => {
          resolve(res.data)
        },
        fail: error => {
          reject(error)
        }
      })
    })
  }
}

export const cloud = new Cloud({
  baseUrl: API_BASE_URL,
  getAccessToken: () => getToken() || '',
  requestClass: (config: any) => new CloudRequest(config),
  environment: less.EnvironmentType.UNI_APP
})

export const db = cloud.database()

/**
 * 自定义请求类
 */
class CloudRequest extends less.Request {
  async request(data: any) {
    try {
      const res = await super.request(data)
      return res
    } catch (error) {
      console.error(error)
      showError('您没有该操作权限')

      return {
        code: 1,
        error: error.message
      }
    }
  }
}
