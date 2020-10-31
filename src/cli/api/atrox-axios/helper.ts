/**
 * @description axios单例支持文件
 * @author wuy1fffff
 * @date 2020-07-30 16:34
 * @lastEditTime 2020-07-30 16:34
 */

import { AxiosRequestConfig } from 'axios'

//  自定义axios选项
interface AtroxAxiosOptions {
  cache: boolean //    是否缓存
  error: boolean //  是否弹框报错
  errorMethod: 'd' | 'm' //  弹框报错形式
  token: boolean //  是否需要添加token,
  form: boolean //  是否form表单提交
}

//  业务对象
interface DataResponse<T = any> {
  code: number
  msg: string
  data: T
}

const atroxAxiosDefaultOptions: AtroxAxiosOptions = {
  cache: false,
  error: true,
  errorMethod: 'd',
  token: true,
  form: false
}

type AtroxAxiosOptionsMixin = Partial<AtroxAxiosOptions> & AxiosRequestConfig

interface DataRes<T> {
  msg: string
  code: number
  data: T
}

export {
  DataRes,
  AtroxAxiosOptions,
  atroxAxiosDefaultOptions,
  AtroxAxiosOptionsMixin,
  DataResponse
}
