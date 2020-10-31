/**
 * @description 颜色模块
 * @author wuy1fffff
 * @date 2020-07-11 13:15
 * @lastEditTime 2020-07-11 13:15
 */
import colors from '@/assets/styles/unit/color.scss'
import { colorList } from '@/config/cli-config'
import client from 'webpack-theme-color-replacer/client'
import vuetify from '@/cli/plugins/vuetify'

import { Commit, Dispatch } from 'vuex'
export interface CliColorStore {
  color: string //  当前颜色
}
export default {
  namespaced: true,
  state: {
    color: colors.primary
  },
  getters: {},
  mutations: {
    //  调用函数真正更换主题色
    applyColor(state: CliColorStore, payload: { oldColor: string; newColor: string }) {
      // store 赋值
      state.color = payload.newColor
      //  修改vuetify的primary主题色
      vuetify.framework.theme.themes.light.primary = payload.newColor
      vuetify.framework.theme.themes.dark.primary = payload.newColor
      //  调用webpack-theme-color-replacer方法修改所有sass变量
      client.changer.changeColor({
        oldColors: [payload.oldColor],
        newColors: [payload.newColor]
      })
    }
  },
  actions: {
    //  设置主题色
    async setColor(
      context: { dispatch: Dispatch; state: CliColorStore; commit: Commit },
      payload: { color: string }
    ) {
      // 安全性检查
      if (payload.color === context.state.color) return
      payload.color =
        colorList.indexOf(payload.color) === -1 ? colorList[0] : payload.color
      // 记录上个值
      const old = context.state.color
      // 应用
      context.commit('applyColor', {
        oldColor: old,
        newColor: payload.color
      })
      //  持久化
      context.dispatch(
        'cli/db/set',
        {
          database: 'database',
          path: 'color',
          value: payload.color
        },
        { root: true }
      )
    },
    //  初始化颜色
    async load(context: { dispatch: Dispatch; commit: Commit; state: CliColorStore }) {
      const dbColor: string = await context.dispatch(
        'cli/db/get',
        { database: 'database', path: 'color', defaultValue: colors.primary },
        { root: true }
      )
      // 应用
      context.dispatch('setColor', { color: dbColor })
    }
  }
}
