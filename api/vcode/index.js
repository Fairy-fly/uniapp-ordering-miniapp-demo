import request from '@/utils/request'

export function sendVcode(cellphone) {
  return request({
    url: '/vcode/send',
    method: 'POST',
    data: {
      cellphone
    }
  })
}
