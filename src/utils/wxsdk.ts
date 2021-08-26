/* eslint-disable @typescript-eslint/no-var-requires */
const WechatJSSDK = require('wechat-jssdk')

interface WxSDKConfigOptions {
  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  debug?: boolean
  // 必填，公众号的唯一标识
  appId: string
  // 必填，生成签名的时间戳
  timestamp: string
  // 必填，生成签名的随机串
  nonceStr: string
  // 必填，签名
  signature: string
  // 必填，需要使用的JS接口列表
  jsApiList: string[]
}

export async function configWxSDK(options: WxSDKConfigOptions) {
  options.debug = false
  const sdk = new WechatJSSDK(options)
  return sdk.initialize()
}
