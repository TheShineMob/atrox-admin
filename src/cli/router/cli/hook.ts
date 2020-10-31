/**
 * @description vue-router的钩子函数
 * @author wuy1fffff
 * @date 2020-07-15 17:10
 * @lastEditTime 2020-07-15 17:10
 */
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { NavigationGuardNext, Route } from 'vue-router'
import { cliUtils } from '@/cli/utils'
import { LOGIN_PAGE_NAME, ANY_PAGE } from './routes'
import { INDEX_PAGE_NAME } from './cli-routes'
import store from '@/cli/store'

const routerBeforeEach: (to: Route, from: Route, next: NavigationGuardNext) => void = (
  to: Route,
  from: Route,
  next: NavigationGuardNext
) => {
  // 进度条开始
  NProgress.start()
  //  阻止已登录的前往登录页
  const token: string | undefined = cliUtils.cookie.get('token')
  if (to.name === LOGIN_PAGE_NAME) {
    if (token) {
      //  阻止登录，重定向至主页
      next({
        name: INDEX_PAGE_NAME,
        replace: true
      })
      NProgress.done()
    } else {
      //  继续登录
      next()
    }
  } else {
    if (token) {
      next()
    } else {
      if (to.name) {
        if (ANY_PAGE.indexOf(to.name) === -1) {
          //  未登录前往登录页
          store.dispatch('cli/user/logout')
          next({
            name: LOGIN_PAGE_NAME,
            query: {
              redirect: to.fullPath
            }
          })
          NProgress.done()
        } else {
          next()
        }
      } else {
        //  未知路由
        store.dispatch('cli/user/logout')
        next({
          name: LOGIN_PAGE_NAME,
          query: {
            redirect: to.fullPath
          }
        })
        NProgress.done()
        next()
      }
    }
  }
}

const routerAfterEach: (to: Route, from: Route) => void = (to: Route) => {
  // 进度条结束
  NProgress.done()
  //  更改title
  cliUtils.dom.setTitle(to.meta.disName)
}

export { routerBeforeEach, routerAfterEach }
