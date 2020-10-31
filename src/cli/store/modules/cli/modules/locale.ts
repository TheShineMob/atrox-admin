/**
 * @description 语言模块
 * @author wuy1fffff
 * @date 2020-07-11 13:15
 * @lastEditTime 2020-07-11 13:15
 */
import { defalutLocale, localeList } from '@/cli/i18n/locales/mixins'
import i18n from '@/cli/i18n'
import { Dispatch, Commit } from 'vuex'

export interface CliLocaleStore {
  locale: string //  当前语言
}
export default {
  namespaced: true,
  state: {
    //  当前语言
    locale: defalutLocale
  },
  getters: {},
  mutations: {
    //改变语言
    setLocale(state: CliLocaleStore, payload: { locale: string }) {
      state.locale = payload.locale
      i18n.locale = payload.locale
    }
  },
  actions: {
    //  改变语言
    async changeLocale(
      context: {
        dispatch: Dispatch
        state: CliLocaleStore
        commit: Commit
      },
      payload: { locale: string }
    ) {
      //  安全检查
      payload.locale =
        localeList.indexOf(payload.locale) === -1 ? localeList[0] : payload.locale
      //  应用
      context.commit('setLocale', payload)
      //  持久化
      context.dispatch(
        'cli/db/set',
        {
          database: 'database',
          path: 'locale',
          value: payload.locale
        },
        { root: true }
      )
    },
    //  初始化主题
    async load(context: { dispatch: Dispatch; commit: Commit }) {
      const dbLocale: string = await context.dispatch(
        'cli/db/get',
        { database: 'database', path: 'locale', defaultValue: defalutLocale },
        { root: true }
      )
      // 应用
      context.commit('setLocale', {
        locale:
          process.env.VUE_APP_LOCALE_ENABLE !== 'false'
            ? dbLocale
            : process.env.VUE_APP_LOCALE
      })
    }
  }
}
