<!--
 * @description 表格操作
 * @author wuy1fffff
 * @date 2020-08-18 15:47
 * @lastEditTime 2020-08-18 15:47
-->
<template>
  <v-menu offset-y :nudge-left="28" transition="scroll-y-transition">
    <template #activator="{on:menu}">
      <v-tooltip top>
        <template #activator="{ on:tooltip }">
          <v-btn
            v-on="{ ...menu, ...tooltip }"
            small
            icon
            :class="{
              'v-btn--active': isTableActive
            }"
          >
            <v-icon v-text="icon"></v-icon>
          </v-btn>
        </template>
        <template>{{ $t(tooltip) }}</template>
      </v-tooltip>
    </template>
    <v-list dense>
      <v-list-item-group color="primary">
        <atrox-editor-insert-table @createTable="createTable" />
        <atrox-editor-table-column
          :disabled="!isTableActive"
          :editorContext="editorContext"
        />
        <v-list-item
          :disabled="!isTableActive"
          @click="editorContext.commands.deleteColumn"
        >
          {{ $t('cli.editor.extensions.deleteColumn') }}</v-list-item
        >
        <atrox-editor-table-row
          :disabled="!isTableActive"
          :editorContext="editorContext"
        ></atrox-editor-table-row>
        <v-list-item :disabled="!isTableActive" @click="editorContext.commands.deleteRow">
          {{ $t('cli.editor.extensions.deleteRow') }}</v-list-item
        >
        <v-list-item
          :disabled="!enableMergeCells"
          @click="editorContext.commands.mergeCells"
          >{{ $t('cli.editor.extensions.mergeCells') }}</v-list-item
        >
        <v-list-item
          :disabled="!enableSplitCell"
          @click="editorContext.commands.splitCell"
          >{{ $t('cli.editor.extensions.splitCell') }}</v-list-item
        >
        <v-list-item
          :disabled="!isTableActive"
          @click="editorContext.commands.deleteTable"
        >
          {{ $t('cli.editor.extensions.deleteTable') }}</v-list-item
        >
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { MenuData } from 'tiptap'
import AtroxEditorInsertTable from './AtroxEditorInsertTable.vue'
import AtroxEditorTableColumn from './AtroxEditorTableColumn.vue'
import AtroxEditorTableRow from './AtroxEditorTableRow.vue'
import {
  isTableActive,
  enableMergeCells,
  enableSplitCell
} from '../../helper/utils/table'

@Component({
  name: 'AtroxEditorTable',
  components: {
    AtroxEditorInsertTable,
    AtroxEditorTableColumn,
    AtroxEditorTableRow
  }
})
export default class AtroxEditorTable extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly editorContext!: MenuData //  上下文

  @Prop({
    type: String,
    required: true
  })
  readonly icon!: string //  图标

  @Prop({
    type: String,
    required: true
  })
  readonly tooltip!: string //  提示

  createTable({ row, col }: { row: number; col: number }): void {
    this.editorContext.commands.createTable({
      rowsCount: row,
      colsCount: col,
      withHeaderRow: true
    })
  }

  get editor() {
    return this.editorContext.editor
  }

  get isTableActive() {
    return isTableActive(this.editor.state)
  }

  get enableMergeCells() {
    return enableMergeCells(this.editor.state)
  }

  get enableSplitCell() {
    return enableSplitCell(this.editor.state)
  }
}
</script>
