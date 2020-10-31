import { Underline as TiptapUnderline } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class AUnderline extends TiptapUnderline
  implements AtroxEditorActionRender {
  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        command: commands.underline,
        isActive: isActive.underline(),
        icon: 'mdi-format-underline',
        tooltip: 'cli.editor.extensions.underline'
      }
    }
  }
}
