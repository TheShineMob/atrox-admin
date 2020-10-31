/**
 * @description dom或bom操作
 * @author wuy1fffff
 * @date 2020-07-11 13:04
 * @lastEditTime 2020-07-11 13:04
 */

type openMethod = '_blank' | '_self'
interface DomUtils {
  //  打开一个新页面
  open: (url: string, method?: openMethod) => void
  //  设置网页title
  setTitle: (title: string) => void
}

const domUtils: DomUtils = {
  //  打开一个新页面
  open: (url: string, method = '_blank') => {
    //  创建一个a标签
    const a: HTMLAnchorElement = document.createElement('a')
    //  设置url
    a.setAttribute('href', url)
    //  设置为打开新标签
    a.setAttribute('target', method)
    //  加入dom
    document.body.appendChild(a)
    //  出发点击方法
    a.click()
    //  移除标签
    document.body.removeChild(a)
  },
  //  设置网页title
  setTitle: (title: string) => {
    const processTitle = process.env.VUE_APP_TITLE || 'Atrox'
    window.document.title = `${processTitle}${title ? ` | ${title}` : ''}`
  }
}

export { domUtils, DomUtils }
