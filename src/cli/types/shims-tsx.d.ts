/**
 * @description 声明vue中的jsx语法
 * @author wuy1fffff
 * @date 2020-07-11 13:17
 * @lastEditTime 2020-07-11 13:17
 */
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any //从unknown修改为any，让没定义的属性，也能写在tsx上，不报错
    }
  }
}
