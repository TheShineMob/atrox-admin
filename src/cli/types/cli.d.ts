/**
 * @description 框架所需声明
 * @author wuy1fffff
 * @date 2020-07-11 13:16
 * @lastEditTime 2020-07-11 13:16
 */
declare module 'webpack-theme-color-replacer/client' {
  class WebPackThemeColorReplacer {
    changer: {
      changeColor: (options: {
        oldColors: Array<string>
        newColors: Array<string>
      }) => void
    }
  }
  const client: WebPackThemeColorReplacer

  export default client
}

declare module '@/assets/styles/unit/color.scss' {
  const primary: string
  const secondary: string
  const accent: string
  const info: string
  const success: string
  const warning: string
  const error: string
  export { primary, secondary, accent, info, success, warning, error }
}

declare module 'js-shortid' {
  class Shortid {
    gen: () => string
  }
  const shortid: Shortid
  export default shortid
}

declare module 'nprogress' {
  interface Nprogress {
    start: () => void
    done: () => void
  }
  const nprogress: Nprogress
  export default nprogress
}

declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}
