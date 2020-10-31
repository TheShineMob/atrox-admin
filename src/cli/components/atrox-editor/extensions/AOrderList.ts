import { OrderedList as TiptapOrderedList } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'

export default class AOrderedList extends TiptapOrderedList
  implements AtroxEditorActionRender {
  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        isActive: isActive.ordered_list(),
        command: commands.ordered_list,
        icon: 'mdi-format-list-numbered',
        tooltip: 'cli.editor.extensions.orderList'
      }
    }
  }
}
