<!--
 * @description 侧边非组菜单
 * @author wuy1fffff
 * @date 2020-07-16 16:40
 * @lastEditTime 2020-07-16 16:40
-->
<template>
  <v-list-item
    color="primary"
    ripple
    @click="handleMenuClick(menu)"
    :to="menu.type === OUTER_ROUTE ? undefined : menu.path"
  >
    <v-list-item-icon v-if="icon">
      <v-icon v-text="menu.icon" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-text="menu.disName" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  CliRoute,
  OUTER_ROUTE,
  COMPONENT_ROUTE,
  IFRAME_ROUTE
} from '@/cli/router/cli/adapter'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'LayoutAsideMenuItem' })
export default class LayoutAsideMenuItem extends Vue {
  @Prop({ type: Object }) menu!: CliRoute //  需展示菜单
  @Prop({ type: Boolean, default: false }) icon!: boolean

  OUTER_ROUTE = OUTER_ROUTE

  //  菜单点击事件
  handleMenuClick(menu: CliRoute) {
    if (menu.type === OUTER_ROUTE) {
      //  外链菜单
      if (menu.url) this.$autil.dom.open(menu.url)
    } else if (menu.type === COMPONENT_ROUTE) {
      //  点击组件菜单
    } else if (menu.type === IFRAME_ROUTE) {
      //  Iframe菜单
    }
  }
}
</script>
