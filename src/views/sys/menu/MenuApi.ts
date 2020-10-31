import { ajax } from '@/cli/api'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { Menu } from './MenuEntity'

export default {
  list(): Promise<DataResponse> {
    return ajax.request({
      url: '/sysMenu/treeSysMenu',
      method: 'get'
    })
  },
  update(menu: Menu): Promise<DataResponse> {
    return ajax.request({
      url: '/sysMenu/update',
      method: 'patch',
      data: menu
    })
  },
  insert(menu: Menu): Promise<DataResponse> {
    return ajax.request({
      url: '/sysMenu/insert',
      method: 'post',
      data: menu
    })
  },
  delete(idList: string[]): Promise<DataResponse> {
    return ajax.request({
      url: '/sysMenu/deleteBatch',
      method: 'delete',
      data: idList
    })
  },
  updateBatch(menuList: Menu[]): Promise<DataResponse> {
    return ajax.request({
      url: '/sysMenu/updateBatch',
      method: 'patch',
      data: menuList
    })
  }
}
