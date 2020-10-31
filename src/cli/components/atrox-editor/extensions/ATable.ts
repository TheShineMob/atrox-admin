import { Table as TiptapTable } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import AtroxEditorTable from '@/cli/components/atrox-editor/components/table/AtroxEditorTable.vue'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'

export default class ATable extends TiptapTable implements AtroxEditorActionRender {
  renderFun(editorContext: MenuData) {
    return {
      component: AtroxEditorTable,
      componentProps: {
        editorContext,
        icon: 'mdi-table',
        tooltip: 'cli.editor.extensions.table'
      }
    }
  }
}
