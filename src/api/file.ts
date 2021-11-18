import { cloud } from './cloud'

interface UploadResult {
  _id: string
  filename: string
  metadata: any
}

/**
 * 上传文件
 * @param filePath
 * @param bucketName
 * @returns
 */
export async function uploadFile(
  filePath: string,
  bucketName = 'public',
  autoName = true
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const auto = autoName ? 1 : 0
    uni.uploadFile({
      url: cloud.fileBaseUrl + `/${bucketName}?auto=${auto}`,
      filePath: filePath,
      name: 'file',
      success: async (res) => {
        if (res.statusCode !== 200) {
          return reject(res)
        }

        try {
          const jsonObject = JSON.parse(res.data)
          return resolve(jsonObject.data)
        } catch (error) {
          return reject(error)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * Promisify uni.chooseImage()
 * @param options
 * @returns
 */
export async function chooseImage(
  options: UniApp.ChooseImageOptions
): Promise<UniApp.ChooseImageSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    options.success = (res) => resolve(res)
    options.fail = (error) => reject(error)
    uni.chooseImage(options)
  })
}
