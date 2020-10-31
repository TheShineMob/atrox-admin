<!--
 * @description 图标选择器
 * @author wuy1fffff
 * @date 2020-07-20 15:10
 * @lastEditTime 2020-07-20 15:10
-->
<template>
  <v-autocomplete
    v-bind="$attrs"
    v-model="lazyValue"
    :items="computedIconList"
    cache-items
    @input="val => autocomplateChange(val)"
  >
    <template #selection>
      <div>
        <v-icon v-text="lazyValue" size="16"></v-icon>
        {{ lazyValue }}
      </div>
    </template>
    <template v-slot:item="{ item }">
      <v-icon v-text="item" size="18"></v-icon>
      <div class="ml-4">
        {{ item }}
      </div>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import { iconList } from './icon-list'

@Component({ name: 'AtroxIconSelect' })
export default class AtroxIconSelect extends Vue {
  @Prop({ type: String, default: '' }) value!: string //  传递的图标值
  lazyValue = '' //  组件内的值

  created() {
    //    创建生命周期时赋值
    this.lazyValue = this.value
  }

  @Watch('value')
  lazyValueChange() {
    if (this.value !== this.lazyValue) this.lazyValue = this.value //  简体外部值改变时改变组件内的value
  }

  @Emit('input')
  valueInput(val: string) {
    //    向外部v-model通知值改变
    return val
  }

  autocomplateChange(val: string) {
    this.lazyValue = val
    this.valueInput(val)
  }

  get computedIconList(): string[] {
    return iconList.map(_icon => `mdi-${_icon}`)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-input__prepend-inner {
  padding-right: 10px !important;
}
</style>
