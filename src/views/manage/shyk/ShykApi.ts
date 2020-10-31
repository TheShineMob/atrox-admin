/**
 * @description 三会一课Api
 * @author wuy1fffff
 * @date 2020-09-24 15:31
 * @lastEditTime 2020-09-24 15:31
 */
import { ajax } from '@/cli/api'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { Shyk } from './ShykEntity'

export default {
  list(
    shyk: Shyk = {},
    pageNum = 1,
    pageSize = -1,
    ascs = [],
    descs = []
  ): Promise<DataResponse> {
    return ajax.request({
      url: '/shyk/pageShyk',
      method: 'post',
      params: {
        pageNum,
        pageSize
      },
      data: {
        ascs: ascs,
        descs: descs,
        param: shyk
      }
    })
  },
  update(shyk: Shyk): Promise<DataResponse> {
    return ajax.request({
      url: '/shyk/updateShyk',
      method: 'patch',
      data: shyk
    })
  },
  insert(shyk: Shyk): Promise<DataResponse> {
    return ajax.request({
      url: '/shyk/insertShyk',
      method: 'post',
      data: shyk
    })
  },
  delete(idList: string[]): Promise<DataResponse> {
    return ajax.request({
      url: '/shyk/deleteShyk',
      method: 'delete',
      data: idList
    })
  }
}
