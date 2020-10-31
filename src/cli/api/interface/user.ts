import { DataResponse } from '../atrox-axios/helper'
import { ajax } from '..'
import { Menu } from 'vxe-table'

interface SystemApi {
  //  用户登录
  login: (username: string, password: string) => Promise<DataResponse>
  //  换取用户信息
  info: () => Promise<DataResponse>
  //  查询用户菜单
  menu: () => Promise<DataResponse<Menu[]>>
  //  上传文件
  upload: (file: File, callBack?: (progress: number) => void) => Promise<DataResponse>
}

const user: SystemApi = {
  async login(username: string, password: string) {
    return await ajax.request(
      {
        url: '/login',
        method: 'post',
        data: {
          username,
          password
        }
      },
      { form: true, token: false }
    )
  },
  async info() {
    return await ajax.request({
      url: '/sysUser/getUserInfo',
      method: 'get'
    })
  },
  async menu() {
    return await ajax.request({
      url: '/sysMenu/treeUserSysMenu',
      method: 'get'
    })
  },
  async upload(
    file: File,
    callBack = (progress: number) => {
      //void
      console.log(progress)
    }
  ) {
    const formData = new FormData()
    formData.append('file', file)
    return await ajax.request({
      url: '/resource/uploadTmpFile',
      method: 'post',
      data: formData,
      onUploadProgress(progressEvent: ProgressEvent) {
        const val = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0)
        callBack(parseInt(val))
      }
    })
  }
}

export { user, SystemApi }
