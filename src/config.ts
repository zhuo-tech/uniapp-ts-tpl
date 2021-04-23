import { getCurrentBaseURL } from './utils'

/**
 * HTTP 接口请求入口地址
 */
export const API_BASE_URL = process.env.VUE_APP_BASE_API

/**
 * 静态资源访问入口地址
 */
export const IMAGE_BASE_URL = process.env.VUE_APP_IMAGE_BASE_URL

/**
 * 当前站部署地址，主要用于授权等场景
 */
export const DEPLOY_URL = getCurrentBaseURL()
