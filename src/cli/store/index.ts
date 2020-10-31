/**
 * @description 实例化vuex
 * @author wuy1fffff
 * @date 2020-07-11 13:16
 * @lastEditTime 2020-07-11 13:16
 */
import Vue from 'vue'
import Vuex from 'vuex'
import cli from './modules/cli'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cli
  }
})
