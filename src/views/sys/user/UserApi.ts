import { ajax } from '@/cli/api'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { User } from './UserEntity'

export default {
  list(user: User = {}, pageNum = 1, pageSize = -1): Promise<DataResponse> {
    return ajax.request({
      url: '/sysUser/page',
      method: 'post',
      params: {
        pageNum,
        pageSize
      },
      data: user
    })
  },
  update(user: User): Promise<DataResponse> {
    return ajax.request({
      url: '/sysUser/update',
      method: 'patch',
      data: user
    })
  },
  insert(user: User): Promise<DataResponse> {
    return ajax.request({
      url: '/sysUser/insert',
      method: 'post',
      data: user
    })
  },
  delete(idList: string[]): Promise<DataResponse> {
    return ajax.request({
      url: '/sysUser/deleteBatch',
      method: 'delete',
      data: idList
    })
  },
  listUserRole(userId: string) {
    return ajax.request({
      url: '/sysRoleUser/listUserRole',
      method: 'get',
      params: {
        userId
      }
    })
  },
  saveUserRole(userId: string, roleIdList: string[]) {
    return ajax.request({
      url: '/sysRoleUser/saveUserRole',
      method: 'post',
      data: {
        userId,
        roleIdList
      }
    })
  }
}
