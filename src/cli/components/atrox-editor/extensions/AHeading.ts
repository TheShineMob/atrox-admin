import {
  NodeSpec,
  Node as ProsemirrorNode,
  DOMOutputSpec,
  DOMOutputSpecArray
} from 'prosemirror-model'
import { Heading as TiptapHeading } from 'tiptap-extensions'
import { MenuData } from 'tiptap'

import AtroxEditorHeading from '../components/AtroxEditorHeading.vue'
import { ParagraphNodeSpec, getParagraphNodeAttrs, toParagraphDOM } from './AParagraph'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'

function getAttrs(dom: string | Node) {
  const attrs = getParagraphNodeAttrs(dom)
  if (typeof dom !== 'string') {
    const matchRes = dom.nodeName.match(/[H|h](\d)/)
    if (matchRes) attrs.level = Number(matchRes[1])
  }

  return attrs
}

function toDOM(node: ProsemirrorNode): DOMOutputSpec {
  const dom = toParagraphDOM(node) as DOMOutputSpecArray
  const level = node.attrs.level || 1
  dom[0] = `h${level}`
  return dom
}

export default class AHeading extends TiptapHeading implements AtroxEditorActionRender {
  get schema(): NodeSpec {
    return {
      ...ParagraphNodeSpec,
      attrs: {
        ...ParagraphNodeSpec.attrs,
        level: {
          default: 1
        }
      },
      defining: true,
      draggable: false,
      parseDOM: this.options.levels.map((level: number) => ({
        tag: `h${level}`,
        getAttrs
      })),
      toDOM
    }
  }

  renderFun(editorContext: MenuData) {
    return {
      component: AtroxEditorHeading,
      componentProps: {
        editorContext,
        icon: 'mdi-format-header-1',
        tooltip: 'cli.editor.extensions.heading'
      }
    }
  }
}
