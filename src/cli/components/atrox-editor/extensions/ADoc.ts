/**
 * @description 富文本基本doc Node
 * @author wuy1fffff
 * @date 2020-08-11 10:16
 * @lastEditTime 2020-08-11 10:16
 */
import { Doc as TiptapDoc } from 'tiptap'

export default class Doc extends TiptapDoc {
  get defaultOptions() {
    return {
      title: false
    }
  }

  get schema() {
    const title = !!this.options.title

    return {
      content: title ? 'title block+' : 'block+'
    }
  }
}
