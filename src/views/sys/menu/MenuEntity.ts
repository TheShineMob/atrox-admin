import { BaseField } from '@/config/cli-interface'

export interface Menu extends BaseField {
  type?: 1 | 2 | 3 | 4 //  类型
  name?: string //  名称,vue-router中的name，唯一标识
  path?: string //  路径
  icon?: string //  图标
  disName?: string //  展示名称
  component?: string //  组件路径
  children?: Array<Menu> //  子路由
  url?: string //  url,用于iframe和外链和微应用
  parentId?: string //  父id
}
