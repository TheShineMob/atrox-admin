import Cookies, { CookieAttributes } from 'js-cookie'
/**
 * @description cookie工具类
 * @author wuy1fffff
 * @date 2020-07-29 13:59
 * @lastEditTime 2020-07-29 13:59
 */

interface CookieUtils {
  //  设置一个值
  set: (
    name: string,
    value: string | Record<string, any>,
    cookieSetting?: CookieAttributes
  ) => void
  //  获取一个值
  get: (name: string) => string | undefined
  //  移除一个值
  remove: (name: string) => void
}

const cookieUtils: CookieUtils = {
  set: (
    name = 'default',
    value: string | Record<string, any>,
    cookieSetting: CookieAttributes = {}
  ) => {
    const currentCookieSetting: CookieAttributes = {
      expires: 1
    }
    Object.assign(currentCookieSetting, cookieSetting)
    Cookies.set(
      `atrox-${process.env.VUE_APP_VERSION}-${name}`,
      value,
      currentCookieSetting
    )
  },
  get: (name = 'default') => {
    return Cookies.get(`atrox-${process.env.VUE_APP_VERSION}-${name}`)
  },
  remove: (name = 'default') => {
    Cookies.remove(`atrox-${process.env.VUE_APP_VERSION}-${name}`)
  }
}

export { cookieUtils, CookieUtils }
