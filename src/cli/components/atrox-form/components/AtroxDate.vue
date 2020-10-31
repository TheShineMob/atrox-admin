<!--
 * @description 时间日期选择器
 * @author wuy1fffff
 * @date 2020-10-09 14:56
 * @lastEditTime 2020-10-09 14:56
-->
<template>
  <v-input :value="value" :rules="rules">
    <vxe-input :type="type" v-bind="$attrs" v-model="inputValue"></vxe-input>
  </v-input>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { RuleFunction } from '../AtroxFormInterface'
import dayjs from 'dayjs'
import { isEmpty } from 'xe-utils/methods'

@Component({ name: 'AtroxDateTime' })
export default class AtroxDateTime extends Vue {
  inputValue = ''
  localChange = false
  @Prop({ type: [Number, String], default: 0 }) value!: any

  @Prop({ type: String, default: 'date' }) type!:
    | 'date'
    | 'week'
    | 'month'
    | 'year'
    | 'time'
    | 'datetime'

  @Prop({ type: Array, default: () => [] }) rules!: RuleFunction[]

  @Prop({ type: Boolean, default: true }) isInit!: boolean //是否在值为空的时候初始化值

  @Prop({ type: String }) parseFormat!: string //解析绑定值的格式

  @Prop({ type: String }) valueFormat!: string //指定返回值的格式

  @Watch('value', { immediate: true })
  valueChange(val: number) {
    if (this.localChange) {
      this.localChange = false
      return
    }
    if (val === 0 || val === undefined || val === null) {
      if (this.isInit) {
        this.inputValue = dayjs().format('YYYY-MM-DD HH:mm:ss')
        this.$emit(
          'input',
          !isEmpty(this.valueFormat)
            ? dayjs(this.inputValue).format(this.valueFormat)
            : new Date(this.inputValue).getTime()
        )
      }
    } else {
      this.inputValue = !isEmpty(this.parseFormat)
        ? dayjs(val, this.parseFormat).format('YYYY-MM-DD HH:mm:ss')
        : dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
  }

  @Watch('inputValue')
  emitValueChange() {
    this.localChange = true
    this.$emit(
      'input',
      !isEmpty(this.valueFormat)
        ? dayjs(this.inputValue).format(this.valueFormat)
        : new Date(this.inputValue).getTime()
    )
  }
}
</script>
