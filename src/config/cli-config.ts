/**
 * @description 框架配置文件
 * @author wuy1fffff
 * @date 2020-07-11 13:18
 * @lastEditTime 2020-07-11 13:18
 */

// 颜色列表
const colorList: string[] = [
  process.env.VUE_APP_PRIMARY_COLOR as string,
  '#07C877',
  '#515245',
  '#E55D8D',
  '#FF9900'
]

//  主题对象
interface AtroxTheme {
  name: string
  bg?: string
  vuetifyDark: boolean
}

//  主题列表
const themeList: Array<AtroxTheme> = [{ name: 'atrox', vuetifyDark: false }]
//  开发环境
if (process.env.NODE_ENV === 'development')
  themeList.push({ name: 'wyf', bg: 'image/theme/wyf/bg.png', vuetifyDark: true })

export { AtroxTheme, themeList, colorList }
