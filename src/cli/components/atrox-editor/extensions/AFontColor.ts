import { Mark, MenuData } from 'tiptap'
import { CommandFunction } from 'tiptap-commands'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import applyMark from '../helper/utils/applyMark'
import { COLOR_SET, isHexColor } from '../helper/utils/fontColor'
import { MarkSpec } from 'prosemirror-model'
import AtroxEditorFontColor from '@/cli/components/atrox-editor/components/AtroxEditorFontColor.vue'

export default class ATextColor extends Mark implements AtroxEditorActionRender {
  get name() {
    return 'font_color'
  }

  get defaultOptions() {
    return {
      colors: COLOR_SET
    }
  }

  get schema() {
    const schema: MarkSpec = {
      attrs: {
        color: {
          default: ''
        }
      },
      inline: true,
      group: 'inline',
      parseDOM: [
        {
          style: 'color',
          getAttrs: (color: string | Node) => {
            //  是文字的话
            if (typeof color === 'string') {
              return {
                color
              }
            }
            return {}
          }
        }
      ],
      toDOM(mark: Mark) {
        const { color } = mark.attrs
        let style = ''
        if (color) {
          style += `color: ${color};`
        }
        return ['span', { style }, 0]
      }
    }
    return schema
  }

  commands() {
    return (color: string): CommandFunction => (state, dispatch) => {
      if (color !== undefined) {
        const { schema } = state
        let { tr } = state
        const markType = schema.marks.font_color
        const attrs = color && isHexColor(color) ? { color } : null
        tr = applyMark(state.tr.setSelection(state.selection), markType, attrs)
        if (tr.docChanged || tr.storedMarksSet) {
          dispatch && dispatch(tr)
          return true
        }
      }
      return false
    }
  }

  renderFun(editorContext: MenuData) {
    return {
      component: AtroxEditorFontColor,
      componentProps: {
        editorContext,
        tooltip: 'cli.editor.extensions.fontColor',
        icon: 'mdi-format-text-variant'
      }
    }
  }
}
