declare module 'tiptap-commands' {
  import { EditorView } from 'prosemirror-view'
  import { EditorState, Transaction } from 'prosemirror-state'

  interface DispatchFunction {
    (tr: Transaction): boolean
  }

  interface CommandFunction {
    (
      state: EditorState,
      dispatch: DispatchFunction | undefined,
      view: EditorView
    ): boolean
  }

  interface Command {
    (...params: any[]): CommandFunction
  }
}

declare module 'tiptap' {
  import {
    Schema,
    Node as ProsemirrorNode,
    NodeSpec,
    NodeType,
    MarkSpec,
    MarkType,
    ParseOptions
  } from 'prosemirror-model'
  import { Plugin, EditorState, Transaction } from 'prosemirror-state'
  import { EditorView, EditorProps } from 'prosemirror-view'
  import { VueConstructor } from 'vue'
  import { Command, CommandFunction } from 'tiptap-commands'

  const EditorContent: VueConstructor
  const EditorMenuBar: VueConstructor
  const EditorMenuBubble: VueConstructor

  interface NodeView {
    node?: ProsemirrorNode
    updateAttrs?: (attrs: { [key: string]: any }) => any
    view?: EditorView
    options?: { [key: string]: any }
    selected?: boolean
  }

  type CommandGetter =
    | { [key: string]: (() => Command) | Command }
    | (() => Command)
    | Command
    | (() => Command)[]

  class Extension<Options = any> {
    constructor(options?: Options)
    name?: string
    defaultOptions?: Options
    options?: Options
    update?: (view: EditorView) => any
    plugins?: Plugin[]
    commands?({
      schema,
      attrs
    }: {
      schema: Schema | NodeSpec | MarkSpec
      attrs?: { [key: string]: string }
    }): CommandGetter
    inputRules?({ schema }: { schema: Schema }): any[]
    parseRules?({ schema }: { schema: Schema }): Plugin[]
    keys?({
      schema
    }: {
      schema: Schema | NodeSpec | MarkSpec
    }): { [keyCombo: string]: CommandFunction }
    [key: string]: any
  }

  class Node<V extends NodeView = any> extends Extension {
    schema?: NodeSpec
    view?: { new (): V }
    commands?({
      type,
      schema,
      attrs
    }: {
      type: NodeType
      schema: NodeSpec
      attrs?: { [key: string]: string }
    }): CommandGetter
    inputRules?({ type, schema }: { type: NodeType; schema: Schema }): any[]
    parseRules?({ type, schema }: { type: NodeType; schema: Schema }): Plugin[]
    keys?({
      type,
      schema
    }: {
      type: NodeType
      schema: NodeSpec
    }): { [keyCombo: string]: CommandFunction }
  }

  class Mark<V extends NodeView = any> extends Extension {
    schema?: MarkSpec
    view?: { new (): V }
    commands?({
      type,
      schema,
      attrs
    }: {
      type: MarkType
      schema: MarkSpec
      attrs?: { [key: string]: string }
    }): CommandGetter
    inputRules?({ type, schema }: { type: MarkType; schema: Schema }): any[]
    parseRules?({ type, schema }: { type: MarkType; schema: Schema }): Plugin[]
    keys?({
      type,
      schema
    }: {
      type: MarkType
      schema: MarkSpec
    }): { [keyCombo: string]: CommandFunction }
  }

  class Doc extends Node {}
  class Paragraph extends Node {}
  class Text extends Node {}

  interface EditorCommandSet {
    [key: string]: Command
  }

  interface IsActiveChecker {
    [name: string]: () => boolean
  }

  interface MenuData {
    focused: boolean
    focus: () => void
    commands: EditorCommandSet
    isActive: IsActiveChecker
    getMarkAttrs: (markName: string) => { [attributeName: string]: any }
    editor: Editor
    [key: string]: any
  }

  interface EditorUpdateEvent {
    state: EditorState
    getHTML: () => string
    getJSON: () => object
    transaction: Transaction
  }

  interface EditorOptions {
    editorProps?: EditorProps
    editable?: boolean
    autoFocus?: boolean
    extensions?: (Extension | Node | Mark)[]
    content?: Record<string, any> | string
    emptyDocument?: {
      type: 'doc'
      content: [
        {
          type: 'paragraph'
        }
      ]
    }
    useBuiltInExtensions?: boolean
    disableInputRules?: boolean
    disablePasteRules?: boolean
    dropCursor?: {}
    parseOptions?: ParseOptions
    injectCSS?: boolean
    onInit?: ({ view, state }: { view: EditorView; state: EditorState }) => void
    onTransaction?: (event: EditorUpdateEvent) => void
    onUpdate?: (event: EditorUpdateEvent) => void
    onFocus?: ({
      event,
      state,
      view
    }: {
      event: FocusEvent
      state: EditorState
      view: EditorView
    }) => void
    onBlur?: ({
      event,
      state,
      view
    }: {
      event: FocusEvent
      state: EditorState
      view: EditorView
    }) => void
    onPaste?: (...args: any[]) => void
    onDrop?: (...args: any[]) => void
  }

  class ExtensionManager {
    constructor(extensions: Extension[], editor: Editor)
    extensions: Extension[]
    nodes: Node[]
    marks: Mark[]
    options: { [extensionName: string]: any }
    plugins: Plugin[]
    keymaps({ schema }: { schema: Schema }): any[]
    inputRules({
      schema,
      excludedExtensions
    }: {
      schema: Schema
      excludedExtensions: Extension[]
    }): any[]
    parstRules({
      schema,
      excludedExtensions
    }: {
      schema: Schema
      excludedExtensions: Extension[]
    }): any[]
    commands({ schema, view }: { schema: Schema; view: EditorView }): any
  }

  class Editor {
    commands: { [key: string]: Command }
    defaultOptions: { [key: string]: any }
    element: Element
    extensions: ExtensionManager
    inputRules: any[]
    keymaps: any[]
    marks: Mark[]
    nodes: Node[]
    pasteRules: any[]
    plugins: Plugin[]
    schema: Schema
    state: EditorState
    selection: {
      from: number
      to: number
    }
    view: EditorView
    activeMarks: { [markName: string]: () => boolean }
    activeNodes: { [nodeName: string]: () => boolean }
    activeMarkAttrs: { [markName: string]: { [attr: string]: any } }

    constructor(options?: EditorOptions)
    setContent(content?: string | object, emitUpdate?: boolean): void
    clearContent(emitUpdate?: boolean): void
    setOptions(options: EditorOptions): void
    registerPlugin(plugin: Plugin): void
    getJSON(): {}
    getHTML(): string
    focus(): void
    blur(): void
    destroy(): void
    on(event: string, callbackFn: (params: any) => void): void
    off(event: string, callbackFn: (params: any) => void): void
    getMarkAttrs(markName: string): { [attr: string]: any }
  }
}

declare module 'tiptap-extensions' {
  import { Extension, Node, Mark } from 'tiptap'

  // mark
  class Bold extends Mark {}
  class Underline extends Mark {}
  class Italic extends Mark {}
  class Strike extends Mark {}
  class Link extends Mark {}
  class Code extends Mark {}

  // node
  class Heading extends Node {
    constructor(options?: { levels?: number[] })
  }
  class Image extends Node {}
  class Blockquote extends Node {}
  class CodeBlock extends Node {}
  class ListItem extends Node {}
  class BulletList extends Node {}
  class OrderedList extends Node {}
  // class TodoItem extends Node {}
  class TodoList extends Node {}
  class HardBreak extends Node {}
  class Table extends Node {}
  class TableHeader extends Node {}
  class TableCell extends Node {}
  class TableRow extends Node {}

  // extension
  class TrailingNode extends Extension {
    constructor(options?: { node: string; noAfter: string[] })
  }
  class Placeholder extends Extension {
    constructor(options?: {
      emptyEditorClass?: string
      emptyNodeClass?: string
      emptyNodeText?: string
      showOnlyWhenEditable?: boolean
      showOnlyCurrent?: boolean
    })
  }
  class History extends Extension {}
  class HorizontalRule extends Extension {}

  export {
    Bold,
    Italic,
    Underline,
    Strike,
    Link,
    Code,
    Heading,
    Image,
    Blockquote,
    CodeBlock,
    ListItem,
    BulletList,
    OrderedList,
    TodoList,
    HardBreak,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TrailingNode,
    Placeholder,
    History,
    HorizontalRule
  }
}

declare module 'tiptap-utils' {
  import { EditorState } from 'prosemirror-state'
  import { ResolvedPos, MarkType, Schema } from 'prosemirror-model'

  export function getMarkAttrs(state: EditorState, mark: any): { [attr: string]: any }

  export function getMarkRange(
    pos: ResolvedPos<any>,
    link: MarkType<Schema<any, any>>
  ): any
}
