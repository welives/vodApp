import Vue from 'vue'
import App from './App'
import $req from './common/request'
import store from './store'

Vue.prototype.$req = $req
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()
