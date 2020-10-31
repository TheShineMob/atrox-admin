<!--
 * @description 顶部全屏
 * @author wuy1fffff
 * @date 2020-07-11 13:36
 * @lastEditTime 2020-07-11 13:36
-->
<template>
  <v-btn text @click="fullscreenToggle">
    <v-icon :title="$t('cli.header.fullscreen')" v-if="!fullscreen">
      mdi-fullscreen
    </v-icon>
    <v-icon :title="$t('cli.header.exitFullscreen')" v-else>
      mdi-fullscreen-exit
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'

const fullscreen: BindingHelpers = namespace('cli/fullscreen') //  vuex中的fullscreen模块

@Component({ name: 'LayoutFullscreen' })
export default class LayoutFullscreen extends Vue {
  //  是否全屏
  @fullscreen.State('fullscreen') fullscreen!: boolean
  //  切换全屏与否
  @fullscreen.Action('fullscreenToggle') fullscreenToggle!: () => void
}
</script>

<style lang="scss"></style>
