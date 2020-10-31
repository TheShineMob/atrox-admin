<!--
 * @description 角色
 * @author wuy1fffff
 * @date 2020-09-22 16:49
 * @lastEditTime 2020-09-22 16:49
-->
<template>
  <a-container v-aloading="treeLoading">
    <a-crud :options="options" :loading="loading" ref="crud">
      <template v-slot:form.table.resource>
        <a-form
          :actions="treeFromAction"
          :title="params.name + '的资源'"
          :loading="loading"
          @action="handleAction"
        >
          <vxe-table
            show-overflow
            row-key
            :tree-config="{
              line: true
            }"
            row-id="id"
            class="pb-4"
            ref="treeTable"
            :checkbox-config="{ labelField: 'name' }"
            :data="resourceTree"
          >
            <vxe-table-column type="checkbox" tree-node title="资源名"></vxe-table-column>
            <vxe-table-column title="资源标识符" field="resourceKey"></vxe-table-column>
          </vxe-table>
        </a-form>
      </template>
      <template v-slot:form.table.menu>
        <a-form
          :actions="treeFromAction"
          :title="params.name + '的菜单'"
          :loading="loading"
          @action="handleMenuAction"
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
            :checkbox-config="{ labelField: 'disName' }"
            :data="menuTree"
          >
            <vxe-table-column type="checkbox" tree-node title="菜单名"></vxe-table-column>
          </vxe-table>
        </a-form>
      </template>
    </a-crud>
  </a-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Ref } from 'vue-property-decorator'
import { AtroxCrudOptions } from '@/cli/types/AtroxCrudInterface'
import { ColumnDefaultSlotParams, Menu } from 'vxe-table'
import { Resource } from '../resource/ResourceEntity'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { AtroxFormAction } from '@/cli/components/atrox-form/AtroxFormInterface'

@Component({ name: 'RoleManage' })
export default class RoleManage extends Vue {
  @Ref() crud!: any
  @Ref() treeTable!: any
  @Ref() menuTable!: any
  //  当前操作行
  params: Resource = {}
  //  资源树
  resourceTree: Resource[] = []
  //  菜单树
  menuTree: Menu[] = []
  loading = false
  treeLoading = false

  treeFromAction: AtroxFormAction[] = [
    {
      type: 'save',
      text: '保存'
    }
  ]

  created() {
    this.getMenuAndResource()
  }

  async getMenuAndResource() {
    this.treeLoading = true
    Promise.race([
      this.$aapi.ResourceApi.list().then((r: DataResponse) => {
        this.resourceTree = r.data
      }),
      this.$aapi.MenuApi.list().then((r: DataResponse) => {
        this.menuTree = r.data
      })
    ]).finally(() => {
      this.treeLoading = false
    })
  }

  saveTreeTableData(
    table: any,
    api: (roleId: string, idList: string[]) => Promise<DataResponse>
  ) {
    const res: string[] = [
      ...table.getCheckboxRecords().map((_item: any) => _item.id),
      ...table.getCheckboxIndeterminateRecords().map((_item: any) => _item.id)
    ]
    this.loading = true

    api(this.params.id || '', res)
      .then(() => {
        this.crud.cancelAndCommit('query')
      })
      .finally(() => {
        this.loading = false
      })
  }

  handleAction(action: string) {
    if (action === 'save') {
      this.saveTreeTableData(this.treeTable, this.$aapi.RoleApi.saveRoleResource)
    }
  }

  handleMenuAction(action: string) {
    if (action === 'save') {
      this.saveTreeTableData(this.menuTable, this.$aapi.RoleApi.saveRoleMenu)
    }
  }

  get options(): AtroxCrudOptions {
    return {
      query: (context: { page: any }, form: Record<string, any>) =>
        this.$aapi.RoleApi.list(form, context.page.currentPage, context.page.pageSize),
      insert: this.$aapi.RoleApi.insert,
      edit: this.$aapi.RoleApi.update,
      delete: this.$aapi.RoleApi.delete,
      table: {
        columns: [
          {
            type: 'checkbox',
            width: 40,
            fixed: 'left'
          },
          {
            field: 'name',
            title: '名称'
          },
          {
            field: 'roleKey',
            title: '角色标识符'
          }
        ]
      },
      form: {
        fields: [
          {
            field: 'name',
            title: '名称'
          },
          {
            field: 'roleKey',
            title: '角色标识符'
          }
        ]
      },
      action: [
        {
          type: 'edit'
        },
        {
          type: 'delete'
        },
        {
          type: 'resource',
          text: '资源',
          handler: (params: ColumnDefaultSlotParams) => {
            this.loading = true
            this.params = params.row
            this.$aapi.RoleApi.listRoleResource(params.row.id)
              .then((r: DataResponse<Resource[]>) => {
                this.treeTable.clearCheckboxRow()
                this.treeTable.setAllTreeExpand(true)
                const searchKey = r.data.map(_resource => _resource.id)
                const data: Resource[] = []
                this.$autil.xe.eachTree(this.resourceTree, _resource => {
                  if (
                    searchKey.indexOf(_resource.id) !== -1 &&
                    _resource.children.length === 0
                  )
                    data.push(_resource)
                })
                this.treeTable.setCheckboxRow(data, true)
              })
              .finally(() => {
                this.loading = false
              })
            return true
          }
        },
        {
          type: 'menu',
          text: '菜单',
          handler: (params: ColumnDefaultSlotParams) => {
            this.loading = true
            this.params = params.row
            this.$aapi.RoleApi.listRoleMenu(params.row.id)
              .then((r: DataResponse<Resource[]>) => {
                this.menuTable.clearCheckboxRow()
                this.menuTable.setAllTreeExpand(true)
                const searchKey = r.data.map(_menu => _menu.id)
                const data: Menu[] = []
                this.$autil.xe.eachTree(this.menuTree, _menu => {
                  if (searchKey.indexOf(_menu.id) !== -1 && _menu.children.length === 0)
                    data.push(_menu)
                })
                this.menuTable.setCheckboxRow(data, true)
              })
              .finally(() => {
                this.loading = false
              })
            return true
          }
        }
      ],
      toolBar: [
        {
          type: 'insert'
        },
        {
          type: 'toolbar.delete'
        },
        {
          type: 'menuAndResource',
          text: '刷新资源和菜单',
          icon: 'mdi-refresh',
          handler: () => {
            this.getMenuAndResource()
            return false
          }
        }
      ],
      editForm: {
        fields: [
          {
            field: 'name',
            title: '名称'
          },
          {
            field: 'roleKey',
            title: '角色标识符'
          }
        ],
        actions: [
          {
            type: 'submit'
          },
          {
            type: 'cancel',
            text: '取消',
            handler: () => {
              this.crud.cancelDialog()
            }
          }
        ]
      }
    }
  }
}
</script>
