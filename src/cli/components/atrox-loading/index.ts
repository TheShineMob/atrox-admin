/**
 * @description 无限加载指令
 * @author wuy1fffff
 * @date 2020-07-29 16:54
 * @lastEditTime 2020-07-29 16:54
 */

import AtroxLoading from './AtroxLoading.vue'
import { DirectiveBinding, DirectiveOptions } from 'vue/types/options'
import { set } from 'lodash'

const AtroxLoadingDirective: DirectiveOptions = {
  inserted(el: HTMLElement, binding: DirectiveBinding) {
    el.appendChild(
      new AtroxLoading({
        el: document.createElement('div')
      }).$el
    )
    set(el.children[el.children.length - 1], 'style.display', binding.value ? '' : 'none')
  },
  update(el: HTMLElement, binding: DirectiveBinding) {
    set(el.children[el.children.length - 1], 'style.display', binding.value ? '' : 'none')
  }
}

export default AtroxLoadingDirective
