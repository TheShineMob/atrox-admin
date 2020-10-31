import { Commit, Dispatch } from 'vuex'
import { cliUtils } from '@/cli/utils'
import router, { createRouter } from '@/cli/router'
import { LOGIN_PAGE_NAME } from '@/cli/router/cli/routes'
import AtroxDialog from '@/cli/components/atrox-dialog'
import i18n from '@/cli/i18n'
import { set, get, isNull } from 'lodash'
import { cliApi } from '@/cli/api/interface'
import { isUndefined } from 'xe-utils/methods'

/**
 * @description 用户模块
 * @author wuy1fffff
 * @date 2020-07-11 13:16
 * @lastEditTime 2020-07-11 13:16
 */
export interface CliUserStore {
  info: Record<string, any>
}

export default {
  namespaced: true,
  state: {
    info: {
      name: 'wuy1fffff'
    }
  },
  getters: {},
  mutations: {
    setInfo(state: CliUserStore, payload: { info: Record<string, any> }) {
      state.info = payload.info
    }
  },
  actions: {
    //  用户登录
    async login(
      context: { dispatch: Dispatch; commit: Commit },
      payload: { username: string; password: string; remember: boolean }
    ) {
      return new Promise<string>((resolve, reject) => {
        cliApi.user
          .login(payload.username, payload.password)
          .then(r => {
            //  设置uuid以及token
            cliUtils.cookie.set('token', r.data.token)
            //  设置token过期时间
            cliUtils.cookie.set(
              'expiration',
              Math.floor(new Date().getTime() / 1000) + r.data.expire
            )
            //  获取用户信息
            cliApi.user
              .info()
              .then(r => {
                //  设置用户信息
                context.dispatch('setUserInfo', { info: r.data })
                //  获得菜单并存入缓存
                context
                  .dispatch('cli/menu/getMenu', null, { root: true })
                  .then(() => {
                    //  从数据库加载配置
                    context.dispatch('load')
                    resolve('ok')
                  })
                  .catch(e => {
                    reject(e.msg || e)
                  })
              })
              .catch(e => {
                reject(e.msg || e)
              })
          })
          .catch(e => {
            reject(e.msg || e)
          })
      })
    },
    //  用户注销
    async logout(
      context: { commit: Commit; dispatch: Dispatch },
      payload: { confirm?: boolean; logout?: boolean }
    ) {
      async function logout() {
        // 删除cookie
        cliUtils.cookie.remove('token')
        // 清空 vuex 用户信息
        await context.dispatch('setUserInfo', { info: {} })
        //  清空菜单
        await context.dispatch('cli/menu/setMenuList', { menuList: [] }, { root: true })
        //  清空addRoutes
        set(router, 'matcher', get(createRouter(), 'matcher'))
        //  清空tab
        await context.dispatch('cli/tab/setTabList', { tabList: [] }, { root: true })

        // 跳转路由
        if (payload && payload.logout) {
          // 如果是token过期了，就将当前的路由保存下来
          if (
            parseInt(cliUtils.cookie.get('expiration') as string) <
            Math.floor(new Date().getTime() / 1000)
          ) {
            const redirect = ('redirect' + window.location.href).match(/#(\S*)/)
            router.push({
              name: LOGIN_PAGE_NAME,
              query: {
                redirect:
                  !isUndefined(redirect) && !isNull(redirect) && redirect?.length > 1
                    ? redirect[1]
                    : ''
              }
            })
            console.log(router)
          } else {
            router.push({ name: LOGIN_PAGE_NAME })
          }
        }

        // 删除token过期时间
        cliUtils.cookie.remove('expiration')
      }
      //  如果需要确认
      if (payload && payload.confirm) {
        //  灰屏
        context.commit('cli/app/setGrayActive', { grayActive: true }, { root: true })
        AtroxDialog.cancel({
          title: i18n.t('cli.header.logout') as string,
          message: i18n.t('confirmLogout') as string
        })
          .then(() => {
            //  确认注销
            logout()
          })
          .catch(() => {
            //  取消注销
          })
          .finally(() => {
            //  取消灰屏
            context.commit('cli/app/setGrayActive', { grayActive: false }, { root: true })
          })
      } else {
        //  不需要确认
        logout()
      }
    },
    //  设置用户信息并持久化
    async setUserInfo(
      context: { commit: Commit; dispatch: Dispatch },
      payload: { info: Record<string, string> }
    ) {
      //  设置用户信息
      context.commit('setInfo', { info: payload.info })
      //  持久化设置用户信息
      await context.dispatch(
        'cli/db/set',
        {
          database: 'sys',
          path: 'user.info',
          value: payload.info
        },
        { root: true }
      )
    },
    //  初始化加载用户信息
    async load(context: { dispatch: Dispatch; state: CliUserStore; commit: Commit }) {
      //  设置用户信息
      context.commit('setInfo', {
        info: await context.dispatch(
          'cli/db/get',
          { database: 'sys', path: 'user.info', defaultValuje: {} },
          { root: true }
        )
      })
      //  设置主题
      await context.dispatch('cli/theme/load', null, { root: true })
      //  设置颜色
      await context.dispatch('cli/color/load', null, { root: true })
      //  设置语言时区
      await context.dispatch('cli/locale/load', null, { root: true })
      //  获取并设置菜单
      await context.dispatch('cli/menu/load', null, { root: true })
    }
  }
}
