/**
 * @description 划分
 * @author wuy1fffff
 * @date 2020-08-11 09:19
 * @lastEditTime 2020-08-11 09:19
 */
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionDivider from '@/cli/components/atrox-editor/components/AtroxEditorActionDivider.vue'
import { Extension } from 'tiptap'

export default class ADivider extends Extension implements AtroxEditorActionRender {
  get name() {
    return 'divider'
  }

  renderFun() {
    return {
      component: AtroxEditorActionDivider
    }
  }
}
