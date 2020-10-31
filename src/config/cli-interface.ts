export interface EasyItem {
  text: string
  value: any
}

export interface BaseField {
  createBy?: string //  创建者
  createTime?: number //  创建时间
  deleted?: 0 | 1 //  0有效 1无效
  extra?: string //  额外信心
  id?: string //  id
  updateBy?: string //  更新者
  updateTime?: number //  更新时间
  version?: number //  版本
  weight?: number //  权重
}
