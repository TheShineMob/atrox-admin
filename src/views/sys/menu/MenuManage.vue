<!--
 * @description 菜单管理
 * @author wuy1fffff
 * @date 2020-09-23 16:21
 * @lastEditTime 2020-09-23 16:21
-->
<template>
  <a-container>
    <a-crud :options="options" ref="crud">
      <template v-slot:form.table.move>
        <a-form
          :actions="moveFromAction"
          :title="'将' + params.disName + '移动至'"
          :loading="loading"
          @action="handleMoveAction"
        >
          <vxe-table
            show-overflow
            row-key
            :tree-config="{
              line: true
            }"
            row-id="id"
            border="none"
            class="pb-4"
            ref="menuTable"
            :show-header="false"
            :radio-config="{ labelField: 'disName', checkMethod: moveCheckMethods }"
            :data="menuTree"
          >
            <vxe-table-column type="radio" tree-node></vxe-table-column>
          </vxe-table>
        </a-form>
      </template>
    </a-crud>
    <v-dialog v-model="sortDialog" max-width="500px">
      <a-form
        :actions="sortFromAction"
        title="排序"
        :loading="loading"
        @action="handleSortAction"
      >
        <div class="ma-4 sort-table">
          <draggable :list="sortList">
            <div
              v-for="(_child, index) in sortList"
              :key="index"
              class="sort-node"
              draggable="true"
            >
              <div>
                <v-btn style="width: 24px; height: 24px;" small icon>
                  <v-icon>{{ _child.icon }}</v-icon>
                </v-btn>
              </div>
              <div>{{ _child.disName }}</div>
            </div>
          </draggable>
        </div>
      </a-form>
    </v-dialog>
  </a-container>
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue'
import Component from 'vue-class-component'
import { AtroxCrudOptions } from '@/cli/types/AtroxCrudInterface'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { Menu } from './MenuEntity'
import { ColumnDefaultSlotParams } from 'vxe-table'
import { Ref } from 'vue-property-decorator'
import { FATHER_ROUTE } from '@/cli/router/cli/adapter'
import { AtroxFormAction } from '@/cli/components/atrox-form/AtroxFormInterface'
import draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'

@Component({ name: 'MenuManage', components: { draggable } })
export default class MenuManage extends Vue {
  @Ref() crud!: any //  crud实体
  @Ref() menuTable!: any //  移动菜单表格
  params: Menu = {} //  当前操作行
  parent: Menu = {} //  当前操作行父菜单
  parentPath = '' //  当前操作行的父路径
  pathMap: Record<string, { path: string; menu: Menu }> = {} //  路径映射

  menuTree: Menu[] = [] //  完整菜单树
  loading = false //  form加载动画
  uncheckIdList: string[] = []

  sortDialog = false
  sortList: Menu[] = []
  //  移动表单操作
  sortFromAction: AtroxFormAction[] = [
    {
      type: 'save',
      text: '确认排序',
      color: 'primary'
    }
  ]

  //  移动表单操作
  moveFromAction: AtroxFormAction[] = [
    {
      type: 'save',
      text: '确认移动'
    }
  ]

  //  不可选种方法
  moveCheckMethods(params: ColumnDefaultSlotParams) {
    return this.uncheckIdList.indexOf(params.row.id) === -1
  }

  //  处理移动表单操作
  handleMoveAction(action: string) {
    if (action === 'save') {
      this.loading = true
      //  获得选择行
      this.params.parentId = this.menuTable.getRadioRecord().id
      this.$aapi.MenuApi.update(this.params)
        .then(() => {
          this.crud.cancelAndCommit('query')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

  //  处理移动表单操作
  handleSortAction(action: string) {
    if (action === 'save') {
      this.loading = true
      //  获得选择行
      const resMenu: Menu[] = this.sortList.map((_menu, index) => {
        _menu.weight = this.sortList.length - index
        return _menu
      })
      this.$aapi.MenuApi.updateBatch(resMenu)
        .then(() => {
          this.sortDialog = false
          this.crud.cancelAndCommit('query')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

  startSort(sortList?: Menu[]) {
    if (sortList) this.sortList = cloneDeep(sortList)
    else this.sortList = cloneDeep(this.crud.table.getData())
    this.sortDialog = true
  }

  //  设置菜单树以及映射列表
  setTreePath(
    menu: Array<Menu> | undefined, //  路由
    path = '' //  父path
  ): void {
    if (menu && menu.length > 0) {
      menu.forEach(_childMenu => {
        //  改变路径
        const resPath = path + '/' + _childMenu.path
        this.pathMap[_childMenu.id || ''] = {
          path: resPath,
          menu: _childMenu
        }
        //  递归设置子菜单路径
        if (_childMenu.type === FATHER_ROUTE) {
          this.setTreePath(_childMenu.children, resPath)
        }
      })
    }
  }

  get options(): AtroxCrudOptions {
    return {
      insert: (item: Menu) => {
        item.parentId = this.parent.id || '0'
        return this.$aapi.MenuApi.insert(item)
      },
      edit: this.$aapi.MenuApi.update,
      delete: this.$aapi.MenuApi.delete,
      table: {
        columns: [
          {
            type: 'checkbox',
            width: 40
          },
          {
            field: 'disName',
            title: '名称',
            slots: {
              default: (params: ColumnDefaultSlotParams, h: CreateElement) => {
                return [
                  h(
                    'div',
                    {
                      class: 'd-flex'
                    },
                    [
                      h(
                        'v-icon',
                        {
                          attrs: {
                            size: '18'
                          }
                        },
                        params.row.icon
                      ),
                      h('div', { class: 'px-1' }, params.row.disName)
                    ]
                  )
                ]
              }
            },
            treeNode: true
          }
        ],
        treeConfig: {
          trigger: 'cell'
        },
        pagerConfig: false,
        proxyConfig: {
          autoLoad: true,
          message: false,
          ajax: {
            query: () => {
              return new Promise(resolve => {
                this.$aapi.MenuApi.list().then((r: DataResponse) => {
                  this.pathMap = {
                    '0': {
                      path: '',
                      menu: { id: '0', disName: '顶级' }
                    }
                  }
                  this.setTreePath(r.data)
                  this.menuTree = r.data
                  setTimeout(() => {
                    this.crud.table.setAllTreeExpand(true)
                  }, 10)
                  resolve(r.data)
                })
              })
            }
          }
        }
      },
      actionConfig: {
        width: '431'
      },
      action: [
        {
          type: 'move',
          text: '移动至',
          handler: (params: ColumnDefaultSlotParams) => {
            this.params = params.row
            this.uncheckIdList = [params.row.parentId]
            this.$autil.xe.eachTree([params.row], _menu => {
              this.uncheckIdList.push(_menu.id)
            })
            this.$nextTick(() => {
              this.menuTable.setAllTreeExpand(true)
            })
            return true
          }
        },
        {
          type: 'edit',
          handler: (params: ColumnDefaultSlotParams) => {
            this.parent = this.pathMap[params.row.parentId].menu
            this.parentPath = this.pathMap[params.row.parentId].path + '/'
            return this.crud.handleEditClick(params)
          }
        },
        {
          type: 'delete'
        },
        {
          type: 'sort',
          text: '排序子级',
          width: 500,
          hiddeOn: (params: ColumnDefaultSlotParams) => params.row.children.length === 0,
          handler: (params: ColumnDefaultSlotParams) => {
            this.startSort(params.row.children)
            return false
          }
        },
        {
          type: 'insert',
          text: '新增子级',
          width: 500,
          hiddeOn: (params: ColumnDefaultSlotParams) => params.row.type !== FATHER_ROUTE,
          handler: (params: ColumnDefaultSlotParams) => {
            this.parent = params.row
            this.parentPath = this.pathMap[params.row.id].path + '/'
            return this.crud.handleInsertClick()
          }
        }
      ],
      toolBar: [
        {
          type: 'insert',
          handler: () => {
            this.parentPath = this.pathMap['0'].path
            this.parent = {}
            return this.crud.handleInsertClick()
          }
        },
        {
          type: 'toolbar.delete'
        },
        {
          type: 'expand',
          text: '展开所有',
          icon: 'mdi-file-tree',
          handler: () => {
            this.crud.table.setAllTreeExpand(true)
            return false
          }
        },
        {
          type: 'collspan',
          text: '收起所有',
          icon: 'mdi-file-tree',
          handler: () => {
            this.crud.table.setAllTreeExpand(false)
            return false
          }
        },
        {
          type: 'sortTop',
          text: '排序',
          icon: 'mdi-sort',
          handler: () => {
            this.startSort()
            return false
          }
        }
      ],
      editForm: {
        fields: [
          {
            field: '',
            title: '父级',
            disabled: true,
            hiddenOn: () => this.parent.id === undefined || this.parent.id === '0',
            props: {
              prefix: this.parent.disName
            }
          },
          {
            field: 'type',
            title: '类型',
            type: 'select',
            value: 1,
            required: true,
            props: {
              items: [
                {
                  text: '组件路由',
                  value: 1
                },
                {
                  text: 'Iframe',
                  value: 2
                },
                {
                  text: '外链路由',
                  value: 3
                },
                {
                  text: '父路由',
                  value: 4
                }
              ]
            }
          },
          {
            field: 'disName',
            title: '显示名称',
            required: true,
            tips: '显示在菜单上的名称'
          },
          {
            field: 'name',
            title: '唯一名称',
            required: true,
            tips: '若是组件请与组件名保持一致'
          },
          {
            field: 'path',
            required: true,
            title: '路径',
            props: {
              prefix: this.parentPath
            }
          },
          {
            field: 'icon',
            required: true,
            title: '图标',
            type: 'icon'
          },
          {
            field: 'component',
            required: true,
            title: '组件路径',
            tips: '从views下一层开始，带.vue后缀',
            hiddenOn: (form: Menu) => {
              return form.type === undefined || form.type !== 1
            }
          },
          {
            field: 'url',
            required: true,
            title: '链接',
            tips: '仅外链与Iframe',
            hiddenOn: (form: Menu) => {
              return form.type === undefined || (form.type !== 2 && form.type !== 3)
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-table {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  border-left: thin solid rgba(0, 0, 0, 0.12);
  border-right: thin solid rgba(0, 0, 0, 0.12);
}

.sort-node {
  height: 36px;
  display: flex;
  border-top: thin solid rgba(0, 0, 0, 0.12);
  cursor: move;

  & div {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
  }

  & div:not(:last-child) {
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }
}
</style>
