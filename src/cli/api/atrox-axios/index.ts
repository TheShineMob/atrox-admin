/**
 * @description axios入口文件
 * @author wuy1fffff
 * @date 2020-07-30 15:02
 * @lastEditTime 2020-07-30 15:02
 */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios'
import { set } from 'lodash'
import { cliUtils } from '../../utils'
import {
  atroxAxiosDefaultOptions,
  AtroxAxiosOptionsMixin,
  AtroxAxiosOptions,
  DataResponse
} from './helper'
import { error } from '../../i18n/locales/error'
import i18n from '../../i18n'
import qs from 'qs'
import store from '../../store'
import AtroxDialog from '../../components/atrox-dialog'
import AtroxMessage from '../../components/atrox-message'

const errorKey: Array<string> = Object.keys(error) //  有翻译的error

class AtroxAxios {
  cache: Record<string, any> //  数据缓存

  instance: AxiosInstance //  axios单例

  constructor(options: Partial<AxiosRequestConfig>) {
    this.cache = {}
    this.instance = axios.create(options)
    this.initInterceptors()
  }

  reportError(error: DataResponse, method: 'd' | 'm' | undefined) {
    if (method === 'd') {
      AtroxDialog(error.msg)
    } else AtroxMessage(error.msg)
  }

  //    初始化拦截器
  initInterceptors() {
    this.instance.interceptors.request.use(
      //  请求拦截
      (config: AtroxAxiosOptionsMixin) => {
        if (config.token) {
          //  需要认证的请求
          const token: string | undefined = cliUtils.cookie.get('token')
          if (token)
            //  添加token
            set(config.headers, 'Authorization', `Bearer ${cliUtils.cookie.get('token')}`)
          else
            return Promise.reject({
              response: {
                config,
                data: { msg: '', code: 401, data: '' },
                status: 401,
                statusText: 'OK'
              },
              config
            })
        }
        //  转换为form表单提交的请求
        if (config.form) {
          config.data = qs.stringify(config.data)
          set(config.headers, 'Content-Type', 'application/x-www-form-urlencoded')
        }
        return config
      },
      //  请求错误
      error => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      //  响应拦截 200~300时，此处指http响应码非业务响应码
      (res: AxiosResponse) => {
        const config: AtroxAxiosOptionsMixin = res.config
        //  缓存数据
        if (config.cache && config.url) set(this.cache, config.url, res.data)
        const data: DataResponse = res.data
        if (data.code >= 200 && data.code <= 300) return res.data
        else {
          if (data.code === 401) {
            AtroxDialog(i18n.t('error.401')).finally(() =>
              store.dispatch('cli/user/logout', { logout: true })
            )
            return Promise.reject(data)
          }
          if (config.error) this.reportError(data, config.errorMethod)
          return Promise.reject(data)
        }
      },
      //    其他响应码
      async (error: AxiosError) => {
        const response: AxiosResponse | undefined = error.response
        const config: AtroxAxiosOptionsMixin = error.config
        let newError: DataResponse
        //  无响应
        if (!response) {
          newError = {
            code: 999,
            msg: i18n.t('error.badNet') as string,
            data: null
          }
          if (config.error) this.reportError(newError, config.errorMethod)
        } else {
          //  筛选错误码
          switch (response.status) {
            //  响应码为500，业务异常
            case 500:
              //  响应体为正常业务响应对象
              if (
                Object.prototype.hasOwnProperty.call(response.data, 'msg') &&
                Object.prototype.hasOwnProperty.call(response.data, 'data') &&
                Object.prototype.hasOwnProperty.call(response.data, 'code')
              ) {
                const data: DataResponse = response.data
                newError = { ...data }
                //  可以翻译的code
                if (errorKey.indexOf(data.code + '') !== -1)
                  newError.msg = i18n.t(data.code + '', data.data) as string
              } else {
                //  非正常500响应
                newError = {
                  data: response.statusText,
                  code: response.status,
                  msg: i18n.t('error.500') as string
                }
              }
              break
            //  token无效或失效
            case 401:
              await AtroxDialog(i18n.t('error.401')).finally(() =>
                store.dispatch('cli/user/logout', { logout: true })
              )
              newError = {
                data: null,
                code: response.status,
                msg: response.statusText
              }
              //  可以翻译的code
              return Promise.reject(newError)
            //  其他错误
            default:
              newError = {
                data: null,
                code: response.status,
                msg: response.statusText
              }
              //  可以翻译的status
              if (errorKey.indexOf(response.status + '') !== -1)
                newError.msg = i18n.t(`error.${response.status}`) as string
              break
          }
          //  需要弹框报错
          if (config.error) this.reportError(newError, config.errorMethod)
        }
        return Promise.reject(newError)
      }
    )
  }

  request<T = any>(
    options: AxiosRequestConfig,
    atroxOptions: Partial<AtroxAxiosOptions> = {}
  ): Promise<DataResponse<T>> {
    const currentOptions = Object.assign(options, atroxAxiosDefaultOptions, atroxOptions)
    //  缓存
    if (
      currentOptions.cache &&
      options.url &&
      Object.prototype.hasOwnProperty.call(this.cache, options.url)
    )
      return Promise.resolve(this.cache[options.url])
    return (this.instance.request(currentOptions) as unknown) as Promise<DataResponse<T>>
  }
}

export default AtroxAxios
