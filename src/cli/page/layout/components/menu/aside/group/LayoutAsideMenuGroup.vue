<!--
 * @description 侧边组菜单
 * @author wuy1fffff
 * @date 2020-07-16 15:32
 * @lastEditTime 2020-07-16 15:32
-->
<template>
  <v-list-group
    :group="group"
    :prepend-icon="subGroup ? undefined : menu.icon"
    :sub-group="subGroup"
    no-action
    color="primary"
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ menu.disName }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <template v-for="_childMenu in menu.children || []">
      <layout-aside-menu-sub-group
        v-if="_childMenu.type === FATHER_ROUTE"
        :key="_childMenu.id"
        :menu="_childMenu"
      />

      <layout-aside-menu-item v-else :menu="_childMenu" :key="_childMenu.id" />
    </template>
  </v-list-group>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { CliRoute, FATHER_ROUTE } from '@/cli/router/cli/adapter'
import LayoutAsideMenuItem from '@/cli/page/layout/components/menu/aside/group/LayoutAsideMenuItem.vue'

@Component({
  name: 'LayoutAsideMenuGroup',
  components: {
    LayoutAsideMenuItem,
    // 懒加载解决嵌套使用注册失败问题
    LayoutAsideMenuSubGroup: () =>
      import('@/cli/page/layout/components/menu/aside/group/LayoutAsideMenuSubGroup.vue')
  }
})
export default class LayoutAsideMenuGroup extends Vue {
  @Prop({ type: Object }) menu!: CliRoute //  需展示菜单

  @Prop({ type: Boolean, default: false }) subGroup!: boolean

  FATHER_ROUTE = FATHER_ROUTE

  //  获得使当前菜单激活的值（子菜单路径的path值）
  get group(): string {
    if (!this.menu.children) return ''
    else return this.genGroup(this.menu.children)
  }

  genGroup(routeList: Array<CliRoute>): string {
    if (!routeList) return ''
    return routeList.map(_child => _child.path).join('|')
  }
}
</script>
