import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: null,
    candleOrder: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO (state, data) {
      state.userInfo = data
    },
    RESET_STATE (state) {
      state.token = null
      state.userInfo = null
    },
    SET_ORDER (state, date) {
      state.candleOrder = date
    },
    RESET_ORDER (state) {
      state.candleOrder = null
    }
  },
  actions: {
    setToken ({ commit }, data) {
      commit('SET_TOKEN', data)
    },
    setUserInfo ({ commit }, data) {
      commit('SET_USER_INFO', data)
    },
    // user logout
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token')
        commit('RESET_STATE')
        resolve()
      })
    }
  },
  getters: {
    isLogin (state) {
      if (state.userInfo === null) return null
      return Object.keys(state.userInfo).length > 0
    }
  },
  modules: {
  }
})
