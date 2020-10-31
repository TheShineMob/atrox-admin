/**
 * @description 暴露给vue-router使用的路由列表
 * @author wuy1fffff
 * @date 2020-07-13 15:54
 * @lastEditTime 2020-07-13 15:54
 */

import { RouteConfigSingleView } from 'vue-router/types/router'
import Layout from '@/cli/page/layout/Layout.vue'
import Login from '@/cli/page/login/Login.vue'
import Page404 from '@/cli/page/error/Page404.vue'
import { INDEX_PAGE_NAME } from './cli-routes'

const LOGIN_PAGE_NAME = 'Login'
const ANY_PAGE: Array<string> = []

//  在框架内的路由
const cliIn: RouteConfigSingleView = {
  path: '/',
  component: Layout,
  redirect: {
    name: INDEX_PAGE_NAME
  },
  children: []
}

const cliOut: Array<RouteConfigSingleView> = [
  {
    path: '/login',
    name: LOGIN_PAGE_NAME,
    component: Login
  }
]

/**
 * 错误页面
 */
const errorPage: Array<RouteConfigSingleView> = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404
  }
]

export { cliIn, errorPage, LOGIN_PAGE_NAME, ANY_PAGE }

export default [...cliOut]
