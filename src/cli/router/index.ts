/**
 * @description vue-router设置总文件
 * @author wuy1fffff
 * @date 2020-07-15 17:40
 * @lastEditTime 2020-07-15 17:40
 */
import Vue from 'vue'
import VueRouter, { RawLocation, Route, NavigationGuardNext } from 'vue-router'
import routes from './cli/routes'
import { routerBeforeEach, routerAfterEach } from './cli/hook'

// 解决 vue-router NavigationDuplicated 报错问题
const VueRouterPush: (location: RawLocation) => Promise<Route> = VueRouter.prototype.push
//  push方法
VueRouter.prototype.push = function push(location: RawLocation) {
  //  在原型链上添加catch方法
  return VueRouterPush.call(this, location).catch(err => err)
}

const VueRouterReplace: (location: RawLocation) => Promise<Route> =
  VueRouter.prototype.replace
//  replace方法
VueRouter.prototype.replace = function replace(location: RawLocation) {
  //  在原型链上添加catch方法
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const createRouter = () =>
  new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
  })

const router = createRouter()

// 设置前后钩子
router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
  routerBeforeEach(to, from, next)
})
router.afterEach(async (to: Route, from: Route) => {
  routerAfterEach(to, from)
})

export { createRouter }

export default router
