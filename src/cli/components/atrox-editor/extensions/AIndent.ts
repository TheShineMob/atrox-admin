import { Extension, MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import { createIndentCommand, IndentProps } from '../helper/utils/indent'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'

export default class AIndent extends Extension implements AtroxEditorActionRender {
  get name() {
    return 'indent'
  }

  get defaultOptions() {
    return {
      minIndent: IndentProps.min,
      maxIndent: IndentProps.max
    }
  }

  commands() {
    return {
      indent: () => createIndentCommand(IndentProps.more),
      outdent: () => createIndentCommand(IndentProps.less)
    }
  }

  keys() {
    return {
      Tab: createIndentCommand(IndentProps.more),
      'Shift-Tab': createIndentCommand(IndentProps.less)
    }
  }

  renderFun({ commands }: MenuData) {
    return [
      {
        component: AtroxEditorActionBtn,
        componentProps: {
          command: commands.indent,
          icon: 'mdi-format-indent-increase',
          tooltip: 'cli.editor.extensions.indent'
        }
      },
      {
        component: AtroxEditorActionBtn,
        componentProps: {
          command: commands.outdent,
          icon: 'mdi-format-indent-decrease',
          tooltip: 'cli.editor.extensions.outdent'
        }
      }
    ]
  }
}
