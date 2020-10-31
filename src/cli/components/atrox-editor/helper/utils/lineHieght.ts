/**
 * @description 有关行高工具函数
 * @author wuy1fffff
 * @date 2020-08-11 09:37
 * @lastEditTime 2020-08-11 09:37
 */
import { TextSelection, AllSelection, EditorState, Transaction } from 'prosemirror-state'
import { Node as ProsemirrorNode, NodeType } from 'prosemirror-model'
import { CommandFunction } from 'tiptap-commands'
import { LINE_HEIGHT_100, DEFAULT_LINE_HEIGHT } from '../constant'

export const ALLOWED_NODE_TYPES = ['paragraph', 'heading', 'list_item', 'todo_item']

const NUMBER_VALUE_PATTERN = /^\d+(.\d+)?$/

export function getActiveLineHeight(state: EditorState): string {
  const { selection, doc } = state
  const { from, to } = selection

  let keepLooking = true
  let resLineHeight: string = DEFAULT_LINE_HEIGHT

  doc.nodesBetween(from, to, node => {
    const nodeType = node.type
    const lineHeightValue = node.attrs.lineHeight

    if (ALLOWED_NODE_TYPES.includes(nodeType.name)) {
      if (keepLooking && lineHeightValue && lineHeightValue !== DEFAULT_LINE_HEIGHT) {
        keepLooking = false
        resLineHeight = lineHeightValue

        return false
      }
      return nodeType.name !== 'list_item' && nodeType.name !== 'todo_item'
    }
    return keepLooking
  })

  return resLineHeight
}

export function transformLineHeightToCSS(value: string | number): string {
  if (!value) return ''

  let strValue = String(value)

  if (NUMBER_VALUE_PATTERN.test(strValue)) {
    const numValue = parseFloat(strValue)
    strValue = String(Math.round(numValue * 100)) + '%'
  }

  let safeValue: number = parseFloat(strValue)
  if (safeValue < 100) safeValue = 100
  return safeValue * LINE_HEIGHT_100 + '%'
}

// 把css中的行高值转换为行高值
export function transformCSStoLineHeight(value: string): string {
  if (!value) return ''
  if (value === DEFAULT_LINE_HEIGHT) return ''

  let strValue = value

  if (NUMBER_VALUE_PATTERN.test(value)) {
    const numValue = parseFloat(value)
    strValue = String(Math.round(numValue * 100)) + '%'
    if (strValue === DEFAULT_LINE_HEIGHT) return ''
  }

  return parseFloat(strValue) / LINE_HEIGHT_100 + '%'
}

interface SetLineHeightTask {
  node: ProsemirrorNode
  nodeType: NodeType
  pos: number
}

export function setTextLineHeight(
  tr: Transaction,
  lineHeight: string | null
): Transaction {
  const { selection, doc } = tr

  if (!selection || !doc) return tr

  if (!(selection instanceof TextSelection || selection instanceof AllSelection)) {
    return tr
  }

  const { from, to } = selection

  const tasks: Array<SetLineHeightTask> = []
  const lineHeightValue =
    lineHeight && lineHeight !== DEFAULT_LINE_HEIGHT ? lineHeight : null

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type
    if (ALLOWED_NODE_TYPES.includes(nodeType.name)) {
      const lineHeight = node.attrs.lineHeight || null
      if (lineHeight !== lineHeightValue) {
        tasks.push({
          node,
          pos,
          nodeType
        })
      }
      return nodeType.name !== 'list_item' && nodeType.name !== 'todo_item'
    }
    return true
  })

  if (!tasks.length) return tr

  tasks.forEach(task => {
    const { node, pos, nodeType } = task
    let { attrs } = node

    attrs = {
      ...attrs,
      lineHeight: lineHeightValue
    }

    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks)
  })

  return tr
}

export function createLineHeightCommand(lineHeight: string): CommandFunction {
  return (state, dispatch) => {
    const { selection } = state
    let { tr } = state
    tr = tr.setSelection(selection)

    tr = setTextLineHeight(tr, lineHeight)

    if (tr.docChanged) {
      dispatch && dispatch(tr)
      return true
    }

    return false
  }
}
