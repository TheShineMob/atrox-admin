<!--
 * @description 
 * @author wuy1fffff
 * @date 2020-07-17 17:32
 * @lastEditTime 2020-07-17 17:32
-->
<template>
  <div class="atrox-container-card">
    <div v-if="$slots.header" class="atrox-container-card__header" ref="header">
      <slot name="header" />
    </div>
    <div class="atrox-container-card__body" ref="body">
      <div class="atrox-container-card__body-card">
        <slot />
      </div>
    </div>
    <div v-if="$slots.footer" class="atrox-container-card__footer" ref="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import NormalScroll from '@/cli/components/atrox-container/components/mixins/NormalScroll.ts'

@Component({ name: 'AtroxContainerCard' })
export default class AtroxContainerCard extends Mixins(NormalScroll) {}
</script>
