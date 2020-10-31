<!--
 * @description 
 * @author wuy1fffff
 * @date 2020-09-03 09:46
 * @lastEditTime 2020-09-03 09:46
-->
<template>
  <v-input :rules="rules" :value="value">
    <v-checkbox
      v-for="_option in options"
      :key="_option.value"
      :label="_option.text"
      :value="_option.value"
      v-bind="$attrs"
      :rules="[]"
      hide-details
      v-model="lazyValue"
      @change="lazyValueChange"
      multiple
    ></v-checkbox>
  </v-input>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { EasyItem } from '@/config/cli-interface'
import { RuleFunction } from '../AtroxFormInterface'

@Component({ name: 'AtroxCheckboxes' })
export default class AtroxCheckboxes extends Vue {
  @Prop({ type: Array, default: () => [] }) options!: EasyItem[]
  @Prop({ type: Array, default: () => [] }) rules!: RuleFunction[]
  @Prop({ type: [Array, Object], default: null }) value!: string[] | null

  lazyValue: string[] | null = null

  localChangeSign = false

  @Watch('value', { deep: true, immediate: true })
  valueChange() {
    if (this.localChangeSign) {
      this.localChangeSign = false
      return false
    }
    this.lazyValue = this.value
  }

  lazyValueChange() {
    this.localChangeSign = true
    this.$emit('input', this.lazyValue)
  }
}
</script>
