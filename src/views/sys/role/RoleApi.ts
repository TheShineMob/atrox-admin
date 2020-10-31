import { ajax } from '@/cli/api'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { Menu } from '../menu/MenuEntity'
import { Role } from './RoleEntity'

export default {
  list(role: Role = {}, pageNum = 1, pageSize = -1): Promise<DataResponse> {
    return ajax.request({
      url: '/sysRole/page',
      method: 'post',
      params: {
        pageNum,
        pageSize
      },
      data: role
    })
  },
  update(role: Role): Promise<DataResponse> {
    return ajax.request({
      url: '/sysRole/update',
      method: 'patch',
      data: role
    })
  },
  insert(role: Role): Promise<DataResponse> {
    return ajax.request({
      url: '/sysRole/insert',
      method: 'post',
      data: role
    })
  },
  delete(idList: string[]): Promise<DataResponse> {
    return ajax.request({
      url: '/sysRole/deleteBatch',
      method: 'delete',
      data: idList
    })
  },
  listRoleResource(roleId: string): Promise<DataResponse> {
    return ajax.request({
      url: '/sysRoleResource/listRoleResource',
      method: 'get',
      params: {
        roleId
      }
    })
  },
  saveRoleResource(roleId: string, resourceIdList: string[]): Promise<DataResponse> {
    return ajax.request({
      url: '/sysRoleResource/saveRoleResource',
      method: 'post',
      data: {
        roleId,
        resourceIdList
      }
    })
  },
  listRoleMenu(roleId: string): Promise<DataResponse<Menu[]>> {
    return ajax.request({
      url: '/sysRoleMenu/listRoleMenu',
      method: 'get',
      params: {
        roleId
      }
    })
  },
  saveRoleMenu(roleId: string, menuIdList: string[]): Promise<DataResponse> {
    return ajax.request({
      url: '/sysRoleMenu/saveRoleMenu',
      method: 'post',
      data: {
        roleId,
        menuIdList
      }
    })
  }
}
