import { formatDateTime } from './format'

const clone = (value) => JSON.parse(JSON.stringify(value))

const storage = {
  get(key, fallback) {
    try {
      if (typeof uni === 'undefined') return fallback
      const value = uni.getStorageSync(key)
      return value || fallback
    } catch (error) {
      return fallback
    }
  },
  set(key, value) {
    try {
      if (typeof uni !== 'undefined') {
        uni.setStorageSync(key, value)
      }
    } catch (error) {
      console.log('mock storage set failed', error)
    }
  }
}

const shops = [
  {
    id: 'shop_001',
    name: '橙香小厨',
    score: 4.8,
    monthlySales: 2688,
    minPrice: 18,
    deliveryFee: 3,
    distance: '850m',
    address: '大学城东路 88 号食堂二楼',
    phone: '020-88886666',
    openTime: '09:30-21:30',
    latitude: 23.12908,
    longitude: 113.26436,
    notice: '满 35 元减 5 元，课程演示数据均为 mock。',
    tags: ['热卖', '快餐', '学生优惠'],
    image: '/static/images/shop-orange.svg'
  },
  {
    id: 'shop_002',
    name: '番茄饭堂',
    score: 4.7,
    monthlySales: 1842,
    minPrice: 16,
    deliveryFee: 4,
    distance: '1.2km',
    address: '创新楼西侧商业街 12 号',
    phone: '020-88990011',
    openTime: '10:00-22:00',
    latitude: 23.13241,
    longitude: 113.26812,
    notice: '工作日午餐出餐更快，适合小组作业间隙点餐。',
    tags: ['盖饭', '套餐', '新店'],
    image: '/static/images/shop-tomato.svg'
  },
  {
    id: 'shop_003',
    name: '青柠轻食',
    score: 4.6,
    monthlySales: 1399,
    minPrice: 20,
    deliveryFee: 2,
    distance: '1.6km',
    address: '体育馆南门 6 号铺',
    phone: '020-88223344',
    openTime: '08:30-20:30',
    latitude: 23.12674,
    longitude: 113.26092,
    notice: '提供低脂套餐、沙拉和果茶。',
    tags: ['轻食', '饮品', '低脂'],
    image: '/static/images/shop-lime.svg'
  }
]

const categories = [
  { id: 'hot', name: '热销' },
  { id: 'rice', name: '主食' },
  { id: 'snack', name: '小吃' },
  { id: 'drink', name: '饮品' }
]

const goods = [
  {
    id: 'g_001',
    shopId: 'shop_001',
    categoryId: 'hot',
    name: '招牌橙香鸡腿饭',
    desc: '鸡腿外皮微焦，搭配橙香酱汁和时蔬。',
    price: 24,
    sales: 986,
    stock: 80,
    image: '/static/images/food-chicken.svg'
  },
  {
    id: 'g_002',
    shopId: 'shop_001',
    categoryId: 'rice',
    name: '黑椒牛肉双拼饭',
    desc: '牛肉片、煎蛋和玉米粒，口味偏香。',
    price: 28,
    sales: 721,
    stock: 60,
    image: '/static/images/food-rice.svg'
  },
  {
    id: 'g_003',
    shopId: 'shop_001',
    categoryId: 'snack',
    name: '香酥鸡米花',
    desc: '适合加购的小份小吃。',
    price: 12,
    sales: 512,
    stock: 120,
    image: '/static/images/food-snack.svg'
  },
  {
    id: 'g_004',
    shopId: 'shop_001',
    categoryId: 'drink',
    name: '手打柠檬茶',
    desc: '少冰三分糖更清爽。',
    price: 9,
    sales: 430,
    stock: 90,
    image: '/static/images/food-drink.svg'
  },
  {
    id: 'g_005',
    shopId: 'shop_002',
    categoryId: 'hot',
    name: '番茄肥牛饭',
    desc: '酸甜番茄汤汁拌饭很合适。',
    price: 26,
    sales: 638,
    stock: 70,
    image: '/static/images/food-rice.svg'
  },
  {
    id: 'g_006',
    shopId: 'shop_002',
    categoryId: 'rice',
    name: '咖喱鸡肉饭',
    desc: '土豆软糯，咖喱味道温和。',
    price: 22,
    sales: 590,
    stock: 65,
    image: '/static/images/food-chicken.svg'
  },
  {
    id: 'g_007',
    shopId: 'shop_003',
    categoryId: 'hot',
    name: '鸡胸肉能量碗',
    desc: '糙米、鸡胸肉、蔬菜和坚果组合。',
    price: 29,
    sales: 384,
    stock: 50,
    image: '/static/images/food-salad.svg'
  },
  {
    id: 'g_008',
    shopId: 'shop_003',
    categoryId: 'drink',
    name: '青柠苏打',
    desc: '低糖气泡饮，适合搭配轻食。',
    price: 10,
    sales: 255,
    stock: 100,
    image: '/static/images/food-drink.svg'
  }
]

const defaultOrders = [
  {
    id: 'order_demo_001',
    orderNo: 'MOCK20260701001',
    status: 'paid',
    statusText: '已付款',
    shop: shops[0],
    items: [
      { ...goods[0], count: 1 },
      { ...goods[3], count: 1 }
    ],
    address: '广东省广州市大学城东路 88 号 6 栋 301',
    remark: '课程演示订单',
    goodsAmount: 33,
    deliveryFee: 3,
    payAmount: 36,
    createdAt: '2026-07-01 12:30'
  }
]

const hotKeywords = ['鸡腿饭', '柠檬茶', '番茄肥牛', '轻食', '咖喱']

function getOrders() {
  return storage.get('mock_orders', clone(defaultOrders))
}

function saveOrders(orders) {
  storage.set('mock_orders', orders)
}

function getShop(shopId) {
  return shops.find((shop) => shop.id === shopId) || shops[0]
}

function getGoodsByShop(shopId) {
  const list = goods.filter((item) => item.shopId === shopId)
  return list.length ? list : goods.filter((item) => item.shopId === 'shop_001')
}

function searchByKeyword(keyword = '') {
  const normalized = keyword.trim()
  if (!normalized) {
    return shops
  }
  const hitShopIds = goods
    .filter((item) => item.name.includes(normalized) || item.desc.includes(normalized))
    .map((item) => item.shopId)
  return shops.filter((shop) => {
    const text = `${shop.name}${shop.address}${shop.tags.join('')}`
    return text.includes(normalized) || hitShopIds.includes(shop.id)
  })
}

function createOrder(data) {
  const items = data.items || []
  const goodsAmount = Number(items.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2))
  const deliveryFee = data.deliveryFee || 3
  const id = `order_${Date.now()}`
  const order = {
    id,
    orderNo: `MOCK${Date.now()}`,
    status: 'paid',
    statusText: '已付款',
    shop: data.shop || shops[0],
    items,
    address: data.address || '广东省广州市大学城东路 88 号',
    remark: data.remark || '无',
    goodsAmount,
    deliveryFee,
    payAmount: Number((goodsAmount + deliveryFee).toFixed(2)),
    createdAt: formatDateTime(new Date())
  }
  const orders = [order, ...getOrders()]
  saveOrders(orders)
  return order
}

export function mockRequest({ url, data = {} }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let payload

      switch (url) {
        case '/home/index':
          payload = {
            location: '大学城校区',
            banners: [
              {
                id: 'banner_1',
                title: '午餐套餐立减',
                desc: '满 35 元减 5 元',
                image: '/static/images/banner.svg'
              }
            ],
            hotKeywords,
            shops: shops.slice(0, data.pageSize || 3),
            hasMore: false
          }
          break
        case '/home/more':
          payload = {
            shops: [],
            hasMore: false
          }
          break
        case '/search/query':
          payload = {
            keyword: data.keyword || '',
            hotKeywords,
            results: searchByKeyword(data.keyword)
          }
          break
        case '/goods/list':
          payload = {
            shop: getShop(data.shopId),
            categories,
            goodsList: getGoodsByShop(data.shopId)
          }
          break
        case '/shop/detail':
          payload = getShop(data.shopId)
          break
        case '/user/login':
          payload = {
            uid: 'u_20260701',
            token: `mock_token_${Date.now()}`,
            openid: `mock_openid_${Date.now()}`,
            nickname: '课程体验用户',
            avatar: '/static/images/avatar.svg',
            gender: '保密',
            cellphone: data.cellphone || ''
          }
          break
        case '/user/update':
          payload = data
          break
        case '/user/bind-cellphone':
          payload = {
            cellphone: data.cellphone,
            bindAt: new Date().toLocaleString('zh-CN', { hour12: false })
          }
          break
        case '/cart/sync':
          payload = data.items || []
          break
        case '/order/create':
          payload = createOrder(data)
          break
        case '/order/list':
          payload = getOrders()
          break
        case '/order/detail':
          payload = getOrders().find((order) => order.id === data.id) || defaultOrders[0]
          break
        case '/vcode/send':
          payload = {
            cellphone: data.cellphone,
            code: '123456',
            expireSeconds: 300
          }
          break
        default:
          payload = {}
      }

      resolve({
        code: 0,
        message: 'ok',
        data: clone(payload)
      })
    }, 220)
  })
}
