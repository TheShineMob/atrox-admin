/*
 * @Descripttion:
 * @version:
 * @Author: Mob@Hz
 * @Date: 2020-10-13 17:53:09
 * @LastEditors: Mob@Hz
 * @LastEditTime: 2020-10-21 09:08:56
 */
export type RuleFunction = (val: any) => boolean | string

export const AtroxFormFieldTypeMap = {
  text: 'v-text-field',
  textarea: 'v-textarea',
  select: 'a-select',
  auto: 'a-auto',
  check: 'v-checkbox',
  checkboxes: 'a-checkboxes',
  color: 'a-color-picker',
  icon: 'a-icon-select',
  'btn-group': 'a-btn-group',
  slot: '',
  switch: 'a-switch',
  'radio-group': 'a-radio-group',
  upload: 'a-form-upload',
  rich: 'a-form-editor',
  date: 'a-date',
  group: ''
}
export type AtroxFormFieldType = keyof typeof AtroxFormFieldTypeMap

export interface AtroxFormField {
  field: string
  title: string
  value?: any
  type?: AtroxFormFieldType
  hidden?: boolean
  disabled?: boolean
  required?: boolean
  rules?: RuleFunction | RuleFunction[]
  props?: Record<string, any>
  tips?: string
  disabledOn?: (item: Record<string, any>) => boolean
  hiddenOn?: (item: Record<string, any>) => boolean
  requiredOn?: (item: Record<string, any>) => boolean
  groupConfig?: {
    icon?: string
    mode?: 'row' | 'inline' | 'flex'
    flexWidth?: string
    flexNumber?: string
    flexWidthNumber?: string | number
    fields: AtroxFormField[]
  }
}

export interface AtroxFormAction {
  text?: string
  type: string
  color?: string
  handler?: (form: Record<string, any>) => void
}
