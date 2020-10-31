import i18n from '@/cli/i18n'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from '@/assets/styles/unit/color.scss'

//  实例化vuetify并设置颜色
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        info: colors.info,
        success: colors.success,
        warning: colors.warning,
        error: colors.error
      },
      dark: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        info: colors.info,
        success: colors.success,
        warning: colors.warning,
        error: colors.error
      }
    }
  },
  //  将vuetify的国际化使用自定义i18n
  lang: {
    t: (key, ...params) => i18n.t(key, params) as string
  }
})

export default vuetify
