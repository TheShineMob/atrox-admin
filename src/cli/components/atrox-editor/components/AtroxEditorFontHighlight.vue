<!--
 * @description 文字高亮提示
 * @author wuy1fffff
 * @date 2020-08-12 17:43
 * @lastEditTime 2020-08-12 17:43
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
          <div class="fill-height">
            <v-btn v-on="{ ...menu, ...tooltip }" small icon>
              <v-icon
                v-text="icon"
                :color="selectedHighlight === '' ? '' : selectedHighlight"
              ></v-icon>
            </v-btn>
          </div>
        </template>
        <template>{{ $t(tooltip) }}</template>
      </v-tooltip>
    </template>
    <div class="d-flex flex-wrap" style="width: 120px;">
      <v-col cols="12" class="pa-0">
        <v-btn
          block
          text
          small
          style="background-color: white;"
          :color="selectedHighlight ? '' : 'primary'"
          @click="toggleFontHighlight('', $event)"
        >
          {{ $t('default') }}
        </v-btn>
      </v-col>
      <v-avatar
        size="24"
        tile
        v-for="_color in highlightColors"
        :key="_color"
        :color="_color"
        @click="toggleFontHighlight(_color, $event)"
      >
        <v-icon v-if="selectedHighlight === _color" size="16" dark>mdi-check</v-icon>
      </v-avatar>
    </div>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { MenuData } from 'tiptap'

@Component({ name: 'AtroxEditorFontHighlight' })
export default class AtroxEditorFontHighlight extends Vue {
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

  get highlightColors(): string[] {
    return this.editor.extensions.options.font_highlight.colors
  }

  get selectedHighlight(): string {
    return this.editorContext.getMarkAttrs('font_highlight').highlightColor
  }

  toggleFontHighlight(color = '', e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (color === this.selectedHighlight) this.editorContext.commands.font_highlight('')
    else this.editorContext.commands.font_highlight(color)
  }
}
</script>
