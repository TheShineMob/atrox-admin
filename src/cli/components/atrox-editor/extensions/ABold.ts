/**
 * @description 字体加粗
 * @author wuy1fffff
 * @date 2020-08-11 09:19
 * @lastEditTime 2020-08-11 09:19
 */
import { Bold as TiptapBold } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class ABold extends TiptapBold implements AtroxEditorActionRender {
  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        command: commands.bold,
        isActive: isActive.bold(),
        icon: 'mdi-format-bold',
        tooltip: 'cli.editor.extensions.bold'
      }
    }
  }
}
