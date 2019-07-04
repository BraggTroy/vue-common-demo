// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ajax from './assets/ajax'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.prototype.ajax = ajax
Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d119bbde8830023398fe951'

Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
