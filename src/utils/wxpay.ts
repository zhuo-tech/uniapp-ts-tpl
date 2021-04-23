declare const WeixinJSBridge: any

interface PayOptions {
  appId: string // 公众号ID，由商户传入
  timeStamp: number // 时间戳，自1970年以来的秒数
  nonceStr: string // 随机串
  package: string
  signType: string // 签名方式
  paySign: string // 签名
}

// 支付模块
export async function invokeWXPay(
  option: PayOptions
): Promise<'success' | 'cancel'> {
  return new Promise((resolve, reject) => {
    // 拉起微信支付
    function onBridgeReady(option: any) {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: option.appId,
          timeStamp: option.timeStamp,
          nonceStr: option.nonceStr,
          package: option.package,
          signType: option.signType,
          paySign: option.paySign
        },
        function(res: { err_msg: string }) {
          console.log(res.err_msg)
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            uni.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000
            })
            const time = setTimeout(() => {
              clearTimeout(time)
              resolve('success')
            }, 1000)
          }
          if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            uni.showToast({
              title: '取消支付',
              icon: 'none',
              duration: 1000
            })
            const time = setTimeout(() => {
              clearTimeout(time)
              resolve('cancel')
            }, 1000)
          }
        }
      )
    }

    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady(option)
    }
  })
}
