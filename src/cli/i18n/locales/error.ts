/**
 * @description 错误翻译
 * @author wuy1fffff
 * @date 2020-07-30 17:05
 * @lastEditTime 2020-07-30 17:05
 */

import { AtroxLocaleLang } from './mixins'

const error: AtroxLocaleLang = {
  title: ['Error ${0}', '错误码 '],
  badNet: ['Network Error', '网络有问题哦'],
  '500': ['Server error, please contact administrator', '服务器出错了，请联系管理员'],
  '401': ['Login Expired', '未登录或登录过期'],
  '404': ['404 Not Found', '未找到资源']
}

export { error }
