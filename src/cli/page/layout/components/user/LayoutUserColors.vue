<!--
 * @description 切换颜色
 * @author wuy1fffff
 * @date 2020-07-08 19:54
 * @lastEditTime 2020-07-08 19:54
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
          {{ $t('cli.header.color') }}
        </v-list-item-title>
        <v-list-item-action class="my-0">
          <v-icon size="18">mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
    <!-- 颜色列表 -->
    <v-list dense nav>
      <v-list-item
        v-for="(_color, index) in colorList"
        :key="_color"
        @click="setColor({ color: _color })"
      >
        <v-list-item-title>
          <v-btn small block depressed :color="_color" class="my-1" dark>
            {{ $tc('cli.header.colorList', index) }}
          </v-btn>
        </v-list-item-title>
        <v-list-item-action class="my-0">
          <v-icon size="18" v-if="color === _color">mdi-check</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { colorList } from '@/config/cli-config'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'

const colorStore: BindingHelpers = namespace('cli/color') //vuex中的color模块

@Component({ name: 'LayoutUserColors' })
export default class LayoutUserColors extends Vue {
  //    颜色列表
  colorList: Array<string> = colorList
  //    切换主颜色
  @colorStore.Action('setColor') setColor!: (payload: { color: string }) => void
  //    当前颜色
  @colorStore.State('color') color!: string
}
</script>
