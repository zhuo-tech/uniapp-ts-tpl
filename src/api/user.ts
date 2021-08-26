import request from '../utils/request'

export interface LoginResult {
  access_token: string
  user_id: string
  mobile: string
}

/**
 * 快速登陆
 * @param mobile 手机号
 * @param code 短信验证码
 */
export async function quickLogin(mobile: string, code: string) {
  const res = await request<LoginResult>({
    method: 'POST',
    url: '/login/sms',
    data: {
      mobile,
      code,
    },
  })

  return res.data
}
