<!--
 * @description 顶部菜单
 * @author wuy1fffff
 * @date 2020-07-14 15:04
 * @lastEditTime 2020-07-14 15:04
-->
<template>
  <div>
    <template v-for="_headerMenu in menuList">
      <!-- 如果类型为父菜单 -->
      <template
        v-if="
          _headerMenu.type === FATHER_ROUTE &&
            _headerMenu.children.filter(_children => _children.type === FATHER_ROUTE)
              .length !== 0
        "
      >
        <layout-header-menu-unit
          v-if="_headerMenu.children"
          :key="_headerMenu.id"
          :menu="_headerMenu"
          :activeAsideMenu="activeAsideMenu"
          @click:menu="handleMenuClick"
        ></layout-header-menu-unit>
      </template>
      <!-- 如果类型不为父菜单 -->
      <template v-else>
        <v-btn
          :key="_headerMenu.id"
          text
          @click="handleMenuClick(_headerMenu)"
          :class="{
            'atrox-active': activeAsideMenu && _headerMenu.id === activeAsideMenu.id
          }"
        >
          <v-icon size="18">{{ _headerMenu.icon }}</v-icon>
          <div>{{ _headerMenu.disName }}</div>
        </v-btn>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import LayoutHeaderMenuUnit from '@/cli/page/layout/components/menu/header/LayoutHeaderMenuUnit.vue'
import { CliRoute, FATHER_ROUTE, TOP_ROUTE_ID } from '@/cli/router/cli/adapter'
import HeaderMenuMixin from '@/cli/page/layout/components/menu/header/HeaderMenuMixin.ts'
import { Mixins, Watch } from 'vue-property-decorator'
import { RouteRecord } from 'vue-router'

@Component({
  name: 'LayoutHeaderMenu',
  components: { LayoutHeaderMenuUnit }
})
export default class LayoutHeaderMenu extends Mixins(HeaderMenuMixin) {
  FATHER_ROUTE = FATHER_ROUTE

  //  router匹配后找到匹配的设置为活跃菜单
  @Watch('$route.matched', { immediate: true })
  watchRouteMatched(routeMatchedList: Array<RouteRecord>) {
    if (
      routeMatchedList[routeMatchedList.length - 1].meta.id &&
      routeMatchedList[routeMatchedList.length - 1].meta.id !== TOP_ROUTE_ID
    ) {
      let resActiveAsideMenu: CliRoute | undefined = undefined
      this.menuList.forEach(_menu => {
        if (resActiveAsideMenu) {
          //  跳过
        } else {
          //  父菜单则从子级开始寻找
          if (_menu.type === FATHER_ROUTE && _menu.children) {
            const res: CliRoute | undefined = this.findActiveAsideMenu(
              _menu.children,
              routeMatchedList[routeMatchedList.length - 1].meta.id
            )
            if (res) resActiveAsideMenu = _menu
          } else {
            //  其他则寻找自己
            if (_menu.id === routeMatchedList[routeMatchedList.length - 1].meta.id)
              resActiveAsideMenu = _menu
          }
        }
      })
      if (resActiveAsideMenu) this.setActiveAsideMenu({ menu: resActiveAsideMenu })
      else {
        this.setActiveAsideMenu({ menu: this.menuList[0] })
        this.$router.push(this.menuList[0].path)
      }
    }
  }

  //  递归找到某个节点的路径设置顶部活跃菜单
  findActiveAsideMenu(routeList: Array<CliRoute>, key: string): CliRoute | undefined {
    let resRoute: CliRoute | undefined = undefined

    routeList.forEach(_route => {
      if (_route.type === FATHER_ROUTE && _route.children) {
        const res: CliRoute | undefined = this.findActiveAsideMenu(_route.children, key)
        if (res && !resRoute) resRoute = _route
      } else {
        if (!resRoute && _route.id === key) {
          resRoute = _route
        }
      }
    })

    return resRoute
  }
}
</script>
