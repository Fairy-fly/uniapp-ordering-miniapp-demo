import request from '@/utils/request'

export function getHomeData(data = {}) {
  return request({
    url: '/home/index',
    data
  })
}

export function getMoreShops(data = {}) {
  return request({
    url: '/home/more',
    data
  })
}
