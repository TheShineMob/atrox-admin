<!--
 * @description 函数式消息框组件
 * @author wuy1fffff
 * @date 2020-07-27 09:06
 * @lastEditTime 2020-07-27 09:06
-->
<template>
  <v-snackbar
    v-model="value"
    :transition="transition"
    :top="top"
    :color="color"
    :timeout="timeout"
    :multi-line="multiLine"
    :vertical="vertical"
    >{{ message }}
    <template v-slot:action>
      <v-btn icon @click="value = false">
        <v-icon size="16">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'AtroxMessage' })
export default class AtroxMessage extends Vue {
  @Prop({ type: Boolean, default: false }) value!: boolean //  控制显示
  @Prop({ type: String, default: 'v-snack-transition' }) transition!: string //  动画
  @Prop({ type: String, default: '' }) message!: string // 内容
  @Prop({ type: Boolean, default: true }) top!: boolean // 顶部显示
  @Prop({ type: String, default: 'primary' }) color!: string // 顶部显示
  @Prop({ type: Number, default: 3000 }) timeout!: number //  关闭延时
  @Prop({ type: Boolean, default: true }) multiLine!: boolean //  关闭延时
  @Prop({ type: Boolean, default: true }) vertical!: boolean //  按钮与内容不在一行
}
</script>

<style lang="scss" scoped>
::v-deep .v-snack__wrapper {
  box-shadow: none;
  animation-duration: 0.3s;

  & .v-snack__content {
    word-break: break-all;
  }
}
</style>
