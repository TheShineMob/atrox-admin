/**
 * @description 基础工具
 * @author wuy1fffff
 * @date 2020-07-14 16:39
 * @lastEditTime 2020-07-14 16:39
 */
import shortid from 'js-shortid'
interface BaseUtils {
  //  获得一个Id
  getId: () => string
  //  转换数字与单位字符串
  convertToUnit: (str: string | null | number, unit?: string) => string | undefined
}

const baseUtils: BaseUtils = {
  //  获得一个Id
  getId: () => {
    return shortid.gen()
  },
  convertToUnit(str: string | null | number, unit = 'px') {
    if (str === null || str === '') {
      return undefined
    } else if (isNaN(+str)) {
      return String(str)
    } else {
      return `${Number(str)}${unit}`
    }
  }
}

export { BaseUtils, baseUtils }
