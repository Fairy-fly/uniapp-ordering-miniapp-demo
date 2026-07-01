import { syncCart } from '@/api/cart'

function sameGoods(left, right) {
  return left.id === right.id && left.shopId === right.shopId
}

const state = () => ({
  items: []
})

const getters = {
  totalCount(state) {
    return state.items.reduce((sum, item) => sum + item.count, 0)
  },
  totalPrice(state) {
    return Number(state.items.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2))
  }
}

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items
  },
  ADD_GOODS(state, goods) {
    const hit = state.items.find((item) => sameGoods(item, goods))
    if (hit) {
      hit.count += 1
      return
    }
    state.items.push({
      ...goods,
      count: 1
    })
  },
  REMOVE_GOODS(state, goods) {
    const hit = state.items.find((item) => sameGoods(item, goods))
    if (!hit) return
    hit.count -= 1
    if (hit.count <= 0) {
      state.items = state.items.filter((item) => !sameGoods(item, goods))
    }
  },
  CLEAR_CART(state) {
    state.items = []
  }
}

const actions = {
  async addGoods({ state, commit }, goods) {
    commit('ADD_GOODS', goods)
    await syncCart(state.items)
  },
  async removeGoods({ state, commit }, goods) {
    commit('REMOVE_GOODS', goods)
    await syncCart(state.items)
  },
  async clearCart({ state, commit }) {
    commit('CLEAR_CART')
    await syncCart(state.items)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
