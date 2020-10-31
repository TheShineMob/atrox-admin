import { BulletList as TiptapBulletList } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class ABulletList extends TiptapBulletList
  implements AtroxEditorActionRender {
  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        isActive: isActive.bullet_list(),
        command: commands.bullet_list,
        icon: 'mdi-format-list-bulleted',
        tooltip: 'cli.editor.extensions.bulletList'
      }
    }
  }
}
