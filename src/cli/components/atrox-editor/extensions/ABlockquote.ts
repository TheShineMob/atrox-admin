/**
 * @description 引用
 * @author wuy1fffff
 * @date 2020-08-11 09:19
 * @lastEditTime 2020-08-11 09:19
 */
import {
  NodeSpec,
  Node as ProsemirrorNode,
  DOMOutputSpec,
  DOMOutputSpecArray
} from 'prosemirror-model'
import { Blockquote as TiptapBlockquote } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { ParagraphNodeSpec, getParagraphNodeAttrs, toParagraphDOM } from './AParagraph'
import AtroxEditorActionBtn from '@/cli/components/atrox-editor/components/AtroxEditorActionBtn.vue'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'

function getAttrs(dom: string | Node) {
  return getParagraphNodeAttrs(dom)
}

function toDOM(node: ProsemirrorNode): DOMOutputSpec {
  //  由段落转换为blockquote
  const dom: DOMOutputSpecArray = toParagraphDOM(node) as DOMOutputSpecArray
  dom[0] = 'blockquote' //   将标签p转换为blockquote
  return dom
}

const BlockquoteNodeSpec: NodeSpec = {
  ...ParagraphNodeSpec,
  attrs: {
    textAlign: { default: null },
    indent: { default: null }
  },
  content: 'block*',
  defining: true,
  parseDOM: [
    {
      tag: 'blockquote',
      getAttrs
    }
  ],
  toDOM
}

export default class ABlockquote extends TiptapBlockquote
  implements AtroxEditorActionRender {
  get schema() {
    return BlockquoteNodeSpec
  }

  renderFun({ isActive, commands }: MenuData) {
    return {
      component: AtroxEditorActionBtn,
      componentProps: {
        command: commands.blockquote,
        isActive: isActive.blockquote(),
        icon: 'mdi-format-quote-close',
        tooltip: 'cli.editor.extensions.blockquote'
      }
    }
  }
}
