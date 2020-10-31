<!--
 * @description 卡片式布局容器优化滚动型
 * @author wuy1fffff
 * @date 2020-07-17 18:22
 * @lastEditTime 2020-07-17 18:22
-->
<template>
  <div class="atrox-container-card-bs">
    <div v-if="$slots.header" class="atrox-container-card-bs__header" ref="header">
      <slot name="header" />
    </div>
    <div class="atrox-container-card-bs__body" ref="wrapper">
      <div class="atrox-container-card-bs__body-wrapper-inner">
        <div class="atrox-container-card-bs__body-card">
          <slot />
        </div>
      </div>
    </div>
    <div v-if="$slots.footer" class="atrox-container-card-bs__footer" ref="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import BetterScroll from './mixins/BetterScroll'

@Component({ name: 'AtroxContainerCardBs' })
export default class AtroxContainerCardBs extends Mixins(BetterScroll) {}
</script>
