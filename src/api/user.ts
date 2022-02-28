
import { AppFunctionResult, UserInfo } from '../utils/types'
import { clearUserInfo } from '../utils'
import { cloud } from './cloud'

export interface LoginResult extends AppFunctionResult {
  data: {
    access_token: string
    uid: string
    expire: number
    user: UserInfo
  }
}

/**
 * 快速登录
 * @param phone 手机号
 * @param code 短信验证码
 */
export async function login(phone: string, code: number) {
  return await cloud.invokeFunction<LoginResult>('app-quick-login', {
    username: phone,
    code,
  })
}

/**
 * 密码登录
 * @param phone 手机号
 * @param password 密码
 */
export async function passwordLogin(phone: string, password: string) {
  return await cloud.invokeFunction<LoginResult>('app-login-password', {
    username: phone,
    password,
  })
}

/**
 * 退出登录
 */
export function logout() {
  clearUserInfo()
}

/**
 * 发送登录短信验证码
 * @param phone
 * @returns
 */
export async function sendLoginSmsCode(phone: string) {
  return await cloud.invokeFunction<AppFunctionResult>('send-login-sms', {
    phone,
  })
}
