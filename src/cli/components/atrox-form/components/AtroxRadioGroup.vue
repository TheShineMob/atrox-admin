<!--
 * @description 按钮组
 * @author wuy1fffff
 * @date 2020-09-04 10:42
 * @lastEditTime 2020-09-04 10:42
-->
<template>
  <v-radio-group v-bind="$attrs" v-on="$listeners" @change="$listeners.input">
    <v-radio
      v-for="_option in options"
      :label="_option.text"
      :key="_option.value"
      :value="_option.value"
    >
      {{ _option.text }}
    </v-radio>
  </v-radio-group>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { EasyItem } from '@/config/cli-interface'
import { RuleFunction } from '../AtroxFormInterface'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'AtroxRadioGroup' })
export default class AtroxRadioGroup extends Vue {
  @Prop({ type: Array, default: () => [] }) options!: EasyItem[]
  @Prop({ type: Array, default: () => [] }) rules!: RuleFunction[]
}
</script>

<style lang="scss" scoped></style>
