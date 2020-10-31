import { Mark as ProsemirrorMark } from 'prosemirror-model'
import { Plugin, TextSelection } from 'prosemirror-state'
import { Link as TiptapLink } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import { getMarkRange } from 'tiptap-utils'
import AtroxEditorLink from '../components/AtroxEditorLink.vue'

function getAttrs(dom: HTMLElement) {
  return {
    href: dom.getAttribute('href'),
    openInNewTab: dom.getAttribute('target') === '_blank'
  }
}

function toDOM(mark: ProsemirrorMark) {
  const { href, openInNewTab } = mark.attrs

  const attrs: any = {}
  attrs.href = href

  let ref = 'nofollow'

  if (openInNewTab) {
    attrs.target = '_blank'
    ref += ' noopener noreferrer'
  }

  attrs.ref = ref.trim()

  return ['a', attrs, 0]
}

export default class Link extends TiptapLink implements AtroxEditorActionRender {
  // @ts-ignore
  get schema() {
    return {
      attrs: {
        href: {
          default: null
        },
        openInNewTab: {
          default: true
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs
        }
      ],
      toDOM
    }
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handleClick(view, pos) {
            const { schema, doc, tr } = view.state

            const range = getMarkRange(doc.resolve(pos), schema.marks.link)

            if (!range) return false

            const $start = doc.resolve(range.from)
            const $end = doc.resolve(range.to)

            const transaction = tr.setSelection(new TextSelection($start, $end))

            view.dispatch(transaction)
            return true
          }
        }
      })
    ]
  }

  renderFun(editorContext: MenuData) {
    return {
      component: AtroxEditorLink,
      componentProps: {
        editorContext,
        tooltip: 'cli.editor.extensions.link',
        icon: 'mdi-link'
      }
    }
  }
}
