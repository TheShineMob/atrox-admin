import { findParentNodeOfType } from 'prosemirror-utils'
import { EditorState } from 'prosemirror-state'

function findHeading(state: EditorState) {
  const { heading } = state.schema.nodes
  return findParentNodeOfType(heading)(state.selection)
}

export function getActiveHeading(state: EditorState): number {
  const result = findHeading(state)

  if (result && result.node && result.node.attrs && result.node.attrs.level)
    return result.node.attrs.level
  else return 0
}
