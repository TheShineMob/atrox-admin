/**
 * @description 主题模块
 * @author wuy1fffff
 * @date 2020-07-11 13:16
 * @lastEditTime 2020-07-11 13:16
 */
import { Commit, Dispatch } from 'vuex'
import { themeList, AtroxTheme } from '@/config/cli-config'
import vuetify from '@/cli/plugins/vuetify'
export interface CliThemetore {
  theme: AtroxTheme //  当前主题
}
export default {
  namespaced: true,
  state: {
    //  当前主题
    theme: themeList[0]
  },
  getters: {},
  mutations: {
    applyTheme(state: CliThemetore, payload: { theme: AtroxTheme }) {
      // store 赋值
      state.theme = payload.theme
      //  修改body的class
      document.body.className = `theme-${state.theme.name}`
      //  修改vuetify的primary主题色
      vuetify.framework.theme.dark = state.theme.vuetifyDark
    }
  },
  actions: {
    //  设置主题
    async setTheme(
      context: { dispatch: Dispatch; state: CliThemetore; commit: Commit },
      payload: { themeName: string }
    ) {
      // 安全性检查
      if (payload.themeName === context.state.theme.name) return
      // 查找对应主题
      const index: number = themeList.findIndex(
        _theme => _theme.name === payload.themeName
      )
      const resTheme: AtroxTheme = index === -1 ? themeList[0] : themeList[index]
      //  应用
      context.commit('applyTheme', { theme: resTheme })
      //  持久化
      context.dispatch(
        'cli/db/set',
        {
          database: 'database',
          path: 'theme',
          value: resTheme
        },
        { root: true }
      )
    },
    //  初始化主题
    async load(context: { dispatch: Dispatch; commit: Commit }) {
      const dbTheme: AtroxTheme = await context.dispatch(
        'cli/db/get',
        { database: 'database', path: 'theme', defaultValue: themeList[0] },
        { root: true }
      )
      // 应用
      context.dispatch('setTheme', { theme: dbTheme })
    }
  }
}
