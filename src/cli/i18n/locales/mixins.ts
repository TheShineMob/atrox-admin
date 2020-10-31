/**
 * @description 合并混入并转换国际化
 * @author wuy1fffff
 * @date 2020-07-11 13:13
 * @lastEditTime 2020-07-11 13:13
 */
export const localeList: Array<string> = ['en-US', 'zh-CN'] //  语言列表
// 默认语言
export const defalutLocale: string =
  process.env.VUE_APP_LOCALE && localeList.indexOf(process.env.VUE_APP_LOCALE) !== -1
    ? process.env.VUE_APP_LOCALE
    : localeList[0]

//  语言对象
export interface AtroxLocaleLang {
  [key: string]: AtroxLocaleLang | Array<string>
}
import { base } from './base'
import { LocaleMessages, LocaleMessageObject } from 'vue-i18n'

//  将所有语言文件混入
const mixinsLocaleLang: AtroxLocaleLang = Object.assign({}, base)

//  递归组装I18n需要的message对象
function recursionAssemble(index: number, lang: AtroxLocaleLang): LocaleMessageObject {
  const res: LocaleMessageObject = {}
  //  遍历语言文件
  Object.keys(lang).forEach(key => {
    const value: AtroxLocaleLang | Array<string> = lang[key]
    //  是数组返回对应文字，否则递归
    res[key] = Array.isArray(value) ? value[index] : recursionAssemble(index, value)
  })
  return res
}

//  处理语言
const localeLang: LocaleMessages = {}
localeList.forEach((locale: string, index: number) => {
  localeLang[locale] = recursionAssemble(index, mixinsLocaleLang)
})

export { localeLang }
