import $req from '@/common/request'

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
  },
  actions: {
    /**
     * @description 登入
     * @param {Object} { commit } context 对象中的commit
     * @param {Object} payload 用户信息
     */
    login({ commit }, payload) {
      commit('SET_USER', payload)
      commit('SET_TOKEN', payload.token)
      uni.setStorageSync('user', JSON.stringify(payload))
      uni.setStorageSync('token', JSON.stringify(payload.token))
    },

    /**
     * @description 退出
     * @param {Object} { commit }
     */
    logout({ commit }) {
      $req.post('/logout', {}, { token: true })
      commit('SET_USER', null)
      commit('SET_TOKEN', null)
      uni.removeStorageSync('user')
      uni.removeStorageSync('token')
    },

    /**
     * @description 初始化用户登入状态
     * @param {Object} { commit }
     */
    initUser({ commit }) {
      let user = uni.getStorageSync('user')
      if (user) {
        user = JSON.parse(user)
        commit('SET_USER', user)
        commit('SET_TOKEN', user.token)
      }
    },
  },
}
