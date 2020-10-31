import { Mark, MenuData } from 'tiptap'
import { CommandFunction } from 'tiptap-commands'
import { MarkType, MarkSpec } from 'prosemirror-model'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import { DEFAULT_FONT_SIZES, setFontSize, convertToPX } from '../helper/utils/fontSize'
import AtroxEditorFontSize from '../components/AtroxEditorFontSize.vue'

export default class AFontSize extends Mark implements AtroxEditorActionRender {
  get name() {
    return 'font_size'
  }

  get defaultOptions() {
    return {
      fontSizes: DEFAULT_FONT_SIZES
    }
  }

  get schema() {
    const schema: MarkSpec = {
      attrs: {
        px: {
          default: DEFAULT_FONT_SIZES
        }
      },
      group: 'inline',
      parseDOM: [
        {
          style: 'font-size',
          getAttrs: (fontSize: string | Node) => {
            //  是文字的话
            if (typeof fontSize === 'string') {
              const attrs = {}
              if (!fontSize) return attrs
              const px = convertToPX(fontSize)
              if (!px) return attrs

              return {
                px
              }
            }
            return {}
          }
        }
      ],
      toDOM(mark: Mark) {
        const { px } = mark.attrs
        const attrs: { [attr: string]: string } = {}

        if (px) {
          attrs.style = `font-size: ${px}px`
        }
        return ['span', attrs, 0]
      }
    }
    return schema
  }

  commands({ type }: any) {
    return (fontSize: string): CommandFunction => (state, dispatch) => {
      let { tr } = state
      tr = setFontSize(state.tr.setSelection(state.selection), type as MarkType, fontSize)
      if (tr.docChanged || tr.storedMarksSet) {
        dispatch && dispatch(tr)
        return true
      }
      return false
    }
  }

  renderFun(editorContext: MenuData) {
    return {
      component: AtroxEditorFontSize,
      componentProps: {
        editorContext,
        tooltip: 'cli.editor.extensions.fontSize'
      }
    }
  }
}
