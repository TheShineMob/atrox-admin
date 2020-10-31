import Component from 'vue-class-component'
import Vue from 'vue'
import './AtroxFormStyle.scss'
import { Prop, Watch, Ref, Emit } from 'vue-property-decorator'
import {
  AtroxFormField,
  AtroxFormFieldTypeMap,
  AtroxFormAction
} from './AtroxFormInterface'
import { cloneDeep, set } from 'lodash'
import { Debounce } from 'lodash-decorators'

@Component({
  name: 'AtroxForm'
})
export default class AtroxForm extends Vue {
  //  使用card包围body并生成表头和动作
  @Prop({ type: Boolean, default: false }) noCard!: boolean
  //    指定表单的题目
  @Prop({ type: String, default: '' }) title!: string
  //    指定表单的字段
  @Prop({ type: Array, default: () => [] }) fields!: AtroxFormField[]
  //    指定表单的操作
  @Prop({ type: [Array, Object], default: null }) actions!: AtroxFormAction[] | null

  @Prop({ type: Object, default: () => ({}) }) value!: Record<string, any>

  //    不需要验证
  @Prop({ type: Boolean, default: false }) noValidate!: boolean

  @Prop({ type: String, default: 'row' }) mode!: 'row' | 'inline' | 'flex'

  @Prop({ type: String, default: '2' }) flexWidth!: string

  @Prop({ type: String, default: '2' }) flexNumber!: string

  @Prop({ type: Boolean, default: false }) loading!: boolean

  @Prop({ type: [String, Number], default: '' }) height!: string | number

  @Ref() form!: any
  lazyValue: Record<string, any> = {} //  组件的直接绑定的value
  defaultValue: Record<string, any> = {} //  初始值
  valueChangeSign = false //  由外部引起的change
  formLoading = false //  加载动画

  @Emit('action')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  actionEmit(action: string, form: Record<string, any>) {
    //  return action and formData
  }

  created() {
    //    验证value的值和类型
    let defaultValue: Record<string, any> = {}
    defaultValue =
      typeof this.value === 'object'
        ? this.value === null
          ? {}
          : cloneDeep(this.value)
        : {}
    //  设置所有字段初始值
    this._initFields(this.fields, defaultValue)

    this.defaultValue = defaultValue

    this.lazyValue = cloneDeep(this.defaultValue)
  }

  _initFields(fields: AtroxFormField[], defaultValue: Record<string, any>) {
    fields.forEach(_field => {
      if (_field.type === 'group' && _field.groupConfig)
        this._initFields(_field.groupConfig.fields, defaultValue)
      else {
        if (!Object.prototype.hasOwnProperty.call(defaultValue, _field.field))
          set(defaultValue, _field.field, _field.value || null)
      }
    })
  }

  @Watch('lazyValue', { deep: true })
  @Debounce(100)
  lazyValueChange() {
    //    v-model传递
    if (this.valueChangeSign) {
      this.valueChangeSign = false
      return
    }
    this.$emit('input', this.lazyValue)
  }

  @Watch('value', { deep: true })
  @Debounce(100)
  valueChange() {
    //    v-model传递
    this.lazyValue = { ...this.value }
    this.valueChangeSign = true
  }

  //    默认属性值，传递给vuetify组件
  defaultFieldProps: Record<string, any> = {
    outlined: true,
    dense: true,
    color: 'primary',
    clearable: true,
    menuProps: {
      offsetY: true
    }
  }

  //    生成body主题
  genBody() {
    const { $slots } = this
    const wrapComponent = this.noValidate ? 'div' : 'v-form'
    return (
      <wrapComponent
        class={`atrox-form atrox-form-${this.mode}`}
        ref="form"
        v-aloading={this.formLoading}
      >
        <div
          class="overflow-y-auto atrox-form-field-wrap"
          style={{ height: this.$autil.base.convertToUnit(this.height) }}
        >
          {$slots.default ||
            this.genFormItems(this.fields, this.flexWidth, this.flexNumber)}
        </div>
        {this.genActions()}
      </wrapComponent>
    )
  }

  //    遍历生成表单的项
  flexWidthNumber = ''
  genFormItems(
    fields: AtroxFormField[],
    flexWidth = '2',
    flexNumber = '2',
    flexWidthNumber: string | undefined | number = ''
  ) {
    return this.$scopedSlots.default
      ? this.$scopedSlots.default(null)
      : fields.map(_field => {
          return this.genFormItem(_field, flexWidth, flexNumber, flexWidthNumber)
        })
  }

  //  生成单个项
  genFormItem(
    field: AtroxFormField,
    flexWidth = '',
    flexNumber = '',
    flexWidthNumber: string | undefined | number = ''
  ) {
    //  组表单项
    if (field.type === 'group') {
      if (field.groupConfig) {
        return (
          <div class={`px-4 atrox-form-col-${flexNumber}`}>
            <v-alert
              dense
              color="#eee"
              icon={field.groupConfig.icon || 'mdi-alert-circle'}
            >
              <strong>{field.title}</strong>
            </v-alert>
            <div class={`atrox-form-${field.groupConfig.mode}`}>
              {this.genFormItems(
                field.groupConfig.fields,
                field.groupConfig.flexWidth,
                field.groupConfig.flexNumber,
                field.groupConfig.flexWidthNumber
              )}
            </div>
          </div>
        )
      } else return ''
    }
    const newField = cloneDeep(field)
    //  去除不显示的项
    if (newField.hidden !== undefined && !newField.hidden) return false
    if (newField.hiddenOn !== undefined) {
      if (newField.hiddenOn(this.lazyValue)) return false
    }
    //  该显示的组件名
    const fiedlComponent: string = AtroxFormFieldTypeMap[newField.type || 'text']

    //  无需验证
    if (this.noValidate) {
      newField.rules = []
    } else {
      //    增加验证
      if (newField.rules) {
        if (!Array.isArray(newField.rules)) {
          newField.rules = [newField.rules]
        }
      } else newField.rules = []
      if (newField.requiredOn) newField.required = newField.requiredOn(this.lazyValue)
      if (newField.required)
        newField.rules.unshift((v: any) => {
          //  验证数组
          if (Array.isArray(v))
            return (
              v.length !== 0 ||
              (this.$t('form.error.required', [newField.title]) as string)
            )
          return !!v || (this.$t('form.error.required', [newField.title]) as string)
        })
    }

    //  组装props
    const props: Record<string, any> = {
      ...this.defaultFieldProps,
      'hide-details': this.noValidate,
      disabled:
        this.formLoading ||
        newField.disabled ||
        (newField.disabledOn !== undefined && newField.disabledOn(this.lazyValue)),
      required: newField.required,
      ...newField.props
    }

    let styleObj: Record<string, string> = {}
    let classStr = ''
    if (flexWidthNumber) {
      classStr = 'atrox-form-label'
      styleObj = {
        flex: `0 0 ${this.$autil.base.convertToUnit(flexWidthNumber)}`
      }
    } else {
      classStr = `atrox-form-label atrox-form-label-${flexWidth}`
    }
    return (
      <div class={`atrox-form-col atrox-form-col-${flexNumber}`}>
        {newField.title ? (
          <div class={classStr} style={styleObj}>
            {newField.title}
            {newField.required && this.genRequired()}
            {newField.tips && this.genTips(newField.tips)}
          </div>
        ) : (
          ''
        )}
        <div class="atrox-form-value">
          <fiedlComponent
            attrs={props}
            ref={newField.field}
            rules={newField.rules}
            value={this.lazyValue[newField.field]}
            on-input={(value: any) => {
              set(this.lazyValue, newField.field, value)
            }}
          ></fiedlComponent>
        </div>
      </div>
    )
  }

  //    生成必选标志
  genRequired() {
    return <span class="red--text">*</span>
  }

  //    生成提示
  genTips(tips: string) {
    return (
      <v-tooltip
        top
        scopedSlots={{
          activator: ({ on }: any) => {
            return (
              <v-icon on={on} size="15" class="mx-1 atrox-field__tips">
                mdi-help-circle
              </v-icon>
            )
          }
        }}
      >
        <span>{tips}</span>
      </v-tooltip>
    )
  }

  //    生成按钮组
  genActions() {
    const actions: AtroxFormAction[] = this.getActions()
    return (
      <div class={`atrox-form-action-${this.mode}`}>
        {actions.map(_action => {
          if (_action.type === 'submit')
            return this.genAction(this.getSubmitAction(_action))
          else if (_action.type === 'clear') return this.genAction(this.clearAction)
          return this.genAction(_action)
        })}
      </div>
    )
  }

  genAction(action: AtroxFormAction) {
    return (
      <v-btn
        class="mx-1"
        onClick={() => {
          if (action.handler) action.handler(this.lazyValue)
          this.actionEmit(action.type, this.lazyValue)
        }}
        depressed
        color={action.color}
      >
        {action.text}
      </v-btn>
    )
  }

  //    生成按钮组数据
  getActions(): AtroxFormAction[] {
    if (this.actions === null) {
      return [this.getSubmitAction(), this.clearAction]
    } else return this.actions
  }

  getSubmitAction(action: AtroxFormAction | undefined = undefined): AtroxFormAction {
    return {
      type: 'submit',
      text: '提交',
      color: 'primary',
      handler: this.handleSubmit,
      ...action
    }
  }

  get clearAction(): AtroxFormAction {
    return {
      type: 'clear',
      text: '重置',
      color: '',
      handler: () => {
        this.lazyValue = cloneDeep(this.defaultValue)
      }
    }
  }

  resetValue() {
    this.lazyValue = cloneDeep(this.defaultValue)
    this.form.resetValidation()
  }

  handleSubmit() {
    this.formLoading = true
    //  需要验证
    if (!this.noValidate && this.form) {
      //  验证通过
      if (this.form.validate()) {
        //  提交
        this.$emit('submit')
      }
    } else {
      //  提交
      this.$emit('submit')
    }
    this.formLoading = false
  }

  genTitle() {
    return [
      <v-card-title class="grey lighten-3 subtitle-1 py-2 pl-4">
        {this.title}
      </v-card-title>,
      <v-divider class="mb-4"></v-divider>
    ]
  }

  render() {
    let body: JSX.Element = this.genBody()
    if (!this.noCard) {
      body = (
        <v-card
          outlined
          loading={this.loading || this.formLoading}
          disabled={this.loading || this.formLoading}
        >
          {!this.noCard && this.genTitle()}
          {body}
        </v-card>
      )
    }

    return body
  }
}
