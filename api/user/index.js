import request from '@/utils/request'

export function loginByWeixin(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export function updateUserProfile(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}

export function bindCellphone(data) {
  return request({
    url: '/user/bind-cellphone',
    method: 'POST',
    data
  })
}
