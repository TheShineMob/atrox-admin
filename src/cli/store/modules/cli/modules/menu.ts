import {
  CliRoute,
  COMPONENT_ROUTE,
  FATHER_ROUTE,
  initAndSetPath,
  recursionGetNotFather,
  TOP_ROUTE_ID
} from '@/cli/router/cli/adapter'
import { Commit, Dispatch } from 'vuex'
import { cliRoutes } from '@/cli/router/cli/cli-routes'
import router from '@/cli/router'
import { cliIn, errorPage } from '@/cli/router/cli/routes'
import { cloneDeep } from 'lodash'
import { cliApi } from '@/cli/api/interface'
import Vue from 'vue'

const tempRoute: Array<CliRoute> = [
  {
    type: FATHER_ROUTE,
    name: 'System',
    disName: '系统',
    id: '1',
    path: 'sys',
    icon: 'mdi-sitemap',
    parentId: TOP_ROUTE_ID,
    children: [
      {
        type: COMPONENT_ROUTE,
        name: 'UserManage',
        disName: '用户',
        id: '1-1',
        icon: 'mdi-account',
        path: 'user',
        component: 'sys/user/UserManage.vue',
        parentId: '1'
      },
      {
        type: COMPONENT_ROUTE,
        name: 'RoleManage',
        disName: '角色',
        id: '1-2',
        icon: 'mdi-account-child-outline',
        path: 'role',
        component: 'sys/role/RoleManage.vue',
        parentId: '1'
      },
      {
        type: COMPONENT_ROUTE,
        name: 'ResourceManage',
        disName: '资源',
        id: '1-3',
        icon: 'mdi-account-details-outline',
        path: 'resource',
        component: 'sys/resource/ResourceManage.vue',
        parentId: '1'
      },
      {
        type: COMPONENT_ROUTE,
        name: 'MenuManage',
        disName: '菜单',
        id: '1-4',
        icon: 'mdi-menu',
        path: 'menu',
        component: 'sys/menu/MenuManage.vue',
        parentId: '1'
      }
    ]
  }
]

/**
 * @description 菜单模块
 * @author wuy1fffff
 * @date 2020-07-11 13:16
 * @lastEditTime 2020-07-11 13:16
 */
export interface CliMenuStore {
  asideCollapse: boolean //  侧边是否收缩
  asideCollapseTransition: boolean //  是否开启侧边栏收缩动画
  menuList: Array<CliRoute>
  activeAsideMenu: CliRoute //  活跃的侧边菜单
}
export default {
  namespaced: true,
  state: {
    //  侧边是否收缩
    asideCollapse: false,
    //  是否开启侧边栏收缩动画
    asideCollapseTransition: true,
    //  菜单列表
    menu: [],
    //  活跃的侧边菜单
    activeAsideMenu: {}
  },
  getters: {},
  mutations: {
    //  设置菜单列表
    setMenuList(state: CliMenuStore, payload: { menuList: Array<CliRoute> }) {
      state.menuList = [...payload.menuList]
    },
    //  设置侧边菜单
    setActiveAsideMenu(state: CliMenuStore, payload: { menu: CliRoute }) {
      //  检查重复
      if (!!state.activeAsideMenu && state.activeAsideMenu.id === payload.menu.id) return
      state.activeAsideMenu = payload.menu
    }
  },
  actions: {
    //    切换侧边状态
    async asideCollapseToggle(context: { state: CliMenuStore }) {
      context.state.asideCollapse = !context.state.asideCollapse
    },
    //  从后端请求菜单并存入缓存
    async getMenu(context: { dispatch: Dispatch }) {
      return new Promise((resolve, reject) => {
        cliApi.user
          .menu()
          .then(r => {
            //本地菜单使用
            const menuList = cloneDeep([...cliRoutes, ...tempRoute])
            //  遍历设置菜单路径以及初始化
            initAndSetPath(menuList)
            context.dispatch('setMenuList', { menuList })
            resolve('ok')

            //动态菜单启用
            // if (r.data.length === 0) {
            //   reject('或许您没有权限请问问管理员ORZ')
            // } else {
            //   const menuList = cloneDeep([...cliRoutes, ...r.data])
            //   // @ts-ignore 遍历设置菜单路径以及初始化
            //   initAndSetPath(menuList)
            //   context.dispatch('setMenuList', { menuList })
            //   resolve('ok')
            // }
          })
          .catch(e => {
            reject(e.msg || e)
          })
      })
    },
    //  设置菜单并持久化
    async setMenuList(
      context: { commit: Commit; dispatch: Dispatch },
      payload: { menuList: Array<CliRoute> }
    ) {
      context.commit('setMenuList', payload)
      await context.dispatch(
        'cli/db/set',
        { database: 'database', path: 'menu', value: payload.menuList },
        { root: true }
      )
    },
    // 获得菜单并且设置菜单
    async load(context: { commit: Commit; dispatch: Dispatch }) {
      //  从缓存中获得菜单
      const menuList: Array<CliRoute> = await context.dispatch(
        'cli/db/get',
        {
          database: 'database',
          path: 'menu',
          defaultValue: []
        },
        { root: true }
      )
      if (menuList.length === 0) {
        Vue.prototype.$adialog('或许您没有权限请问问管理员ORZ').finally(() => {
          context.dispatch('cli/user/logout', {}, { root: true })
        })
        return false
      }
      //  组装固有菜单并切换
      const routerMenu = cliIn
      routerMenu.children = recursionGetNotFather(menuList)
      //  加入路由
      router.addRoutes([routerMenu, ...errorPage])
      //  保存并持久化菜单
      context.dispatch('setMenuList', { menuList })
    }
  }
}
