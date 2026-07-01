import request from '@/utils/request'

export function getGoodsList(shopId) {
  return request({
    url: '/goods/list',
    data: {
      shopId
    }
  })
}
