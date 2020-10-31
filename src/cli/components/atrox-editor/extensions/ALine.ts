import { HorizontalRule as TiptapHorizontalRule } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class HorizontalRule extends TiptapHorizontalRule
  implements AtroxEditorActionRender {
  renderFun({ commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        command: commands.horizontal_rule,
        icon: 'mdi-minus',
        tooltip: 'cli.editor.extensions.line'
      }
    }
  }
}
