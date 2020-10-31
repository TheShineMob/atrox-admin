/**
 * @description 引入实例化i18n并修改某些方法
 * @author wuy1fffff
 * @date 2020-07-11 13:13
 * @lastEditTime 2020-07-11 13:13
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n' //  i18n
import { localeLang, defalutLocale } from './locales/mixins'

//  重写$tc，下标从0开始
VueI18n.prototype.getChoiceIndex = (choice: number, choicesLength: number): number => {
  if (choice > choicesLength) return choicesLength - 1
  if (choice < 0) return 0
  return choice
}

Vue.use(VueI18n)

export default new VueI18n({
  locale: defalutLocale,
  messages: localeLang
})
