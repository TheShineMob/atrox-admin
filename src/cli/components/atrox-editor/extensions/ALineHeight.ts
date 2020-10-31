import { Extension, MenuData } from 'tiptap'
import { createLineHeightCommand } from '../helper/utils/lineHieght'
import AtroxEditorLineHeight from '@/cli/components/atrox-editor/components/AtroxEditorLineHeight.vue'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'

export default class ALineHeight extends Extension implements AtroxEditorActionRender {
  //  commands的名字
  get name() {
    return 'line_height'
  }

  get defaultOptions() {
    return {
      lineHeights: ['100%', '115%', '150%', '200%', '250%', '300%']
    }
  }

  //    按钮方法
  commands() {
    return ({ lineHeight }: { lineHeight: string }) => createLineHeightCommand(lineHeight)
  }

  renderFun(editorContext: MenuData) {
    return {
      component: AtroxEditorLineHeight,
      componentProps: {
        editorContext,
        icon: 'mdi-format-line-spacing',
        tooltip: 'cli.editor.extensions.lineHeight'
      }
    }
  }
}
