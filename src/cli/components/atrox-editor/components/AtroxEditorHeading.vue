<!--
 * @description 选择标题大小
 * @author wuy1fffff
 * @date 2020-08-11 15:32
 * @lastEditTime 2020-08-11 15:32
-->
<template>
  <v-menu
    offset-y
    :nudge-left="80"
    class="atrox-editor-heading"
    transition="scroll-y-transition"
  >
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
      <v-list-item-group color="primary" :value="activeHeading">
        <v-list-item :value="0" @click="handleLevelClick(0)">{{
          $t('default')
        }}</v-list-item>
        <v-list-item
          v-for="_level in level"
          :key="_level"
          :value="_level"
          @click="handleLevelClick(_level, $event)"
        >
          <component :is="`h${_level}`">Heading {{ _level }}</component>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { MenuData } from 'tiptap'
import { getActiveHeading } from '../helper/utils/heading'

@Component({ name: 'AtroxEditorHeading' })
export default class AtroxEditorHeading extends Vue {
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

  level = 6

  get editor() {
    return this.editorContext.editor //  tiptap实例
  }

  handleLevelClick(level: number, e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (level > 0) {
      this.editorContext.commands.heading({ level })
    } else {
      this.editorContext.commands.paragraph()
    }
  }

  get activeHeading(): number {
    return getActiveHeading(this.editor.state) //  获取当前节点的heading值
  }
}
</script>

<style lang="scss" scoped>
::v-deep.v-menu__content {
  h1 {
    font-weight: bold;
    font-size: 32px;
  }

  h2 {
    font-weight: bold;
    font-size: 24px;
  }

  h3 {
    font-weight: bold;
    font-size: 19px;
  }

  h4 {
    font-weight: bold;
    font-size: 16px;
  }

  h5 {
    font-weight: bold;
    font-size: 13px;
  }

  h6 {
    font-weight: bold;
    font-size: 11px;
  }
}
</style>
