/**
 * @description 初始化插件并设置
 * @author wuy1fffff
 * @date 2020-07-11 13:14
 * @lastEditTime 2020-07-11 13:14
 */

import { VueConstructor } from 'vue/types/umd'
import { cliUtils } from '@/cli/utils/index' //  工具类
import Vuetify from 'vuetify'
import '@/cli/components' //  全局组件
import '../vxe-export-xlsx' //xlsx导出插件
import { cliConst } from '@/config/cli-constant'
import { cliApi } from '@/cli/api/interface'

const atrox = {
  //  暴露出去安装插件方法
  async install(Vue: VueConstructor) {
    // 阻止 vue 在启动时生成生产提示。
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
    //  名称
    Vue.prototype.$appTitle = process.env.VUE_APP_TITLE
    //  常量
    Vue.prototype.$aconst = cliConst
    //  工具类
    Vue.prototype.$autil = cliUtils
    //  接口
    Vue.prototype.$aapi = cliApi
    //  Vuetify
    Vue.use(Vuetify)
  }
}

export default atrox
