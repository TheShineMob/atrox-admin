<!--
 * @description 浮动操作窗口
 * @author wuy1fffff
 * @date 2020-10-21 17:44
 * @lastEditTime 2020-10-21 17:44
-->
<template>
  <editor-menu-bubble v-slot="editorContext" :editor="editor">
    <div
      :class="{
        'atrox-editor__menu-bubble--active':
          editorContext.menu.isActive && bubbleMenuEnable
      }"
      :style="
        `
        left: ${editorContext.menu.left}px;
        bottom: ${editorContext.menu.bottom + 10}px;
      `
      "
      class="atrox-editor__menu-bubble"
    >
      <template v-if="activeMenu === 'link'">
        <v-card outlined elevation="0">
          <atrox-link-menu-bubble
            :editorContext="editorContext"
            @back="linkBack"
          ></atrox-link-menu-bubble>
        </v-card>
      </template>
      <template v-else-if="activeMenu === 'default'">
        <v-card outlined elevation="0">
          <component
            v-for="(spec, i) in generateCommandButtonComponentSpecs(editorContext)"
            :key="'command-button' + i"
            :is="spec.component"
            v-bind="spec.componentProps"
            v-on="spec.componentEvents"
          />
        </v-card>
      </template>
    </div>
  </editor-menu-bubble>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Editor, EditorMenuBubble, MenuData } from 'tiptap'
import { Prop, Inject, Watch } from 'vue-property-decorator'
import { getMarkRange } from 'tiptap-utils'
import { TextSelection, AllSelection, Selection } from 'prosemirror-state'
import { AtroxEditorActionType } from '../AtroxEditorInterface'
import AtroxLinkMenuBubble from './AtroxLinkMenuBubble.vue'

//  菜单类型的枚举类
const enum MenuType {
  NONE = 'none',
  DEFAULT = 'default',
  LINK = 'link'
}

@Component({
  name: 'AtroxMenuBubble',
  components: {
    EditorMenuBubble,
    AtroxLinkMenuBubble
  }
})
export default class AtroxMenuBubble extends Vue {
  @Prop({
    type: Editor,
    required: true
  })
  readonly editor!: Editor

  @Inject() readonly atroxEditor!: any

  //  激活的菜单类型
  activeMenu: MenuType = MenuType.NONE
  //  链接菜单回退到普通菜单
  isLinkBack = false

  //  是否启用menuEnable
  get bubbleMenuEnable(): boolean {
    return this.linkMenuEnable || this.textMenuEnable
  }

  //  链接菜单
  get linkMenuEnable(): boolean {
    const { schema } = this.editor
    return !!schema.marks.link
  }

  //  普通文字菜单
  get textMenuEnable(): boolean {
    const extensionManager = this.editor.extensions
    return extensionManager.extensions.some(extension => {
      return extension.options.bubble
    })
  }

  linkBack() {
    this.setMenuType(MenuType.DEFAULT)
    this.isLinkBack = true
  }

  @Watch('editor.state.selection')
  onSelectionChange(selection: Selection) {
    if (this.$_isLinkSelection(selection)) {
      if (!this.isLinkBack) {
        this.setMenuType(MenuType.LINK)
      }
    } else {
      this.activeMenu = this.$_getCurrentMenuType()
      this.isLinkBack = false
    }
  }

  //  设置菜单的type
  setMenuType(type: MenuType) {
    this.activeMenu = type
  }

  private get isLinkSelection(): boolean {
    const { state } = this.editor
    const { tr } = state
    const { selection } = tr

    return this.$_isLinkSelection(selection)
  }

  $_isLinkSelection(selection: Selection) {
    const { schema } = this.editor
    const linkType = schema.marks.link
    if (!linkType) return false
    if (!selection) return false

    const { $from, $to } = selection
    const range = getMarkRange($from, linkType)
    if (!range) return false

    return range.to === $to.pos
  }

  $_getCurrentMenuType(): MenuType {
    if (this.isLinkSelection) return MenuType.LINK
    if (
      this.editor.state.selection instanceof TextSelection ||
      this.editor.state.selection instanceof AllSelection
    ) {
      return MenuType.DEFAULT
    }
    return MenuType.NONE
  }

  private generateCommandButtonComponentSpecs(
    editorContext: MenuData
  ): AtroxEditorActionType[] {
    const extensionManager = this.editor.extensions
    return extensionManager.extensions.reduce<AtroxEditorActionType[]>(
      (acc, extension) => {
        if (!extension.options.bubble) return acc
        if (typeof extension.renderFun !== 'function') return acc

        const menuBtnComponentSpec = extension.renderFun({
          ...editorContext,
          editor: this.editor
        })
        if (Array.isArray(menuBtnComponentSpec)) {
          return [...acc, ...menuBtnComponentSpec]
        }

        return [...acc, menuBtnComponentSpec]
      },
      []
    )
  }
}
</script>
