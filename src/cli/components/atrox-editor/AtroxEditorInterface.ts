/**
 * @description 富文本接口声明
 * @author wuy1fffff
 * @date 2020-08-11 09:18
 * @lastEditTime 2020-08-11 09:18
 */
import { VueConstructor } from 'vue'
import { MenuData } from 'tiptap'

interface AtroxEditorAction {
  component: VueConstructor
  componentProps?: { [key: string]: any }
  componentEvents?: { [key: string]: any }
}

type AtroxEditorActionType = AtroxEditorAction | AtroxEditorAction[]

interface AtroxEditorActionRender {
  renderFun(menuData: MenuData): AtroxEditorActionType
}

export { AtroxEditorAction, AtroxEditorActionType, AtroxEditorActionRender }
