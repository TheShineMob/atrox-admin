<!--
 * @description 重新加载菜单
 * @author wuy1fffff
 * @date 2020-09-16 16:44
 * @lastEditTime 2020-09-16 16:44
-->
<template>
  <!-- 仅开发环境显示 -->
  <v-list-item v-if="$env.NODE_ENV === 'development'" @click="reloadMenu">
    <v-list-item-title>
      {{ $t('cli.header.reloadMenu') }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const menuStore = namespace('cli/menu')

@Component({ name: 'LayoutUserMenu' })
export default class LayoutUserMenu extends Vue {
  //  加载菜单
  @menuStore.Action('getMenu') getMenu!: () => void

  reloadMenu() {
    this.getMenu()
    location.reload()
  }
}
</script>

<style lang="scss" scoped></style>
