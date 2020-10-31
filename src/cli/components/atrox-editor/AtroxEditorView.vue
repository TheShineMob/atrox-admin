<!--
 * @description 富文本显示模式
 * @author wuy1fffff
 * @date 2020-08-27 17:38
 * @lastEditTime 2020-08-27 17:38
-->
<template>
  <div v-html="content" class="atrox-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'AtroxEditorView' })
export default class AtroxEditorView extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  content!: string
}
</script>

<style lang="scss" scoped></style>
