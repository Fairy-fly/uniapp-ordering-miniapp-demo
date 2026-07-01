import { mockRequest } from './mock'

const BASE_URL = ''

export default function request(options = {}) {
  const { url, method = 'GET', data = {}, header = {}, mock = true } = options

  if (mock || !BASE_URL) {
    return mockRequest({ url, method, data })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
          return
        }
        reject(new Error(`接口请求失败：${res.statusCode}`))
      },
      fail: reject
    })
  })
}
