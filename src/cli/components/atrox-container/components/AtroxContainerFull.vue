<!--
 * @description 填充型容器
 * @author wuy1fffff
 * @date 2020-07-17 15:11
 * @lastEditTime 2020-07-17 15:11
-->
<template>
  <div class="atrox-container-full">
    <div v-if="$slots.header" class="atrox-container-full__header" ref="header">
      <slot name="header" />
    </div>
    <div class="atrox-container-full__body" ref="body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="atrox-container-full__footer" ref="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import NormalScroll from '@/cli/components/atrox-container/components/mixins/NormalScroll.ts'
import { Mixins } from 'vue-property-decorator'

@Component({ name: 'AtroxContainerFull' })
export default class AtroxContainerFull extends Mixins(NormalScroll) {}
</script>
