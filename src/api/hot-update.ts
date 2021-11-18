/**
 * App android 热更新，需要在后端实现 'app-hot-update' 云函数
 */

import { cloud } from './cloud'

export function checkAndUpdateApp() {
  // #ifdef APP-PLUS
  const appid = plus.runtime.appid as string

  return new Promise((resolve, reject) => {
    plus.runtime.getProperty(appid, async (result) => {
      try {
        const r = await cloud.invokeFunction('app-hot-update', {
          appid: result.appid,
          version: result.version,
        })

        if (r.code === 'NO_ACTION') {
          return console.log(
            '========== 检查更新完毕: 客户端无需更新 =========='
          )
        }

        console.log(`客户端版本: ${result.version}, 最新版本: ${r.new_version}`)
        console.log('客户端需要更新: 正在下载更新包...')

        const file = await downloadFile(r.download_url)
        await installApp(file.tempFilePath)
        plus.runtime.restart()

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
  // #endif
}

/**
 * 下载文件
 *
 * 文档: [http://uniapp.dcloud.io/api/request/network-file?id=downloadfile](http://uniapp.dcloud.io/api/request/network-file?id=downloadfile)
 */
export function downloadFile(
  url: string
): Promise<{ tempFilePath: string; statusCode: number }> {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: url,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * 安装应用
 * 支持以下类型安装包：
 * 	1. 应用资源安装包（wgt），扩展名为'.wgt'；
 * 	2. 应用资源差量升级包（wgtu），扩展名为'.wgtu'；
 * 	3. 系统程序安装包（apk），要求使用当前平台支持的安装包格式。
 * 	注意：仅支持本地地址，调用此方法前需把安装包从网络地址或其他位置放置到运行时环境可以访问的本地目录。
 *
 * 参考: [http://www.html5plus.org/doc/zh_cn/runtime.html](http://www.html5plus.org/doc/zh_cn/runtime.html)
 */
export function installApp(filePath: string) {
  return new Promise((resolve, reject) => {
    plus.runtime.install(filePath, { force: false }, resolve, reject)
  })
}
