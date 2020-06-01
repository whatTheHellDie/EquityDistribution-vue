import Vue from 'vue'
import App from '@/App'
import router from '@/router'   
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie' // api: https://github.com/vuejs/vue-router
import '@/element-ui'      // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import '@/assets/scss/index.scss?v=1'
import cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'
axios.defaults.withCredentials=true;//ajax带上cookie
Vue.prototype.$axios=axios;
Vue.use(VueCookie)

Vue.config.productionTip = false

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}
// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
