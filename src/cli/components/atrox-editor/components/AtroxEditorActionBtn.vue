<!--
 * @description 富文本基本操作按钮
 * @author wuy1fffff
 * @date 2020-08-10 19:48
 * @lastEditTime 2020-08-10 19:48
-->
<template>
  <v-tooltip top>
    <template #activator="{ on }">
      <v-btn
        v-on="on"
        small
        icon
        :class="{
          'v-btn--active': isActive
        }"
        @click="command"
      >
        <v-icon v-text="icon"></v-icon>
      </v-btn>
    </template>
    <template>{{ $t(tooltip) }}</template>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { cliConst } from '@/config/cli-constant'

@Component({ name: 'AtroxEditorActionBtn' })
export default class AtroxEditorActionBtn extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly icon!: string //  图标

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isActive!: boolean //  是否激活

  @Prop({
    type: String,
    required: true
  })
  readonly tooltip!: string //  提示

  @Prop({
    type: Function,
    default: cliConst.noop
  })
  readonly command!: Function //触发方法
}
</script>
