import { bindCellphone, loginByWeixin, updateUserProfile } from '@/api/user'

function readStorage(key, fallback = '') {
  try {
    return uni.getStorageSync(key) || fallback
  } catch (error) {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    uni.setStorageSync(key, value)
  } catch (error) {
    console.log('write storage failed', error)
  }
}

function removeStorage(key) {
  try {
    uni.removeStorageSync(key)
  } catch (error) {
    console.log('remove storage failed', error)
  }
}

const state = () => ({
  token: '',
  userInfo: null,
  loading: false
})

const getters = {
  isLogin(state) {
    return Boolean(state.token)
  }
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_USER(state, userInfo) {
    state.userInfo = userInfo
    state.token = userInfo ? userInfo.token : ''
  },
  LOGOUT(state) {
    state.userInfo = null
    state.token = ''
  }
}

const actions = {
  loadUserFromStorage({ commit }) {
    const token = readStorage('token')
    const userInfo = readStorage('userInfo', null)
    if (token && userInfo) {
      commit('SET_USER', {
        ...userInfo,
        token
      })
    }
  },
  async login({ commit }, payload = {}) {
    commit('SET_LOADING', true)
    try {
      let code = 'mock_code'
      try {
        const loginRes = await uni.login()
        code = loginRes.code || 'mock_code'
      } catch (error) {
        code = 'mock_code'
      }
      const res = await loginByWeixin({
        code,
        ...payload
      })
      commit('SET_USER', res.data)
      writeStorage('token', res.data.token)
      writeStorage('userInfo', res.data)
      return res.data
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async updateProfile({ state, commit }, payload) {
    const res = await updateUserProfile({
      ...state.userInfo,
      ...payload
    })
    const nextUser = {
      ...state.userInfo,
      ...res.data
    }
    commit('SET_USER', nextUser)
    writeStorage('userInfo', nextUser)
    return nextUser
  },
  async bindCellphone({ state, commit }, payload) {
    const res = await bindCellphone(payload)
    const nextUser = {
      ...state.userInfo,
      cellphone: res.data.cellphone
    }
    commit('SET_USER', nextUser)
    writeStorage('userInfo', nextUser)
    return nextUser
  },
  logout({ commit }) {
    commit('LOGOUT')
    removeStorage('token')
    removeStorage('userInfo')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
