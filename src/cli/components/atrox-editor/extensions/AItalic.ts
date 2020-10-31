import { Italic as TiptapItalic } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'

export default class AItalic extends TiptapItalic implements AtroxEditorActionRender {
  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        command: commands.italic,
        isActive: isActive.italic(),
        icon: 'mdi-format-italic',
        tooltip: 'cli.editor.extensions.italic'
      }
    }
  }
}
