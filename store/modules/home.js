import { getHomeData, getMoreShops } from '@/api/home'

const state = () => ({
  location: '定位中',
  banners: [],
  hotKeywords: [],
  recentKeywords: [],
  shops: [],
  loading: false,
  page: 1,
  hasMore: true
})

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_HOME_DATA(state, data) {
    state.location = data.location
    state.banners = data.banners || []
    state.hotKeywords = data.hotKeywords || []
    state.shops = data.shops || []
    state.page = 1
    state.hasMore = data.hasMore
  },
  APPEND_SHOPS(state, data) {
    state.shops = state.shops.concat(data.shops || [])
    state.page += 1
    state.hasMore = data.hasMore
  },
  ADD_RECENT_KEYWORD(state, keyword) {
    if (!keyword) return
    state.recentKeywords = [keyword, ...state.recentKeywords.filter((item) => item !== keyword)].slice(0, 6)
  }
}

const actions = {
  async fetchHome({ commit }) {
    commit('SET_LOADING', true)
    try {
      const res = await getHomeData({ pageSize: 3 })
      commit('SET_HOME_DATA', res.data)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async loadMore({ state, commit }) {
    if (!state.hasMore) return
    const res = await getMoreShops({ page: state.page + 1 })
    commit('APPEND_SHOPS', res.data)
  },
  saveRecentKeyword({ commit }, keyword) {
    commit('ADD_RECENT_KEYWORD', keyword)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
