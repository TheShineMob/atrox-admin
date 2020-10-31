<!--
 * @description 工具菜单栏
 * @author wuy1fffff
 * @date 2020-08-10 18:17
 * @lastEditTime 2020-08-10 18:17
-->
<template>
  <div>
    <editor-menu-bar v-slot="editorContext" :editor="editor">
      <div class="atrox-editor-toolbar">
        <component
          v-for="(spec, i) in genActionBtnList(editorContext)"
          :key="`atrox-editor-action-${i}`"
          :is="spec.component"
          v-bind="spec.componentProps"
          v-on="spec.componentEvents"
        />
      </div>
    </editor-menu-bar>
    <div class="px-3">
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Editor, EditorMenuBar, MenuData } from 'tiptap'
import { Prop, Inject } from 'vue-property-decorator'
import { AtroxEditorActionType } from './AtroxEditorInterface'

@Component({
  name: 'AtroxEditorToolbar',
  components: {
    EditorMenuBar
  }
})
export default class AtroxEditorToolbar extends Vue {
  @Prop({
    type: Editor,
    required: true
  })
  readonly editor!: Editor //  tiptap实例

  @Inject() readonly atroxEditor!: any

  genActionBtnList(editorContext: MenuData): AtroxEditorActionType[] {
    const extensionManager = this.editor.extensions
    return extensionManager.extensions.reduce<AtroxEditorActionType[]>(
      (res, _extension) => {
        if (typeof _extension.renderFun !== 'function') return res

        const componentSpec = _extension.renderFun({
          ...editorContext,
          editor: this.editor
        })

        if (Array.isArray(componentSpec)) {
          return [...res, ...componentSpec]
        }

        return [...res, componentSpec]
      },
      []
    )
  }
}
</script>
