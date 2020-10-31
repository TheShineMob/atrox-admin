<template>
  <v-app :class="{ 'atrox-gray': grayActive }">
    <!-- 全屏遮盖加载动画 -->
    <v-overlay :value="loadingActive">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'

const appStore: BindingHelpers = namespace('cli/app') //  vuex中的App模块

@Component
export default class App extends Vue {
  //  是否全屏灰色
  @appStore.State('grayActive') grayActive!: boolean
  //  是否全屏加载
  @appStore.State('loadingActive') loadingActive!: boolean
}
</script>
<style lang="scss">
@import '~@/assets/styles/reset.scss';

.atrox-gray {
  filter: grayscale(100%);
  filter: gray;
}
</style>
