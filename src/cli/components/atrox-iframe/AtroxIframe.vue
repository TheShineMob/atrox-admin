<!--
 * @description Ifram框架
 * @author wuy1fffff
 * @date 2020-07-20 13:59
 * @lastEditTime 2020-07-20 13:59
-->
<template>
  <atrox-container v-bind="$attrs">
    <iframe class="atrox-container-frame" :src="src" frameborder="0" />
  </atrox-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'AtroxIframe' })
export default class AtroxIframe extends Vue {
  @Prop({ type: String, default: '' }) src!: string //  iframe的src
}
</script>

<style lang="scss" scoped>
.atrox-container-frame {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
