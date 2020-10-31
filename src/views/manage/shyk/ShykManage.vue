<!--
 * @description 三会一课管理
 * @author wuy1fffff
 * @date 2020-09-24 15:34
 * @lastEditTime 2020-09-24 15:34
-->
<template>
  <a-container>
    <a-crud ref="crud" :options="options" @action="handleAction"></a-crud>
  </a-container>
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue'
import Component from 'vue-class-component'
import { AtroxCrudOptions } from '@/cli/types/AtroxCrudInterface'
import { ColumnDefaultSlotParams } from 'vxe-table'
import { Ref, Watch } from 'vue-property-decorator'
import { isNull } from 'xe-utils/methods'

@Component({ name: 'ShykManage' })
export default class ShykManage extends Vue {
  @Ref() crud!: any

  type = 0
  defalutValue = ''
  @Watch('$route.path', { immediate: true })
  pathChange(val: string) {
    this.type = Number(val.split('/').pop())
    if (this.crud && this.crud.table) this.crud.table.commitProxy('reload')
  }

  handleAction(type: string, params: ColumnDefaultSlotParams) {
    if (type === 'edit') {
      this.$nextTick(() => {
        this.crud.editForm.$refs.organizationId.setDefault({
          organizationName: params.row.organizationName,
          id: params.row.organizationId
        })
      })
    }
  }

  get options(): AtroxCrudOptions {
    return {
      query: (
        context: { page: any; sort: any },
        form: Record<string, any>,
        sort: Record<string, any>
      ) => {
        form.type = this.type
        return this.$aapi.ShykApi.list(
          form,
          context.page.currentPage,
          context.page.pageSize,
          sort.ascs,
          sort.descs
        )
      },
      edit: (form: Record<string, any>) => {
        if (form.picResource) form.coverPicId = form.picResource.id
        return this.$aapi.ShykApi.update(form)
      },
      insert: (form: Record<string, any>) => {
        form.type = this.type
        if (form.picResource) form.coverPicId = form.picResource.id
        return this.$aapi.ShykApi.insert(form)
      },
      delete: this.$aapi.ShykApi.delete,
      form: {
        noCard: true,
        fields: [
          {
            field: 'meetingTitle',
            title: '会议名称'
          },
          {
            field: 'presenter',
            title: '主持人'
          }
        ]
      },
      table: {
        columns: [
          {
            type: 'checkbox',
            width: 40
          },
          {
            field: 'meetingTitle',
            title: '会议名称'
          },
          {
            field: 'meetingTime',
            title: '会议时间',
            formatter: 'time'
          },
          {
            field: 'organizationName',
            title: '组织名称'
          },
          {
            field: 'presenter',
            title: '主持人'
          },
          {
            field: 'shouldAttendNum',
            title: '人数',
            slots: {
              default: (params: ColumnDefaultSlotParams, h: CreateElement) => {
                return [
                  h(
                    'div',
                    {},
                    (!isNull(params.row.actualAttendNum)
                      ? params.row.actualAttendNum
                      : 0) +
                      '/' +
                      (!isNull(params.row.shouldAttendNum)
                        ? params.row.shouldAttendNum
                        : 0)
                  )
                ]
              }
            }
          },
          {
            field: 'absencePersonReason',
            title: '缺陷人员及原因'
          },
          {
            field: 'summary',
            title: '简要总结',
            showOverflow: 'tooltip'
          }
        ]
      },
      action: [
        {
          type: 'edit',
          width: 900
        },
        {
          type: 'delete'
        }
      ],
      toolBar: [
        {
          type: 'insert',
          width: 900
        },
        {
          type: 'toolbar.delete'
        }
      ],
      editForm: {
        fields: [
          {
            field: '',
            title: '会议信息',
            type: 'group',
            groupConfig: {
              mode: 'flex',
              flexWidth: '4',
              fields: [
                {
                  field: 'meetingTitle',
                  title: '会议名称',
                  required: true
                },
                {
                  field: 'meetingTime',
                  title: '会议时间',
                  type: 'date',
                  required: true,
                  props: {
                    type: 'datetime',
                    transfer: true
                  }
                },
                {
                  field: 'organizationId',
                  title: '组织',
                  type: 'auto',
                  required: true,
                  tips: '请输入关键字搜索组织',
                  props: {
                    target: (search: string) =>
                      this.$aapi.OrganizationApi.searchOrganization(search),
                    targetPath: 'data',
                    'item-text': 'organizationName',
                    'item-value': 'id'
                  }
                },
                {
                  field: 'presenter',
                  title: '主持人',
                  required: true
                },
                {
                  field: 'picResource',
                  title: '封面图片',
                  type: 'upload',
                  props: {
                    width: 100,
                    height: 100,
                    accept: 'image/png,image/jpg,image/jpeg'
                  }
                }
              ]
            }
          },
          {
            field: '',
            title: '人员信息',
            type: 'group',
            groupConfig: {
              mode: 'flex',
              icon: 'mdi-account',
              flexWidth: '4',
              fields: [
                {
                  field: 'shouldAttendNum',
                  title: '应到人数',
                  required: true
                },
                {
                  field: 'actualAttendNum',
                  title: '实到人数',
                  required: true
                }
              ]
            }
          },
          {
            field: '',
            title: '其他信息',
            type: 'group',
            groupConfig: {
              mode: 'flex',
              flexWidth: '2',
              flexNumber: '1',
              flexWidthNumber: '130.83',
              fields: [
                {
                  field: 'absencePersonReason',
                  title: '缺陷人员及原因',
                  type: 'textarea',
                  props: {
                    noResize: true
                  }
                },

                {
                  field: 'summary',
                  title: '简要总结',
                  type: 'textarea',
                  required: true,
                  props: {
                    noResize: true
                  }
                },
                {
                  field: 'content',
                  title: '内容',
                  type: 'rich',
                  required: true,
                  props: {
                    height: '200'
                  }
                }
              ]
            }
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
