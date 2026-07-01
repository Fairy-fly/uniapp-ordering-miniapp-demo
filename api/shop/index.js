import request from '@/utils/request'

export function getShopDetail(shopId) {
  return request({
    url: '/shop/detail',
    data: {
      shopId
    }
  })
}
