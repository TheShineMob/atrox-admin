import { BaseField } from '@/config/cli-interface'

export interface Role extends BaseField {
  name?: string //  名称
  roleKey?: string // 标识符
}
