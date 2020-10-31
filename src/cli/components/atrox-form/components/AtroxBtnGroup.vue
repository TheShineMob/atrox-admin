<!--
 * @description 按钮组
 * @author wuy1fffff
 * @date 2020-09-03 15:39
 * @lastEditTime 2020-09-03 15:39
-->
<template>
  <v-input :value="$attrs.value" :rules="rules">
    <v-btn-toggle
      v-bind="$attrs"
      v-on="$listeners"
      @change="$listeners.input"
      class="mb-1"
    >
      <v-btn v-for="_option in options" :key="_option.value" :value="_option.value">
        {{ _option.text }}
      </v-btn>
    </v-btn-toggle>
  </v-input>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { EasyItem } from '@/config/cli-interface'
import { Prop } from 'vue-property-decorator'
import { RuleFunction } from '../AtroxFormInterface'

@Component({ name: 'AtroxBtnGroup' })
export default class AtroxBtnGroup extends Vue {
  @Prop({ type: Array, default: () => [] }) options!: EasyItem[]
  @Prop({ type: Array, default: () => [] }) rules!: RuleFunction[]
}
</script>
