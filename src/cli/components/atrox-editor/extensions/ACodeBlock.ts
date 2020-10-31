import { CodeBlock as TiptapCodeBlock } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class ACodeBlock extends TiptapCodeBlock
  implements AtroxEditorActionRender {
  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        command: commands.code_block,
        isActive: isActive.code_block(),
        icon: 'mdi-code-tags',
        tooltip: 'cli.editor.extensions.codeBlock'
      }
    }
  }
}
