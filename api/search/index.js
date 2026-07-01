import request from '@/utils/request'

export function searchShops(keyword) {
  return request({
    url: '/search/query',
    data: {
      keyword
    }
  })
}
