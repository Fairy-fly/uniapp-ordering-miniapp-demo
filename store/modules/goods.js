import { getGoodsList } from '@/api/goods'

const state = () => ({
  shop: null,
  categories: [],
  goodsList: [],
  activeCategoryId: 'hot',
  currentGoods: null,
  loading: false
})

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_GOODS_DATA(state, data) {
    state.shop = data.shop
    state.categories = data.categories || []
    state.goodsList = data.goodsList || []
    state.activeCategoryId = state.categories[0] ? state.categories[0].id : ''
  },
  SET_ACTIVE_CATEGORY(state, id) {
    state.activeCategoryId = id
  },
  SET_CURRENT_GOODS(state, goods) {
    state.currentGoods = goods
  }
}

const actions = {
  async fetchGoods({ commit }, shopId) {
    commit('SET_LOADING', true)
    try {
      const res = await getGoodsList(shopId)
      commit('SET_GOODS_DATA', res.data)
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
