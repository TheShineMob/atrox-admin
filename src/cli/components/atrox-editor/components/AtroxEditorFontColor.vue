<!--
 * @description 文字颜色
 * @author wuy1fffff
 * @date 2020-08-12 16:14
 * @lastEditTime 2020-08-12 16:14
-->
<template>
  <v-menu
    offset-y
    nudge-left="48"
    class="atrox-editor-heading"
    transition="scroll-y-transition"
  >
    <template #activator="{on:menu}">
      <v-tooltip top>
        <template #activator="{ on:tooltip }">
          <v-btn v-on="{ ...menu, ...tooltip }" small icon>
            <v-icon v-text="icon" :color="selectedColor"></v-icon>
          </v-btn>
        </template>
        <template>{{ $t(tooltip) }}</template>
      </v-tooltip>
    </template>
    <div class="d-flex flex-wrap" style="width: 120px;">
      <v-col cols="12" class="pa-0">
        <v-btn
          block
          small
          text
          style="background-color: white;"
          :color="selectedColor ? '' : 'primary'"
          @click="toggleFontColor('', $event)"
        >
          {{ $t('default') }}
        </v-btn>
      </v-col>
      <v-avatar
        size="24"
        tile
        v-for="_color in fontColors"
        :key="_color"
        :color="_color"
        @click="toggleFontColor(_color, $event)"
      >
        <v-icon v-if="selectedColor === _color" size="16" dark>mdi-check</v-icon>
      </v-avatar>
    </div>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { MenuData } from 'tiptap'

@Component({ name: 'AtroxEditorFontColor' })
export default class AtroxEditorFontColor extends Vue {
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
    return this.editorContext.editor
  }

  get fontColors(): string[] {
    return this.editor.extensions.options.font_color.colors
  }

  get selectedColor(): string {
    return this.editorContext.getMarkAttrs('font_color').color
  }

  toggleFontColor(color = '', e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (color === this.selectedColor) this.editorContext.commands.font_color('')
    else this.editorContext.commands.font_color(color)
  }
}
</script>
