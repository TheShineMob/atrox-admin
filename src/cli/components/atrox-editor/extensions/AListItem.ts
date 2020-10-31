import { NodeSpec, Node as ProsemirrorNode, DOMOutputSpec } from 'prosemirror-model'
import { ListItem as TiptapListItem } from 'tiptap-extensions'
import { Node } from 'tiptap'
import { transformLineHeightToCSS } from '../helper/utils/lineHieght'
import { LINE_HEIGHT_100 } from '../helper/constant'

function getAttrs(p: string | Node) {
  if (typeof p === 'string') return { p: '' }
  //    强行转换
  const node: HTMLElement = p as HTMLElement

  //    对齐
  const align: string | null =
    node.getAttribute('data-text-align') || node.style.textAlign || ''

  //  行高
  const lineHeight =
    node.style.lineHeight &&
    node.style.lineHeight !== transformLineHeightToCSS(LINE_HEIGHT_100)
      ? node.style.lineHeight
      : null

  return {
    textAlign: align,
    lineHeight
  }
}

function toDOM(node: ProsemirrorNode): DOMOutputSpec {
  const { textAlign, lineHeight } = node.attrs

  let style = ''
  const attrs: { [key: string]: any } = {}

  if (textAlign && textAlign !== 'left') {
    style += `text-align: ${textAlign}`
  }

  if (lineHeight) {
    const cssLineHeight = transformLineHeightToCSS(lineHeight)
    style += `line-height: ${cssLineHeight};`
  }

  style && (attrs.style = style)

  return ['li', attrs, 0]
}

const ListItemNodeSpec: NodeSpec = {
  attrs: {
    textAlign: { default: null },
    lineHeight: { default: null }
  },
  content: 'paragraph block*',
  defining: true,
  draggable: false,
  parseDOM: [
    {
      tag: 'li',
      getAttrs
    }
  ],
  toDOM
}

export default class AListItem extends TiptapListItem {
  get schema() {
    return ListItemNodeSpec
  }
}
