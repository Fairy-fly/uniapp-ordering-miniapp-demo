import request from '@/utils/request'

export function syncCart(items) {
  return request({
    url: '/cart/sync',
    method: 'POST',
    data: {
      items
    }
  })
}
