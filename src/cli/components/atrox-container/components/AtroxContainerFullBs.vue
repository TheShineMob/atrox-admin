<!--
 * @description bs优化的填充式布局
 * @author wuy1fffff
 * @date 2020-07-17 16:09
 * @lastEditTime 2020-07-17 16:09
-->
<template>
  <div class="atrox-container-full-bs">
    <div v-if="$slots.header" class="atrox-container-full-bs__header" ref="header">
      <slot name="header" />
    </div>
    <div class="atrox-container-full-bs__body" ref="wrapper">
      <div class="atrox-container-full-bs__body-wrapper-inner">
        <slot />
      </div>
    </div>
    <div v-if="$slots.footer" class="atrox-container-full-bs__footer" ref="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import BetterScroll from '@/cli/components/atrox-container/components/mixins/BetterScroll.ts'
import { Mixins } from 'vue-property-decorator'

@Component({ name: 'AtroxContainerFullBs' })
export default class AtroxContainerFullBs extends Mixins(BetterScroll) {}
</script>
