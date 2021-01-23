import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Vuex
import store from './store'
// 引入swiper
import './util/swiper'
// 引入 axios
import './util/axios'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
