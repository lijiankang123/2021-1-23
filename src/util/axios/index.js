//  http://www.axios-js.com/docs/vue-axios.html
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL="http://101.96.128.94:9999/mfresh/data/"

Vue.use(VueAxios, axios)