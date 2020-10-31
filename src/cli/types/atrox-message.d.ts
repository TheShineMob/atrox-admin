/**
 * @description 函数式消息框通知
 * @author wuy1fffff
 * @date 2020-07-27 09:12
 * @lastEditTime 2020-07-27 09:12
 */
export type AtroxMessageOptions = {
  value: boolean //  控制显示
  message: string // 内容
  transition: string //  动画
  top: boolean //  顶部显示
  color: string //  颜色
  timeout: number //  延时
  multiLine: boolean //  多行
  vertical: boolean //  按钮与内容不在一行
}

export interface AtroxMessage {
  (options: Partial<AtroxMessageOptions> | string): void //  常用弹出
  info(options: Partial<AtroxMessageOptions> | string): void //  常用弹出
  success(options: Partial<AtroxMessageOptions> | string): void //  常用弹出
  warning(options: Partial<AtroxMessageOptions> | string): void //  常用弹出
  error(options: Partial<AtroxMessageOptions> | string): void //  常用弹出
  close(): void //  关闭实例
  defaultOptions: AtroxMessageOptions //  默认参数
}
