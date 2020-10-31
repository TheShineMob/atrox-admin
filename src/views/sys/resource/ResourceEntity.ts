import { BaseField } from '@/config/cli-interface'

export interface Resource extends BaseField {
  authority?: string //
  name?: string //  名称
  parentId?: string //  父资源Id
  resourceKey?: string // 资源标识符
}
