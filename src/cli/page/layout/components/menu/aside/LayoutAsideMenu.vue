<!--
 * @description 布局侧边菜单
 * @author wuy1fffff
 * @date 2020-07-14 17:48
 * @lastEditTime 2020-07-14 17:48
-->
<template>
  <div>
    <template v-if="activeAsideMenu.children && activeAsideMenu.children.length > 0">
      <layout-aside-menu-tree :menu="activeAsideMenu"></layout-aside-menu-tree>
    </template>
    <div v-else class="atrox-no-menu d-flex align-center justify-center">
      <div class="text-center">
        <v-icon size="30" class="mb-3">mdi-rhombus-split-outline</v-icon>
        <div>无菜单</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { CliRoute } from '@/cli/router/cli/adapter'
import LayoutAsideMenuTree from '@/cli/page/layout/components/menu/aside/LayoutAsideMenuTree.vue'

const menuStore = namespace('cli/menu') //  vuex中的Menu模块

@Component({
  name: 'LayoutAsideMenu',
  components: { LayoutAsideMenuTree }
})
export default class LayoutAsideMenu extends Vue {
  //  活跃的侧边菜单
  @menuStore.State('activeAsideMenu') activeAsideMenu!: CliRoute
}
</script>
