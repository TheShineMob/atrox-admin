import Vue from 'vue'
import App from '@/App.vue' //  模板文件
import i18n from './cli/i18n' //  国际化
import router from './cli/router'
import store from './cli/store'

// 核心插件
import atrox from '@/cli/plugins/cli/index.ts'

import vuetify from '@/cli/plugins/vuetify'
import { cliUtils } from './cli/utils'

Vue.use(atrox)

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    //  初始化标签
    this.$store.dispatch('cli/tab/load')
    // 初始化全屏监听
    this.$store.dispatch('cli/fullscreen/listen')
    // 用户登录后从数据库加载一系列的设置
    if (cliUtils.cookie.get('token') && cliUtils.cookie.get('expiration')) {
      if (
        parseInt(cliUtils.cookie.get('expiration') as string) >
        Math.floor(new Date().getTime() / 1000)
      ) {
        this.$store.dispatch('cli/user/load')
        console.log('token未过期')
      } else {
        console.log('token已过期')
        this.$store.dispatch('cli/user/logout')
      }
    } else {
      console.log('token不存在')
      this.$store.dispatch('cli/user/logout')
    }
  }
}).$mount('#app')
