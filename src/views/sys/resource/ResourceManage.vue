<!--
 * @description 资源列表
 * @author wuy1fffff
 * @date 2020-09-22 17:16
 * @lastEditTime 2020-09-22 17:16
-->
<template>
  <a-container>
    <a-crud :options="options" ref="crud"> </a-crud>
  </a-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Ref } from 'vue-property-decorator'
import { AtroxCrudOptions } from '@/cli/types/AtroxCrudInterface'
import { Resource } from './ResourceEntity'
import { ColumnDefaultSlotParams } from 'vxe-table'
import { DataResponse } from '@/cli/api/atrox-axios/helper'

@Component({ name: 'ResourceManage' })
export default class ResourceManage extends Vue {
  @Ref() crud!: any
  parent: Resource = {}

  get options(): AtroxCrudOptions {
    return {
      insert: (item: Resource) => {
        item.parentId = this.parent.id || '0'
        return this.$aapi.ResourceApi.insert(item)
      },
      edit: this.$aapi.ResourceApi.update,
      delete: this.$aapi.ResourceApi.delete,
      table: {
        columns: [
          {
            type: 'checkbox',
            width: 40
          },
          {
            field: 'name',
            title: '名称',
            width: 200,
            treeNode: true
          },
          {
            field: 'resourceKey',
            title: '资源标识符'
          }
        ],
        treeConfig: true,
        pagerConfig: false,
        proxyConfig: {
          autoLoad: true,
          message: false,
          ajax: {
            query: () => {
              const expandRecords: any[] = this.crud.table.getTreeExpandRecords()

              return new Promise(resolve => {
                this.$aapi.ResourceApi.list().then((r: DataResponse) => {
                  const searchKey = expandRecords.map(_resource => _resource.id)
                  const data: Resource[] = []
                  setTimeout(() => {
                    this.$autil.xe.eachTree(this.crud.table.getData(), _resource => {
                      if (searchKey.indexOf(_resource.id) !== -1) data.push(_resource)
                    })
                    this.crud.table.setTreeExpand(data, true)
                  }, 100)
                  resolve(r.data)
                })
              })
            }
          }
        }
      },
      actionConfig: {
        width: 266
      },
      action: [
        {
          type: 'edit'
        },
        {
          type: 'delete'
        },
        {
          type: 'insert',
          text: '新增子级',
          width: 500,
          handler: (params: ColumnDefaultSlotParams) => {
            this.parent = params.row
            return this.crud.handleInsertClick()
          }
        }
      ],
      toolBar: [
        {
          type: 'insert',
          handler: () => {
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
        }
      ],
      editForm: {
        fields: [
          {
            field: 'parentId',
            title: '父级',
            disabled: true,
            hiddenOn: () => this.parent.id === undefined || this.parent.id === '0',
            value: this.parent.name
          },
          {
            field: 'name',
            title: '名称',
            required: true
          },
          {
            field: 'resourceKey',
            title: '资源标识符',
            required: true
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
