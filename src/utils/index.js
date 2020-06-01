import Vue from 'vue'
import router from '@/router'

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('ACCESS_TOKEN')
  // store.commit('resetStore')
  // router.options.isAddDynamicMenuRoutes = false
}
