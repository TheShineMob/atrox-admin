<!--
 * @description 选择文字大小菜单栏
 * @author wuy1fffff
 * @date 2020-08-11 14:41
 * @lastEditTime 2020-08-11 14:41
-->
<template>
  <v-tooltip top>
    <template #activator="{on}">
      <v-select
        v-on="on"
        hide-details
        dense
        outlined
        class="atrox-editor-font--select"
        :menu-props="{
          transition: 'scroll-y-transition',
          offsetY: true
        }"
        :items="fontSizes"
        :value="activeFontSize"
        height="24px"
        @input="toggleFontSize"
      >
        <template #selection="{item}">
          <span class="caption">{{ item.text }}</span>
        </template>
        <template #item="{item}">
          <span :style="{ fontSize: item.text }">{{ item.text }}</span>
        </template>
      </v-select>
    </template>
    <template>{{ $t(tooltip) }}</template>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { findActiveFontSize, DEFAULT_FONT_SIZE } from '../helper/utils/fontSize'
import { MenuData } from 'tiptap'
import { Prop } from 'vue-property-decorator'
import { EasyItem } from '@/config/cli-interface'

@Component({ name: 'AtroxEditorFontSize' })
export default class AtroxEditorFontSize extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly editorContext!: MenuData

  @Prop({
    type: String,
    required: true
  })
  readonly tooltip!: string //  提示

  defaultSize = DEFAULT_FONT_SIZE

  get editor() {
    return this.editorContext.editor
  }

  get fontSizes(): EasyItem[] {
    return [
      {
        text: this.$t('default'),
        value: DEFAULT_FONT_SIZE
      },
      ...this.editor.extensions.options.font_size.fontSizes.map((_size: string) => {
        return {
          text: _size + 'px',
          value: _size
        }
      })
    ]
  }

  get activeFontSize(): string {
    return findActiveFontSize(this.editor.state)
  }

  toggleFontSize(size: string) {
    if (size === this.activeFontSize) {
      this.editorContext.commands.font_size(DEFAULT_FONT_SIZE)
    } else {
      this.editorContext.commands.font_size(size)
    }
  }
}
</script>
