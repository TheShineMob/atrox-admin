/**
 * @description 混入头部菜单点击事件
 * @author wuy1fffff
 * @date 2020-07-14 16:24
 * @lastEditTime 2020-07-14 16:24
 */
import Vue from 'vue'
import {
  CliRoute,
  FATHER_ROUTE,
  OUTER_ROUTE,
  COMPONENT_ROUTE,
  IFRAME_ROUTE
} from '@/cli/router/cli/adapter'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const menuStore = namespace('cli/menu') //  vuex中的menu模块

@Component
export default class HeaderMenuMixin extends Vue {
  //  侧边活跃菜单
  @menuStore.State('activeAsideMenu') activeAsideMenu!: CliRoute
  //  菜单列表
  @menuStore.State('menuList') menuList!: Array<CliRoute>
  //  设置侧边活跃菜单
  @menuStore.Mutation('setActiveAsideMenu') setActiveAsideMenu!: (payload: {
    menu: CliRoute
  }) => void

  //  菜单点击事件
  handleMenuClick(menu: CliRoute) {
    if (menu.type === FATHER_ROUTE) {
      //  父菜单点击事件
      this.setActiveAsideMenu({ menu })
      this.findFirstMenu(menu)
    } else if (menu.type === OUTER_ROUTE) {
      //  外链菜单
      if (menu.url) this.$autil.dom.open(menu.url)
    } else if (menu.type === COMPONENT_ROUTE) {
      //  点击组件菜单
      this.setActiveAsideMenu({ menu })
      this.$router.push(menu.path)
    }
  }
  //  找到第一个菜单
  findFirstMenu(menu: CliRoute): boolean {
    //  如果是父菜单并且有子  递归查找
    if (menu.type === FATHER_ROUTE && menu.children && menu.children.length > 0) {
      for (let i = 0; i < menu.children.length; i++)
        if (this.findFirstMenu(menu.children[i])) return true
    }
    //  如果是Iframe或者Componet则跳转
    if (menu.type === COMPONENT_ROUTE || menu.type === IFRAME_ROUTE) {
      this.$router.push(menu.path)
      return true
    }
    return false
  }
}
