<!--
 * @description 消息框组件
 * @author wuy1fffff
 * @date 2020-07-22 15:46
 * @lastEditTime 2020-07-22 15:46
-->
<template>
  <v-dialog
    v-model="value"
    :width="width"
    :transition="transition"
    :persistent="persistent"
    scrollable
    @click:outside="handleAction('cancel')"
  >
    <v-card elevation="0">
      <v-card-title class="justify-center">{{ title || $t('tip') }}</v-card-title>
      <v-card-text class="text-center">{{ message }}</v-card-text>
      <div class="d-flex" v-if="cancelBtn || confirmBtn">
        <v-btn
          v-if="cancelBtn"
          tile
          class="primary--text spacer"
          depressed
          @click="handleAction('cancel')"
        >
          {{ cancelBtnText || $t('action.cancel') }}
        </v-btn>
        <v-btn
          v-if="confirmBtn"
          tile
          class="primary--text spacer"
          depressed
          @click="handleAction('confirm')"
        >
          {{ confirmBtnText || $t('action.confirm') }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'AtroxDialog' })
export default class AtroxDialog extends Vue {
  @Prop({ type: Boolean, default: false }) value!: boolean //  控制显示
  @Prop({ type: [Number, String], default: '320' }) width!: number | string //  最大宽度
  @Prop({ type: String, default: '' }) title!: string // 标题
  @Prop({ type: String, default: '' }) message!: string // 内容
  @Prop({ type: Boolean, default: true }) confirmBtn!: boolean //  是否显示确认按钮
  @Prop({ type: Boolean, default: true }) cancelBtn!: boolean //  是否显示取消按钮
  @Prop({ type: String, default: '' }) cancelBtnText!: string //  取消按钮文本
  @Prop({ type: String, default: '' }) confirmBtnText!: string //  确认按钮文本
  @Prop({ type: String, default: '' }) transition!: string //  动画
  @Prop({ type: Boolean, default: false }) persistent!: boolean // 点击遮罩层不关闭
  @Prop({ type: Function, default: null }) callback!: null | Function

  handleAction(action: string) {
    this.emitAction(action)
    // 如果没开着就不用关闭
    if (!this.value) return
    // 关闭
    this.onClose(action)
  }

  onClose(action: string) {
    this.$emit('input', false)
    if (this.callback) this.callback(action)
  }

  @Emit()
  emitAction(action: string) {
    return action
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
  box-shadow: none;
  animation-duration: 0.3s;
}
</style>
