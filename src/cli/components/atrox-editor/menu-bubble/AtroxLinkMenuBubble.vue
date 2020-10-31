<!--
 * @description 超链接菜单
 * @author wuy1fffff
 * @date 2020-10-22 14:13
 * @lastEditTime 2020-10-22 14:13
-->
<template>
  <div class="d-flex">
    <atrox-editor-action-btn
      icon="mdi-chevron-left-box-outline"
      tooltip="cli.editor.extensions.editText"
      :command="editText"
    ></atrox-editor-action-btn>
    <atrox-editor-action-btn
      icon="mdi-open-in-new"
      tooltip="cli.editor.extensions.openLink"
      :command="openLink"
    ></atrox-editor-action-btn>
    <atrox-editor-link
      :editorContext="editorContext"
      icon="mdi-pencil-box-outline"
      tooltip="action.edit"
    ></atrox-editor-link>
    <atrox-editor-action-btn
      icon="mdi-link-off"
      tooltip="action.delete"
      :command="removeLink"
    ></atrox-editor-action-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AtroxEditorActionBtn from '../components/AtroxEditorActionBtn.vue'
import AtroxEditorLink from '../components/AtroxEditorLink.vue'
import { Prop } from 'vue-property-decorator'
import { MenuData } from 'tiptap'

@Component({
  name: 'AtroxLinkMenuBubble',
  components: { AtroxEditorActionBtn, AtroxEditorLink }
})
export default class AtroxLinkMenuBubble extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly editorContext!: MenuData

  //  编辑文字
  editText() {
    this.$emit('back')
  }

  //  打开链接
  openLink() {
    this.$autil.dom.open(this.editorContext.getMarkAttrs('link').href)
  }

  //  移除链接
  removeLink() {
    this.editorContext.commands.link({ href: '', openInNewTab: undefined })
  }
}
</script>

<style lang="scss" scoped></style>
