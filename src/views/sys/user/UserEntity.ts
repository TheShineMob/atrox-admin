import { BaseField } from '@/config/cli-interface'

export interface User extends BaseField {
  gender?: number //  性别 0-未知 1-男 2-女
  headerUrl?: string // 用户头像
  isAccountNonExpired?: boolean //  账户名是否过期 0-未过期 1-已过期
  isAccountNonLocked?: boolean // 账户是否锁定 0-未锁定 1-已锁定
  isCredentialsNonExpired?: boolean //  凭据是否过期 0-未过期 1-已过期
  isEnabled?: boolean //  状态 0-禁用 1-启用
  mail?: string //  邮箱
  name?: string //  姓名
  password?: string //  密码
  phone?: string // 手机号
  sysResourceList?: SysResourceList[] //  资源列表
  userSource?: string //  用户类型 本地用户-LOCAL 授权中心-AUTH_CENTER
  username?: string //  用户名
}

export interface SysResourceList extends BaseField {
  name?: string //  资源名称
  parentId?: string //  父资源id
  resourceKey?: string // 资源标识符
}
