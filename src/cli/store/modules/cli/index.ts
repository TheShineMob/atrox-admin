/**
 * @description 框架所有vuex的出口
 * @author wuy1fffff
 * @date 2020-07-11 15:14
 * @lastEditTime 2020-07-11 15:14
 */
import { Module } from 'vuex'
//  引入子模块包
const modulesFile = require.context('./modules', false, /\.ts$/)
const modules: Record<string, Module<any, any>> = {}
//  遍历所有的子模块
modulesFile.keys().forEach(key => {
  //  截掉.ts后缀做为子模块名
  modules[key.replace(/(\.\/|\.ts)/g, '')] = modulesFile(key).default
})

export default {
  namespaced: true,
  modules
}
