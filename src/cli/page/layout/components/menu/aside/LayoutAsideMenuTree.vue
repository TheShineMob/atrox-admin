<!--
 * @description 侧边菜单树
 * @author wuy1fffff
 * @date 2020-07-15 09:28
 * @lastEditTime 2020-07-15 09:28
-->
<template>
  <v-list dense nav color="primary">
    <template v-for="_childMenu in menu.children">
      <layout-aside-menu-group
        v-if="_childMenu.type === FATHER_ROUTE"
        :asideCollapse="asideCollapse"
        :key="_childMenu.id"
        :menu="_childMenu"
      />

      <layout-aside-menu-item
        v-else
        icon
        :menu="_childMenu"
        :key="_childMenu.id"
        :asideCollapse="asideCollapse"
      />
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import { CliRoute, FATHER_ROUTE } from '@/cli/router/cli/adapter'
import LayoutAsideMenuGroup from '@/cli/page/layout/components/menu/aside/group/LayoutAsideMenuGroup.vue'
import LayoutAsideMenuItem from '@/cli/page/layout/components/menu/aside/group/LayoutAsideMenuItem.vue'

@Component({
  name: 'LayoutAsideMenuTree',
  components: { LayoutAsideMenuGroup, LayoutAsideMenuItem }
})
export default class LayoutAsideMenuTree extends Vue {
  @Prop({ type: Object }) menu!: CliRoute //  需展示菜单
  @Prop({ type: Boolean, default: false }) asideCollapse!: boolean //  侧边栏是否收缩
  FATHER_ROUTE = FATHER_ROUTE

  //  菜单点击事件
  @Emit('menuClick')
  menuClick(menu: CliRoute) {
    return menu
  }
}
</script>
