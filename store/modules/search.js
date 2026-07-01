import { searchShops } from '@/api/search'

const state = () => ({
  keyword: '',
  hotKeywords: ['鸡腿饭', '柠檬茶', '番茄肥牛', '轻食'],
  recentKeywords: [],
  results: [],
  loading: false
})

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_RESULTS(state, data) {
    state.keyword = data.keyword || ''
    state.hotKeywords = data.hotKeywords || state.hotKeywords
    state.results = data.results || []
  },
  ADD_RECENT_KEYWORD(state, keyword) {
    if (!keyword) return
    state.recentKeywords = [keyword, ...state.recentKeywords.filter((item) => item !== keyword)].slice(0, 8)
  },
  CLEAR_RECENT(state) {
    state.recentKeywords = []
  }
}

const actions = {
  async doSearch({ commit, dispatch }, keyword) {
    const trimKeyword = (keyword || '').trim()
    commit('SET_LOADING', true)
    try {
      const res = await searchShops(trimKeyword)
      commit('SET_RESULTS', res.data)
      commit('ADD_RECENT_KEYWORD', trimKeyword)
      dispatch('home/saveRecentKeyword', trimKeyword, { root: true })
      return res.data.results
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
