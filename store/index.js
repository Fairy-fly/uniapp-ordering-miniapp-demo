import { createStore } from 'vuex'
import home from './modules/home'
import search from './modules/search'
import goods from './modules/goods'
import shop from './modules/shop'
import user from './modules/user'
import cart from './modules/cart'
import order from './modules/order'

export default createStore({
  modules: {
    home,
    search,
    goods,
    shop,
    user,
    cart,
    order
  }
})
