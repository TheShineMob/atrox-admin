/**
 * @description 函数式对话框声明
 * @author wuy1fffff
 * @date 2020-07-27 08:55
 * @lastEditTime 2020-07-27 08:55
 */
type AtroxDialogAction = 'confirm' | 'cancel'

export type AtroxDialogOptions = {
  value: boolean //  控制显示
  width: number | string //  最大宽度
  title: string // 标题
  message: string // 内容
  confirmBtn: boolean //  是否显示确认按钮
  cancelBtn: boolean //  是否显示取消按钮
  cancelBtnText: string //  取消按钮文本
  confirmBtnText: string //  确认按钮文本
  transition: string //  动画
  persistent: boolean // 点击遮罩层不关闭
  callback: Function | null
}

export interface AtroxDialog {
  (options: Partial<AtroxDialogOptions> | string): Promise<AtroxDialogAction> //  常用弹出
  alert(options: Partial<AtroxDialogOptions> | string): Promise<AtroxDialogAction> //  alert 弹出等于常用弹出
  confirm(options: Partial<AtroxDialogOptions> | string): Promise<AtroxDialogAction> //  含有confirm的弹出
  cancel(options: Partial<AtroxDialogOptions> | string): Promise<AtroxDialogAction> //  含有cancel的弹出
  close(): void //  关闭实例
  defaultOptions: AtroxDialogOptions //  默认参数
}
