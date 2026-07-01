import { createOrder, getOrderDetail, getOrderList } from '@/api/order'

const state = () => ({
  list: [],
  currentOrder: null,
  loading: false
})

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ORDERS(state, list) {
    state.list = list || []
  },
  ADD_ORDER(state, order) {
    state.list = [order, ...state.list.filter((item) => item.id !== order.id)]
    state.currentOrder = order
  },
  SET_CURRENT_ORDER(state, order) {
    state.currentOrder = order
  }
}

const actions = {
  async loadOrdersFromStorage({ commit }) {
    const res = await getOrderList()
    commit('SET_ORDERS', res.data)
  },
  async createOrder({ commit }, payload) {
    // 课程项目使用 mock 支付；真实项目中订单金额必须由服务端重新计算并签名确认。
    const res = await createOrder(payload)
    commit('ADD_ORDER', res.data)
    return res.data
  },
  async fetchOrderDetail({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const res = await getOrderDetail(id)
      commit('SET_CURRENT_ORDER', res.data)
      return res.data
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
