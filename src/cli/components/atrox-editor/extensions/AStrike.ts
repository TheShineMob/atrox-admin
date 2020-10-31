import { Strike as TiptapStrike } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class AStrike extends TiptapStrike implements AtroxEditorActionRender {
  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        command: commands.strike,
        isActive: isActive.strike(),
        icon: 'mdi-format-strikethrough',
        tooltip: 'cli.editor.extensions.strike'
      }
    }
  }
}
