/**
 * @description Crud页面
 * @author wuy1fffff
 * @date 2020-09-21 15:48
 * @lastEditTime 2020-09-21 15:48
 */
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import {
  AtroxCrudAction,
  AtroxCrudOptions,
  AtroxFormOptions,
  AtroxTableOptions
} from '@/cli/types/AtroxCrudInterface'
import { cloneDeep, isNull, pull, snakeCase } from 'lodash'
import './AtroxCrudStyle.scss'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop, Ref } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import { ColumnDefaultSlotParams } from 'vxe-table'

@Component({ name: 'AtroxCrud' })
export default class AtroxCrud extends Vue {
  //  配置表格
  @Prop({
    type: Object,
    required: true
  })
  options!: AtroxCrudOptions

  //  查询对象
  query: Record<string, any> = {}

  //排序对象
  sort: Record<string, any> = {
    ascs: [],
    descs: []
  }
  @Prop({ type: Boolean, default: false }) loading!: boolean

  @Ref() form!: any
  @Ref() table!: any
  @Ref() editForm!: any
  @Ref() templateA!: any
  @Ref() exportBtn!: any

  action: AtroxCrudAction = { type: 'none' }
  dialog = false
  dialogLoading = false
  editEntity: Record<string, any> | null = null
  tableLoading = false
  formMap: Record<string, Record<string, boolean>> = {
    table: {},
    toolbar: {}
  }

  excelUploadFile: File | null = null
  excelUploadLoading = false
  showTemplate = false
  templatePath = ''
  templateName = ''
  exportName = ''

  @Emit('action')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tableActionEmit(type: string, params: ColumnDefaultSlotParams) {
    //  reutrn type and params
  }

  getFormOptions(): AtroxFormOptions {
    const defaultFormOptions: AtroxFormOptions = {
      mode: 'inline',
      noCard: true
    }
    const formOptions: AtroxFormOptions = {
      ...defaultFormOptions,
      ...this.options.form
    }

    return formOptions
  }

  getTableOptions(): AtroxTableOptions {
    const defalutTableOptions: AtroxTableOptions = {
      showOverflow: 'tooltip',
      pagerConfig: true,
      size: 'small',
      highlightCurrentRow: true,
      resizable: true,
      autoResize: true,
      border: true,
      highlightHoverRow: true,
      toolbar: {
        refresh: true,
        zoom: true,
        custom: true,
        slots: {
          buttons: () => this.genToolBarList()
        }
      }
    }
    const res: AtroxTableOptions = {
      proxyConfig: {
        autoLoad: true,
        message: false,
        sort: true,
        seq: true,
        props: {
          result: 'data.records',
          total: 'data.total'
        },
        ajax: this.options.query
          ? {
              //@ts-ignore
              query: (params: any) => {
                this.getSortObject(params)
                //@ts-ignore
                return this.options.query(params, this.query, this.sort)
              }
            }
          : undefined
      },
      sortConfig: {
        showIcon: true,
        remote: true
      },
      ...defalutTableOptions,
      ...this.options.table
    }
    if (res.columns && this.options.action && this.options.action.length > 0) {
      res.columns = [
        ...res.columns,
        {
          width: this.options.action.length * 72 + 16,
          ...(this.options.actionConfig || {}),
          title: '操作',
          align: 'center',
          showOverflow: false,
          slots: {
            default: (params: ColumnDefaultSlotParams) => this.genActionList(params)
          }
        }
      ]
    }
    return res
  }

  //  生成动作按钮列表
  genActionList(params: ColumnDefaultSlotParams): VNode[] {
    return [
      <div class="d-flex">
        {this.options.action &&
          this.options.action.map(_action => {
            if (_action.hiddeOn !== undefined && _action.hiddeOn(params) === true)
              return null
            if (_action.type === 'edit')
              return this.genAction(this.getEditAction(_action), params)
            else if (_action.type === 'delete')
              return this.genAction(this.getDeleteAction(_action), params)
            return this.genAction(_action, params)
          })}
      </div>
    ]
  }

  //  生成Toolbar按钮列表
  genToolBarList(): Array<VNode> {
    if (this.options.toolBar) {
      return this.options.toolBar.reduce((res: VNode[], _action: AtroxCrudAction) => {
        if (_action.hiddeOn !== undefined && _action.hiddeOn() === true) return res
        if (_action.type === 'insert')
          res.push(this.genToolBarAction(this.getToolBarInsertAction(_action)))
        else if (_action.type === 'toolbar.delete')
          res.push(this.genToolBarAction(this.getToolBarDeleteAction(_action)))
        else if (_action.type === 'upload')
          res.push(this.genToolBarAction(this.getToolBarUploadAction(_action)))
        else if (_action.type === 'template')
          res.push(this.genToolBarAction(this.getToolBarTemplateAction(_action)))
        else if (_action.type === 'export')
          res.push(this.genToolBarAction(this.getToolBarExportAction(_action)))
        else res.push(this.genToolBarAction(_action))
        return res
      }, [])
    }
    return []
  }

  //  生成动作按钮
  genAction(action: AtroxCrudAction, params: ColumnDefaultSlotParams): VNode {
    return (
      <v-btn
        color={action.color || 'primary'}
        text
        loading={action.type === 'upload' ? this.excelUploadLoading : false}
        class="mx-1 my-n2"
        small
        height="40"
        width="60"
        onClick={() => {
          this.formMap['table'][action.type] = true
          this.action = action
          if (action.handler) {
            this.dialog = action.handler(params)
          }
          this.tableActionEmit(action.type, params)
        }}
      >
        {action.text || ''}
      </v-btn>
    )
  }

  //  生成动作按钮
  genToolBarAction(action: AtroxCrudAction): VNode {
    return (
      <v-btn
        color={action.color}
        depressed
        class="mx-1"
        onClick={() => {
          this.formMap['toolbar'][action.type] = true

          this.action = action

          if (action.handler) {
            this.dialog = action.handler()
          }
          //  emit
        }}
      >
        {action.icon ? <v-icon size="16">{action.icon}</v-icon> : ''}
        {action.text || ''}
      </v-btn>
    )
  }

  //  编辑动作
  getEditAction(action: AtroxCrudAction): AtroxCrudAction {
    return {
      text: this.$t('action.edit') as string,
      color: 'primary',
      width: 800,
      handler: this.handleEditClick,
      ...action
    }
  }

  //  删除动作
  getDeleteAction(action: AtroxCrudAction): AtroxCrudAction {
    return {
      text: this.$t('action.delete') as string,
      color: 'error',
      width: 300,
      handler: this.handleDeleteClick,
      ...action
    }
  }

  //  toolBar新增动作
  getToolBarInsertAction(action: AtroxCrudAction): AtroxCrudAction {
    return {
      text: this.$t('action.insert') as string,
      color: 'success',
      icon: 'mdi-plus',
      width: 500,
      handler: this.handleInsertClick,
      ...action
    }
  }

  //  toolBar删除动作
  getToolBarDeleteAction(action: AtroxCrudAction): AtroxCrudAction {
    return {
      text: this.$t('action.delete') as string,
      color: 'error',
      icon: 'mdi-delete',
      width: 300,
      handler: () => {
        return this.handleDeleteClick(null)
      },
      ...action
    }
  }

  //toolBar excel导入动作
  getToolBarUploadAction(action: AtroxCrudAction): AtroxCrudAction {
    return {
      text: this.$t('action.upload') as string,
      color: 'primary',
      icon: 'mdi-upload',
      width: 400,
      handler: () => {
        return this.handleUploadClick()
      },
      ...action
    }
  }

  //toolBar excel模板下载动作
  getToolBarTemplateAction(action: AtroxCrudAction): AtroxCrudAction {
    this.templatePath = action.path ? action.path : ''
    this.templateName = action.templateName ? action.templateName : '导入模板'
    return {
      text: this.$t('action.template') as string,
      color: 'info',
      icon: 'mdi-form-textbox',
      width: 400,
      handler: () => {
        return this.handleTemplateClick()
      },
      ...action
    }
  }

  //toolBar excel下载动作
  getToolBarExportAction(action: AtroxCrudAction): AtroxCrudAction {
    if (action.exportName) this.exportName = action.exportName
    else this.exportName = '导出'
    return {
      text: this.$t('action.export') as string,
      color: 'info',
      icon: 'mdi-download',
      width: 500,
      handler: () => {
        return this.handleExportClick()
      },
      ...action
    }
  }

  //toolBar

  //  删除动作
  handleDeleteClick(params: ColumnDefaultSlotParams | null): boolean {
    if (params) {
      this.editEntity = params.row
      return true
    } else {
      if (this.table.getCheckboxRecords().length > 0) {
        this.editEntity = null
        return true
      } else this.$amessage.error(this.$t('form.error.chooseOne'))
    }
    return false
  }

  // 上传动作
  handleUploadClick() {
    return true
  }

  //下载模板动作
  handleTemplateClick() {
    this.templateA && this.templateA.click()
    return false
  }

  //下载动作
  handleExportClick() {
    this.exportBtn.click()
    return false
  }

  //  编辑动作
  handleEditClick(params: ColumnDefaultSlotParams): boolean {
    this.editEntity = cloneDeep(params.row)
    this.$nextTick(() => {
      if (this.editForm) {
        this.editForm.form.resetValidation()
      }
    })
    return true
  }

  //  新增动作
  handleInsertClick() {
    this.$nextTick(() => {
      if (this.editForm) {
        this.editForm.resetValue()
      }
    })
    return true
  }

  //  取消框
  cancelDialog() {
    this.dialog = false
    this.$nextTick(() => {
      this.editEntity = null
      this.excelUploadFile = null
    })
  }

  //  取消框并提交指令
  cancelAndCommit(order: 'query' | 'reload' | undefined) {
    this.cancelDialog()
    this.$nextTick(() => {
      if (order) this.table.commitProxy(order)
    })
  }

  genEditForm(title: string) {
    return (
      <a-form
        ref="editForm"
        attrs={this.options.editForm}
        title={title}
        value={this.editEntity}
        on-input={(value: any) => {
          this.editEntity = value
        }}
        on-submit={() => {
          this.handleEditSubmit()
        }}
      ></a-form>
    )
  }

  genDeleteForm() {
    const deleteForm: AtroxFormOptions = {
      title: '删除',
      actions: [
        {
          type: 'confirm',
          text: '确认',
          color: 'primary',
          handler: this.handleDeleteSubmit
        },
        {
          type: 'cancel',
          text: '取消',
          handler: () => {
            this.cancelDialog()
          }
        }
      ],
      ...this.options.deleteForm
    }
    return (
      <a-form attrs={deleteForm}>
        <div class="px-4 pb-4">确认删除?</div>
      </a-form>
    )
  }

  handleEditSubmit() {
    if (this.editEntity) {
      return new Promise((resolve, reject) => {
        let promise: Promise<DataResponse> | null = null
        // @ts-ignore
        if (this.editEntity.id) {
          if (this.options.edit) promise = this.options.edit(this.editEntity)
        } else {
          if (this.options.insert) promise = this.options.insert(this.editEntity)
        }
        if (promise) {
          this.dialogLoading = true
          this.tableLoading = true
          promise
            .then(() => {
              this.cancelAndCommit('query')
              resolve('ok')
            })
            .catch(e => {
              reject(e)
            })
            .finally(() => {
              this.dialogLoading = false
              this.tableLoading = false
            })
        }
      })
    }
  }

  handleDeleteSubmit() {
    let target: string[] = []
    if (this.editEntity) {
      target = [this.editEntity.id]
    } else {
      target = this.table
        .getCheckboxRecords()
        .map((_entity: Record<string, any>) => _entity.id)
    }
    if (this.options.delete) {
      this.dialogLoading = true
      this.tableLoading = true
      return new Promise((resolve, reject) => {
        //@ts-ignore
        this.options
          .delete(target)
          .then(() => {
            this.cancelAndCommit('query')
            resolve('ok')
          })
          .catch(e => {
            reject(e)
          })
          .finally(() => {
            this.dialogLoading = false
            this.tableLoading = false
          })
      })
    }
  }

  handleUploadSubmit() {
    if (!isNull(this.excelUploadFile)) {
      return new Promise((resolve, reject) => {
        let promise: Promise<DataResponse> | null = null
        if (this.options.upload && this.excelUploadFile) {
          const formData = new FormData()
          formData.set('file', this.excelUploadFile)
          promise = this.options.upload(formData)
        }
        if (promise) {
          this.dialogLoading = true
          this.tableLoading = true
          this.excelUploadLoading = true
          promise
            .then(() => {
              this.cancelAndCommit('reload')
              resolve('ok')
            })
            .catch(e => {
              reject(e)
            })
            .finally(() => {
              this.dialogLoading = false
              this.tableLoading = false
              this.excelUploadLoading = false
              this.excelUploadFile = null
            })
        }
      })
    }
  }

  handleExport() {
    this.table.exportData({
      filename: this.exportName,
      sheetName: 'Sheet1',
      type: 'xlsx'
    })
  }

  getSortObject(column: any) {
    this.handleChange(column, this.sort.ascs, this.sort.descs)
  }

  handleChange(column: any, ascs: any[], descs: any[]) {
    if (column.sort.order === 'asc') {
      //判斷column是否在descs，在的話取出來，再放入ascs
      if (descs.includes(snakeCase(column.sort.field))) {
        pull(descs, snakeCase(column.sort.field))
        ascs.push(snakeCase(column.sort.field))
      } else {
        //如果colums不在descs，再判斷ascs中是否存在，存在則取出，不存在則放入
        if (ascs.includes(snakeCase(column.sort.field))) {
          delete ascs[this.sort.ascs.indexOf()]
          pull(ascs, snakeCase(column.sort.field))
        } else {
          ascs.push(snakeCase(column.sort.field))
        }
      }
    } else if (column.sort.order === 'desc') {
      //判斷column是否在ascs中，在的話取出，再放入descs
      if (ascs.includes(snakeCase(column.sort.field))) {
        pull(ascs, snakeCase(column.sort.field))
        descs.push(snakeCase(column.sort.field))
      } else {
        //如果colums不在ascs中，再判斷descs中是否存在，存在則取出，不存在則放入
        if (descs.includes(snakeCase(column.sort.field))) {
          pull(descs, snakeCase(column.sort.field))
        } else {
          descs.push(snakeCase(column.sort.field))
        }
      }
    }
  }

  genDialog() {
    const listeners = {
      input: (value: boolean) => {
        this.dialog = value
      },
      'click:outside': () => {
        this.cancelDialog()
      }
    }
    return (
      <v-dialog
        value={this.dialog}
        width={this.action ? this.action.width || '500' : '500'}
        on={listeners}
        persistent={this.dialogLoading || this.loading}
        scrollable
      >
        <v-card loading={this.dialogLoading} disabled={this.dialogLoading}>
          {this.genDialogForms()}
        </v-card>
      </v-dialog>
    )
  }

  genUploadForm() {
    const uploadForm: AtroxFormOptions = {
      title: 'EXCEL导入',
      actions: [
        {
          type: 'confirm',
          text: '确定',
          color: 'primary',
          handler: this.handleUploadSubmit
        },
        {
          type: 'cancel',
          text: '取消',
          handler: () => {
            this.cancelDialog()
          }
        }
      ],
      ...this.options.uploadForm
    }
    const listeners = {
      changeFile: (file: File) => {
        this.excelUploadFile = file
      }
    }
    return (
      <a-form attrs={uploadForm}>
        <div class="d-flex align-center justify-center">
          <a-upload
            class="pa-5 ma-5"
            width="200"
            height="200"
            manualUpload={true}
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            on={listeners}
          ></a-upload>
        </div>
        <div class="py-5">
          <p class="text-h6 text-center">
            {!isNull(this.excelUploadFile) ? this.excelUploadFile.name : ''}
          </p>
        </div>
      </a-form>
    )
  }

  genTemplate() {
    return (
      <a
        style="display: none"
        download={this.templateName}
        href={this.templatePath}
        ref="templateA"
      ></a>
    )
  }

  genExport() {
    return (
      <button style="display: none" ref="exportBtn" on-click={this.handleExport}></button>
    )
  }

  genDialogForms() {
    const res = []
    if (this.options.action)
      res.push(
        ...this.options.action.map(_action => {
          let defaultContent: VNode | null = null
          if (_action.type === 'edit')
            defaultContent = this.genEditForm(this.$t('action.edit') as string)
          else if (_action.type === 'delete') defaultContent = this.genDeleteForm()
          else if (_action.type === 'insert')
            defaultContent = this.genEditForm(this.$t('action.insert') as string)
          return this.genDialogForm(_action, defaultContent, 'table')
        })
      )
    if (this.options.toolBar)
      res.push(
        ...this.options.toolBar.map(_action => {
          let defaultContent: VNode | null = null
          if (_action.type === 'insert')
            defaultContent = this.genEditForm(this.$t('action.insert') as string)
          else if (_action.type === 'toolbar.delete')
            defaultContent = this.genDeleteForm()
          else if (_action.type === 'upload') defaultContent = this.genUploadForm()
          // else if (_action.type === 'template') defaultContent = this.genTemplateForm()
          return this.genDialogForm(_action, defaultContent, 'toolbar')
        })
      )
    return res
  }

  genDialogForm(
    action: AtroxCrudAction,
    defaultContent: VNode | null,
    type: 'table' | 'toolbar'
  ): VNode | null | undefined | VNode[] {
    if (!this.formMap[type][action.type]) return null
    const display = action.type === this.action.type ? 'block' : 'none'
    const soltName = `form.${type}.${action.type}`

    return (
      <div style={`display:${display}`}>
        {this.$scopedSlots[soltName]
          ? //@ts-ignore
            this.$scopedSlots[soltName]()
          : defaultContent}
      </div>
    )
  }

  genForm(): VNode {
    return (
      <a-form
        ref="form"
        class="mb-7"
        attrs={this.getFormOptions()}
        value={this.query}
        on-input={(value: any) => {
          this.query = value
        }}
        on-submit={() => {
          this.table.commitProxy('reload')
        }}
      ></a-form>
    )
  }

  render() {
    return (
      <div class="atrox-crud-wrap">
        {this.options.form && this.genForm()}
        <vxe-grid
          ref="table"
          attrs={this.getTableOptions()}
          loading={this.tableLoading || this.loading}
        ></vxe-grid>
        {this.genDialog()}
        {this.genTemplate()}
        {this.genExport()}
      </div>
    )
  }
}
