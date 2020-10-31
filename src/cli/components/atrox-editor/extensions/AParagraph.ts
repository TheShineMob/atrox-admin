/**
 * @description 普通段落
 * @author wuy1fffff
 * @date 2020-08-11 09:22
 * @lastEditTime 2020-08-11 09:22
 */

import { ALIGN_PATTERN } from '../helper/constant'
import { Paragraph as TiptapParagraph } from 'tiptap'
import { NodeSpec, Node as ProsemirrorNode, DOMOutputSpec } from 'prosemirror-model'
import {
  transformCSStoLineHeight,
  transformLineHeightToCSS
} from '../helper/utils/lineHieght'

//  获得属性
function getAttrs(p: string | Node): { [key: string]: any } {
  if (typeof p === 'string') return { p: '' }
  //    强行转换
  const node: HTMLElement = p as HTMLElement
  //    对齐
  const align: string | null =
    node.getAttribute('data-text-align') || node.style.textAlign || ''

  //  缩进
  const dataIndent: string | null = node.getAttribute('data-indent')

  //    行高
  const lineHeight = transformCSStoLineHeight(node.style.lineHeight)

  return {
    textAlign: ALIGN_PATTERN.test(align) ? align : null,
    indent: dataIndent ? parseInt(dataIndent, 10) || 0 : 0,
    lineHeight: lineHeight || null
  }
}

//  转化为Dom
function toDOM(node: ProsemirrorNode): DOMOutputSpec {
  const { textAlign, indent, lineHeight } = node.attrs

  let style = ''
  const attrs: { [key: string]: any } = {}

  //    对齐
  if (textAlign && textAlign !== 'left') {
    style += `text-align: ${textAlign};`
  }

  //    缩进
  if (indent) {
    attrs['data-indent'] = indent
  }

  //    行高
  if (lineHeight) {
    const cssLineHeight = transformLineHeightToCSS(lineHeight)
    style += `line-height: ${cssLineHeight};`
  }

  style && (attrs.style = style)

  return ['p', attrs, 0]
}

//  ProseMirror自定义Node类型
export const ParagraphNodeSpec: NodeSpec = {
  attrs: {
    textAlign: { default: null },
    indent: { default: null },
    lineHeight: { default: null },
    style: { default: '' }
  },
  content: 'inline*',
  group: 'block',
  //  使粘贴之类的生效
  parseDOM: [
    {
      tag: 'p',
      getAttrs
    }
  ],
  toDOM
}

export default class AParagraph extends TiptapParagraph {
  //  描述该节点的schema
  get schema() {
    return ParagraphNodeSpec
  }
}

export const toParagraphDOM = toDOM
export const getParagraphNodeAttrs = getAttrs
