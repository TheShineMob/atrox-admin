<!--
 * @description 行高选择
 * @author wuy1fffff
 * @date 2020-08-11 10:35
 * @lastEditTime 2020-08-11 10:35
-->
<template>
  <v-menu offset-y :nudge-left="15" transition="scroll-y-transition">
    <template #activator="{on:menu}">
      <v-tooltip top>
        <template #activator="{ on:tooltip }">
          <v-btn v-on="{ ...menu, ...tooltip }" small icon>
            <v-icon v-text="icon"></v-icon>
          </v-btn>
        </template>
        <template>{{ $t(tooltip) }}</template>
      </v-tooltip>
    </template>
    <v-list dense>
      <v-list-item-group color="primary" :value="activeLineHeight">
        <v-list-item
          dense
          v-for="_lineHeight in lineHeights"
          :key="_lineHeight"
          @click="handleLineHeightClick($event, _lineHeight)"
          :value="_lineHeight"
        >
          {{ _lineHeight }}</v-list-item
        >
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { MenuData } from 'tiptap'
import { getActiveLineHeight } from '../helper/utils/lineHieght'

@Component({
  name: 'AtroxEditorLineheight'
})
export default class AtroxEditorLineheight extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly editorContext!: MenuData //  上下文

  @Prop({
    type: String,
    required: true
  })
  readonly icon!: string //  图标

  @Prop({
    type: String,
    required: true
  })
  readonly tooltip!: string //  提示

  get editor() {
    return this.editorContext.editor //  tiptap实例
  }

  get lineHeights(): string[] {
    return this.editor.extensions.options.line_height.lineHeights //  line_height设置的数组
  }

  get activeLineHeight(): string {
    return getActiveLineHeight(this.editor.state) //  获取当前节点的lineHeight
  }

  handleLineHeightClick(e: MouseEvent, lineHeight: string) {
    e.preventDefault()
    e.stopPropagation()
    this.editorContext.commands.line_height({ lineHeight: lineHeight })
  }
}
</script>
