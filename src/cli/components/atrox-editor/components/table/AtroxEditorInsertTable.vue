<!--
 * @description 插入表格操作
 * @author wuy1fffff
 * @date 2020-08-18 17:18
 * @lastEditTime 2020-08-18 17:18
-->
<template>
  <v-menu v-model="menuSign" right offset-x nudge-top="2">
    <template #activator="{ on }">
      <v-list-item v-on="on">{{ $t('cli.editor.extensions.insertTable') }}</v-list-item>
    </template>
    <div class="atrox-editor-table-insert">
      <div class="atrox-editor-table-insert__body">
        <div
          v-for="row in tableGridSize.row"
          :key="'r' + row"
          class="atrox-editor-table-insert__row"
        >
          <div
            v-for="col in tableGridSize.col"
            :key="'c' + col"
            :class="{
              'atrox-editor-table-insert__cell--selected':
                col <= selectedTableGridSize.col && row <= selectedTableGridSize.row
            }"
            class="atrox-editor-table-insert__cell"
            @mouseover="selectTableGridSize(row, col)"
            @mousedown="onMouseDown(row, col)"
          >
            <div class="atrox-editor-table-insert__cell__inner" />
          </div>
        </div>
      </div>

      <div class="atrox-editor-table-insert__footer">
        {{ selectedTableGridSize.row }} X {{ selectedTableGridSize.col }}
      </div>
    </div>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Watch } from 'vue-property-decorator'

const INIT_GRID_SIZE = 5
const MAX_GRID_SIZE = 10
const DEFAULT_SELECTED_GRID_SIZE = 2

interface GridSize {
  row: number
  col: number
}

@Component({ name: 'AtroxEditorInsertTable' })
export default class AtroxEditorInsertTable extends Vue {
  menuSign = false

  tableGridSize: GridSize = {
    row: INIT_GRID_SIZE,
    col: INIT_GRID_SIZE
  }

  selectedTableGridSize: GridSize = {
    row: DEFAULT_SELECTED_GRID_SIZE,
    col: DEFAULT_SELECTED_GRID_SIZE
  }

  selectTableGridSize(row: number, col: number): void {
    if (row === this.tableGridSize.row) {
      this.tableGridSize.row = Math.min(row + 1, MAX_GRID_SIZE)
    }

    if (col === this.tableGridSize.col) {
      this.tableGridSize.col = Math.min(col + 1, MAX_GRID_SIZE)
    }

    this.selectedTableGridSize.row = row
    this.selectedTableGridSize.col = col
  }

  @Emit('createTable')
  onMouseDown(row: number, col: number): GridSize {
    this.menuSign = false
    return { row, col }
  }

  @Watch('menuSign')
  signChane(val: boolean) {
    if (val === false) {
      setTimeout(() => {
        this.resetTableGridSize()
      }, 300)
    }
  }

  resetTableGridSize(): void {
    this.tableGridSize = {
      row: INIT_GRID_SIZE,
      col: INIT_GRID_SIZE
    }

    this.selectedTableGridSize = {
      row: DEFAULT_SELECTED_GRID_SIZE,
      col: DEFAULT_SELECTED_GRID_SIZE
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.v-menu__content {
  $name: atrox-editor;

  .#{$name}-table-insert {
    $root: &;

    &__body {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__row {
      display: flex;
    }

    &__cell {
      cursor: pointer;
      background-color: white;
      padding: 5px;

      &__inner {
        border: 1px solid black;
        box-sizing: border-box;
        border-radius: 2px;
        height: 16px;
        padding: 4px;
        width: 16px;
      }
    }

    &__cell--selected {
      .#{$name}-table-insert__cell__inner {
        background-color: white;
        border-color: $color-primary;
      }
    }

    &__footer {
      background: white;
      text-align: center;
    }
  }
}
</style>
