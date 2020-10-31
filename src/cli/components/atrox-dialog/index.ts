/**
 * @description 函数式对话框
 * @author wuy1fffff
 * @date 2020-07-27 08:41
 * @lastEditTime 2020-07-27 08:41
 */
import Vue from 'vue'
import AtroxDialogComponent from './AtroxDialog.vue'
import { AtroxDialogOptions, AtroxDialogAction } from '@/cli/types/atrox-dialog'
// 核心插件
import i18n from '@/cli/i18n' //  国际化
import vuetify from '@/cli/plugins/vuetify'

type AtroxDialogInstance = Vue &
  AtroxDialogOptions &
  Partial<{ resolve: Function; reject: Function }>

let instance: AtroxDialogInstance //  单例

//  检查入参
function checkAtroxDialogOptions(
  options: Partial<AtroxDialogOptions> | string
): Partial<AtroxDialogOptions> {
  if (typeof options === 'string')
    options = {
      message: options
    }
  return options
}

//  初始化实例
function initInstance() {
  //  如果存在摧毁原实例
  instance && instance.$destroy()

  instance = new AtroxDialogComponent({
    el: document.createElement('div'),
    vuetify,
    i18n
  })

  instance.$on('input', (value: boolean) => {
    instance.value = value
  })
}

function AtroxDialog(
  options: Partial<AtroxDialogOptions> | string
): Promise<AtroxDialogAction> {
  return new Promise((resolve, reject) => {
    //  如果没有实例先初始化
    !instance && initInstance()
    //  混合参数属性
    Object.assign(
      instance,
      AtroxDialog.defaultOptions,
      checkAtroxDialogOptions(options),
      {
        resolve,
        reject
      }
    )
  })
}

AtroxDialog.alert = AtroxDialog

AtroxDialog.confirm = (options: Partial<AtroxDialogOptions> | string) => {
  return AtroxDialog({
    ...checkAtroxDialogOptions(options),
    confirmBtn: true
  })
}

AtroxDialog.cancel = (options: Partial<AtroxDialogOptions> | string) => {
  return AtroxDialog({
    ...checkAtroxDialogOptions(options),
    cancelBtn: true
  })
}

AtroxDialog.close = () => {
  //  关闭实例
  if (instance.value) instance.value = false
}

AtroxDialog.defaultOptions = {
  value: true, //  控制显示
  width: '320', //  最大宽度
  title: '', // 标题
  message: '', // 内容
  confirmBtn: true, //  是否显示确认按钮
  cancelBtn: false, //  是否显示取消按钮
  cancelBtnText: '', //  取消按钮文本
  confirmBtnText: '', //  确认按钮文本
  transition: 'zoom', //  动画
  persistent: false, // 点击遮罩层不关闭
  callback: (action: string) => {
    if (instance.reject && instance.resolve)
      action === 'confirm' ? instance.resolve(action) : instance.reject(action)
  }
}

export default AtroxDialog
