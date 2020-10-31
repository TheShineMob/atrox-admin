import { ajax } from '@/cli/api'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { Resource } from './ResourceEntity'

export default {
  list(): Promise<DataResponse> {
    return ajax.request({
      url: '/sysResource/treeSysResource',
      method: 'get'
    })
  },
  update(resource: Resource): Promise<DataResponse> {
    return ajax.request({
      url: '/sysResource/update',
      method: 'patch',
      data: resource
    })
  },
  insert(resource: Resource): Promise<DataResponse> {
    return ajax.request({
      url: '/sysResource/insert',
      method: 'post',
      data: resource
    })
  },
  delete(idList: string[]): Promise<DataResponse> {
    return ajax.request({
      url: '/sysResource/deleteBatch',
      method: 'delete',
      data: idList
    })
  }
}
