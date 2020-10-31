<!--
 * @description 用户
 * @author wuy1fffff
 * @date 2020-09-21 15:34
 * @lastEditTime 2020-09-21 15:34
-->
<template>
  <a-container>
    <a-crud :options="options" :loading="loading" ref="crud">
      <template v-slot:[`form.table.role`]>
        <a-form
          :actions="roleFromAction"
          :title="params.name + '的角色'"
          :loading="loading"
          @action="handleAction"
        >
          <vxe-table
            border="none"
            class="pb-4"
            ref="roleTable"
            :show-header="false"
            :checkbox-config="{ labelField: 'name' }"
            :data="roleList"
          >
            <vxe-table-column type="checkbox" tree-node></vxe-table-column>
          </vxe-table>
        </a-form>
      </template>
    </a-crud>
  </a-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { AtroxCrudOptions } from '@/cli/types/AtroxCrudInterface'
import { Ref } from 'vue-property-decorator'
import { ColumnDefaultSlotParams } from 'vxe-table'
import { User } from './UserEntity'
import { AtroxFormAction } from '@/cli/components/atrox-form/AtroxFormInterface'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { Role } from '../role/RoleEntity'

@Component({ name: 'UserManage' })
export default class UserManage extends Vue {
  @Ref() crud!: any
  @Ref() roleTable!: any
  loading = false
  params: User = {}
  roleList: Role[] = []

  roleFromAction: AtroxFormAction[] = [
    {
      type: 'save',
      text: '保存'
    }
  ]

  created() {
    this.$aapi.RoleApi.list().then((r: DataResponse) => {
      this.roleList = r.data.records
    })
  }

  handleAction(action: string) {
    if (action === 'save') {
      const res: string[] = this.roleTable
        .getCheckboxRecords()
        .map((_resource: Role) => _resource.id)
      this.loading = true
      this.$aapi.UserApi.saveUserRole(this.params.id || '', res)
        .then(() => {
          this.crud.cancelAndCommit('query')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

  get options(): AtroxCrudOptions {
    return {
      query: (context: { page: any }, form: Record<string, any>) => {
        return this.$aapi.UserApi.list(
          form,
          context.page.currentPage,
          context.page.pageSize
        )
      },
      edit: this.$aapi.UserApi.update,
      insert: this.$aapi.UserApi.insert,
      delete: this.$aapi.UserApi.delete,
      form: {
        noCard: true,
        fields: [
          {
            field: 'name',
            title: '姓名'
          },
          {
            field: 'userSource',
            title: '用户来源',
            type: 'select',
            props: {
              items: [
                {
                  text: '不限',
                  value: null
                },
                {
                  text: '本地用户',
                  valueL: 'LOCAL'
                },
                {
                  text: '授权中心',
                  valueL: 'AUTH_CENTER'
                }
              ]
            }
          },
          {
            field: 'username',
            title: '用户名'
          },
          {
            field: 'phone',
            title: '手机号'
          },
          {
            field: 'mail',
            title: '邮箱'
          },
          {
            field: 'gender',
            title: '性别',
            type: 'select',
            props: {
              items: [
                {
                  text: '不限',
                  value: null
                },
                {
                  text: '男',
                  value: 1
                },
                {
                  text: '女',
                  value: 2
                }
              ]
            }
          }
        ]
      },
      table: {
        columns: [
          {
            type: 'checkbox',
            width: 40,
            fixed: 'left'
          },
          {
            field: 'name',
            title: '姓名',
            fixed: 'left'
          },
          {
            field: 'userSource',
            title: '用户来源'
          },
          {
            field: 'username',
            title: '用户名'
          },
          {
            field: 'phone',
            title: '手机号'
          },
          {
            field: 'mail',
            title: '邮箱'
          },
          {
            field: 'gender',
            title: '性别',
            formatter: ['numberEnum', ['未知', '男', '女']]
          },
          {
            field: 'headerUrl',
            title: '头像'
          },
          {
            field: 'isAccountNonExpired',
            title: '是否过期',
            formatter: ['booleanEnum', ['已过期', '未过期']]
          },
          {
            field: 'isAccountNonLocked',
            title: '是否锁定',
            formatter: ['booleanEnum', ['已过期', '未过期']]
          },
          {
            field: 'isCredentialsNonExpired',
            title: '凭据是否过期',
            formatter: ['booleanEnum', ['已过期', '未过期']]
          },
          {
            field: 'isEnabled',
            title: '是否禁用',
            formatter: ['booleanEnum', ['是', '否']]
          },
          {
            field: 'createTime',
            title: '创建时间',
            formatter: 'time',
            width: 100
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
          type: 'role',
          text: '角色',
          handler: (params: ColumnDefaultSlotParams) => {
            this.loading = true
            this.params = params.row
            this.$aapi.UserApi.listUserRole(params.row.id)
              .then((r: DataResponse<Role[]>) => {
                this.roleTable.clearCheckboxRow()
                const searchKey = r.data.map(_resource => _resource.id)
                const data: Role[] = []
                this.roleList.forEach(_role => {
                  if (searchKey.indexOf(_role.id) !== -1) data.push(_role)
                })
                this.roleTable.setCheckboxRow(data, true)
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
        }
      ],
      editForm: {
        fields: [
          {
            field: 'name',
            title: '用户名',
            required: true
          },
          {
            field: 'userSource',
            title: '用户来源',
            type: 'select',
            disabledOn: (item: Record<string, any>) =>
              item.id !== null && item.id !== undefined,
            props: {
              items: [
                {
                  text: '不限',
                  value: null
                },
                {
                  text: '本地用户',
                  value: 'LOCAL'
                },
                {
                  text: '授权中心',
                  value: 'AUTH_CENTER'
                }
              ]
            }
          },
          {
            field: 'username',
            title: '用户名',
            required: true
          },

          {
            field: 'phone',
            title: '手机号'
          },
          {
            field: 'mail',
            title: '邮箱'
          },
          {
            field: 'gender',
            title: '性别',
            type: 'select',
            required: true,
            props: {
              items: [
                {
                  text: '不限',
                  value: null
                },
                {
                  text: '男',
                  value: 1
                },
                {
                  text: '女',
                  value: 2
                }
              ]
            }
          },
          {
            field: 'password',
            title: '密码',
            requiredOn: (item: Record<string, any>) =>
              item.id === null || item.id === undefined
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
