<!--
 * @description 切换主题
 * @author wuy1fffff
 * @date 2020-07-09 16:27
 * @lastEditTime 2020-07-09 16:27
-->
<template>
  <v-menu
    max-width="150"
    min-width="150"
    nudge-left="10"
    nudge-top="2"
    left
    offset-x
    :close-on-content-click="false"
    transition="slide-x-transition"
  >
    <!-- 触发插槽 -->
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-title>
          {{ $t('cli.header.theme') }}
        </v-list-item-title>
        <v-list-item-action class="my-0">
          <v-icon size="18">mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
    <!-- 主题列表 -->
    <v-list dense nav>
      <v-list-item
        v-for="(_theme, index) in themeList"
        :key="_theme.name"
        @click="setTheme({ themeName: _theme.name })"
      >
        <v-list-item-title>
          {{ $tc('cli.header.themeList', index) }}
        </v-list-item-title>
        <v-list-item-action class="my-0">
          <v-icon size="18" v-if="theme.name === _theme.name">mdi-check</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { AtroxTheme, themeList } from '@/config/cli-config'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'

const themeStore: BindingHelpers = namespace('cli/theme') //  vuex中的Theme模块

@Component({ name: 'LayoutUserThemes' })
export default class LayoutUserThemes extends Vue {
  //  主题列表
  themeList: Array<AtroxTheme> = themeList
  //  当前主题
  @themeStore.State('theme') theme!: AtroxTheme
  //  当前主题
  @themeStore.Action('setTheme') setTheme!: (payload: { themeName: string }) => void
}
</script>
