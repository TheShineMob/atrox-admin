import { Extension, MenuData, CommandGetter } from 'tiptap'
import { CommandFunction } from 'tiptap-commands'
import { AtroxEditorActionRender, AtroxEditorAction } from '../AtroxEditorInterface'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'
import { Alignment, ALIGN_PATTERN } from '../helper/constant'
import { setTextAlign, isTextAlignActive } from '../helper/utils/textAlign'

export default class ATextAlign extends Extension implements AtroxEditorActionRender {
  get name() {
    return 'text_align'
  }

  get defaultOptions() {
    return {
      alignments: [Alignment.left, Alignment.center, Alignment.right, Alignment.justify]
    }
  }

  commands() {
    return this.options.alignments.reduce(
      (commands: CommandGetter, alignment: Alignment) => {
        if (!ALIGN_PATTERN.test(alignment)) return commands

        return {
          ...commands,
          [`align_${alignment}`]: (): CommandFunction => (state, dispatch) => {
            const { selection } = state
            const tr = setTextAlign(
              state.tr.setSelection(selection),
              alignment === 'left' ? null : alignment
            )

            if (tr.docChanged) {
              dispatch && dispatch(tr)
              return true
            } else {
              return false
            }
          }
        }
      },
      {}
    )
  }

  renderFun({ commands, editor }: MenuData) {
    return this.options.alignments.reduce(
      (views: Array<AtroxEditorAction>, alignment: Alignment) => {
        if (!ALIGN_PATTERN.test(alignment)) return views

        const isActive =
          alignment === 'left' ? false : isTextAlignActive(editor.state, alignment)

        return views.concat({
          component: AtroxEditorActionBtn,
          componentProps: {
            isActive,
            command: commands[`align_${alignment}`],
            icon: `mdi-format-align-${alignment}`,
            tooltip: `cli.editor.extensions.${alignment}Align`
          }
        })
      },
      []
    )
  }
}
