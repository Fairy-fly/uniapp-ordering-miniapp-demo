import request from '@/utils/request'

export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'POST',
    data
  })
}

export function getOrderList() {
  return request({
    url: '/order/list'
  })
}

export function getOrderDetail(id) {
  return request({
    url: '/order/detail',
    data: {
      id
    }
  })
}
