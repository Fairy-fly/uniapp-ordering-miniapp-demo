import { getShopDetail } from '@/api/shop'

const state = () => ({
  detail: null,
  loading: false
})

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_SHOP_DETAIL(state, detail) {
    state.detail = detail
  }
}

const actions = {
  async fetchShop({ commit }, shopId) {
    commit('SET_LOADING', true)
    try {
      const res = await getShopDetail(shopId)
      commit('SET_SHOP_DETAIL', res.data)
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
