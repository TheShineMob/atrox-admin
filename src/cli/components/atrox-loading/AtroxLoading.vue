<!--
 * @description 加载组件
 * @author wuy1fffff
 * @date 2020-07-29 16:50
 * @lastEditTime 2020-07-29 16:50
-->
<template>
  <v-overlay absolute opacity="0.8" light :dark="false" color="white">
    <div class="atorx-loading-wrap">
      <div class="atrox-loading-line_1"></div>
      <div class="atrox-loading-line_2"></div>
      <div class="atrox-loading-line_3"></div>
      <div class="atrox-loading-line_4"></div>
      <div class="atrox-loading-line_5"></div>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'AtroxLoading' })
export default class AtroxLoading extends Vue {}
</script>

<style lang="scss" scoped>
.atorx-loading-wrap {
  width: 50px;
  height: 25px;
  text-align: center;

  div {
    background-color: $color-primary;
    height: 100%;
    width: 3px;
    margin: 1px;
    display: inline-block;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  @for $i from 1 through 5 {
    .atrox-loading-line_#{$i} {
      animation-delay: $i * 0.1s - 1.3s;
    }
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
