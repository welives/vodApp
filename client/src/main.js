import Vue from 'vue'
import App from './App'
import $req from './common/request'
import store from './store'

Vue.prototype.$req = $req

Vue.prototype.authJump = (options) => {
  if (!store.state.user.token) {
    uni.showToast({
      title: '请先登入',
      icon: 'none',
    })
    return uni.navigateTo({
      url: '/pages/login/login',
    })
  }
  uni.navigateTo(options)
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()
