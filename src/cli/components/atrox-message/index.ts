/**
 * @description 函数式消息框
 * @author wuy1fffff
 * @date 2020-07-27 09:11
 * @lastEditTime 2020-07-27 09:11
 */
import Vue from 'vue'
import AtroxMessageComponent from './AtroxMessage.vue'
//  核心插件
import i18n from '@/cli/i18n' //  国际化
import vuetify from '@/cli/plugins/vuetify' //  vuetify
import { AtroxMessageOptions } from '@/cli/types/atrox-message'

type AtroxMessageInstance = Vue & AtroxMessageOptions

let instance: AtroxMessageInstance //  单例

//  初始化实例
function initInstance() {
  //  如果存在摧毁原实例
  instance && instance.$destroy()

  instance = new AtroxMessageComponent({
    el: document.createElement('div'),
    vuetify,
    i18n
  })
  //  加入dom
  document.body.children[1].appendChild(instance.$el)

  instance.$on('input', (value: boolean) => {
    instance.value = value
  })
}

//  检查入参
function checkAtroxMessageOptions(
  options: Partial<AtroxMessageOptions> | string
): Partial<AtroxMessageOptions> {
  if (typeof options === 'string')
    options = {
      message: options
    }
  return options
}

function AtroxMessage(options: Partial<AtroxMessageOptions> | string): void {
  //  如果没有实例先初始化
  !instance && initInstance()
  //  混合参数属性
  Object.assign(instance, AtroxMessage.defaultOptions, checkAtroxMessageOptions(options))
}

AtroxMessage.info = AtroxMessage
AtroxMessage.success = (options: AtroxMessageOptions | string) => {
  AtroxMessage({
    ...checkAtroxMessageOptions(options),
    color: 'success'
  })
}
AtroxMessage.warning = (options: AtroxMessageOptions | string) => {
  AtroxMessage({
    ...checkAtroxMessageOptions(options),
    color: 'warning'
  })
}
AtroxMessage.error = (options: AtroxMessageOptions | string) => {
  AtroxMessage({
    ...checkAtroxMessageOptions(options),
    color: 'error'
  })
}

AtroxMessage.close = () => {
  //  关闭实例
  if (instance.value) instance.value = false
}

AtroxMessage.defaultOptions = {
  value: true, //  控制显示
  message: '', // 内容
  transition: 'fadeDown', //  动画
  top: true, //  顶部显示
  color: 'primary', //  颜色
  timeout: 3000, //  延时
  multiLine: true, //  多行
  vertical: false //  按钮与内容不在一行
}

export default AtroxMessage
