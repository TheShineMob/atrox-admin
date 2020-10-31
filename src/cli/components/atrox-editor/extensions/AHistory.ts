import { History as TiptapHistory } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class AHistory extends TiptapHistory implements AtroxEditorActionRender {
  renderFun({ commands }: MenuData) {
    return [
      {
        component: AtroxEditorActionBtn,
        componentProps: {
          command: commands.undo,
          icon: 'mdi-undo-variant',
          tooltip: 'cli.editor.extensions.undo'
        }
      },
      {
        component: AtroxEditorActionBtn,
        componentProps: {
          command: commands.redo,
          icon: 'mdi-redo-variant',
          tooltip: 'cli.editor.extensions.redo'
        }
      }
    ]
  }
}
