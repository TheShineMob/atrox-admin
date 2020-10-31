import { Mark, MenuData } from 'tiptap'
import { CommandFunction } from 'tiptap-commands'
import AtroxEditorFontHighlight from '@/cli/components/atrox-editor/components/AtroxEditorFontHighlight.vue'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import { COLOR_SET, isHexColor } from '../helper/utils/fontColor'
import { MarkSpec } from 'prosemirror-model'
import applyMark from '../helper/utils/applyMark'

export default class AFontHighlight extends Mark implements AtroxEditorActionRender {
  get name() {
    return 'font_highlight'
  }

  get defaultOptions() {
    return {
      colors: COLOR_SET
    }
  }

  get schema() {
    const schema: MarkSpec = {
      attrs: {
        highlightColor: {
          default: ''
        }
      },
      inline: true,
      group: 'inline',
      parseDOM: [
        {
          tag: 'span[style*=background-color]',
          getAttrs: (p: string | Node) => {
            if (typeof p === 'string') return { p: '' }
            //    强行转换
            const node: HTMLElement = p as HTMLElement
            const { backgroundColor } = node.style

            return {
              highlightColor: backgroundColor
            }
          }
        }
      ],
      toDOM(node: Mark) {
        const { highlightColor } = node.attrs
        let style = ''
        if (highlightColor) {
          style += `background-color: ${highlightColor};`
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
        const markType = schema.marks.font_highlight
        const attrs = color && isHexColor(color) ? { highlightColor: color } : null
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
      component: AtroxEditorFontHighlight,
      componentProps: {
        editorContext,
        tooltip: 'cli.editor.extensions.fontHighlight',
        icon: 'mdi-alpha-a-box'
      }
    }
  }
}
