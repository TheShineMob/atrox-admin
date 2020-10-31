/**
 * @description 框架中的处理路由文件
 * @author wuy1fffff
 * @date 2020-07-13 10:40
 * @lastEditTime 2020-07-13 10:40
 */
import { RouteConfigSingleView } from 'vue-router/types/router'

const TOP_ROUTE_ID = '0'
const COMPONENT_ROUTE = 1 //  组件路由
const IFRAME_ROUTE = 2 //  inframe路由
const OUTER_ROUTE = 3 //  外链路由（跳转到外部网站）
const FATHER_ROUTE = 4 //  父路由（用于层级显示，无具体页面）
// 框架中的路由对象
interface CliRoute {
  id: string //  id
  type: 1 | 2 | 3 | 4 | 5 //  类型
  name: string //  名称,vue-router中的name，唯一标识
  path: string //  路径
  icon: string //  图标
  disName: string //  展示名称
  component?: string //  组件路径
  children?: Array<CliRoute> //  子路由
  url?: string //  url,用于iframe和外链和微应用
  parentId: string //  父id
}

const importComponent = (file: string) => {
  //  生产环境使用懒加载
  if (process.env.NODE_ENV === 'production') return () => import(`@/views/${file}`)
  //  开发环境直接加载，加快热更新速度
  else return require(`@/views/${file}`).default
}

//  转换指定的菜单，加载对应组件或其余设置
function adapter(cliRoute: CliRoute): void {
  if (cliRoute.type === IFRAME_ROUTE) {
    //  加载Iframe组件
    cliRoute.component = 'components/AtroxRouteIframe.vue'
    //  更改为组件路由
    cliRoute.type = COMPONENT_ROUTE
  }
}

//  转换为vue-router需要的设置
function transToConfig(cliRoute: CliRoute): RouteConfigSingleView {
  const res: RouteConfigSingleView = {
    name: cliRoute.name,
    path: cliRoute.path + '/:actions?',
    meta: {
      ...cliRoute
    }
  }
  if (cliRoute.type === COMPONENT_ROUTE && cliRoute.component) {
    try {
      res.component = importComponent(cliRoute.component)
    } catch (e) {
      console.log(cliRoute.disName + '加载失败')
    }
  }
  return res
}

//  初始化和设置菜单路径,刚获得菜单时调用一次
function initAndSetPath(
  cliRoute: Array<CliRoute> | undefined, //  路由
  path = '' //  父path
): void {
  if (cliRoute && cliRoute.length > 0) {
    cliRoute.forEach(_childRoute => {
      //  改变路径
      _childRoute.path = path + '/' + _childRoute.path
      adapter(_childRoute)
      //  递归设置子菜单路径
      if (_childRoute.type === FATHER_ROUTE) {
        initAndSetPath(_childRoute.children, _childRoute.path)
      }
    })
  }
}

//  递归取得不是父菜单的路由
function recursionGetNotFather(
  cliRoute: Array<CliRoute> | undefined //  路由
): Array<RouteConfigSingleView> {
  if (cliRoute && cliRoute.length > 0) {
    const res: Array<RouteConfigSingleView> = []
    cliRoute.forEach(_childRoute => {
      //  先adpater处理子节点
      const resConfig: RouteConfigSingleView = transToConfig(_childRoute)

      if (_childRoute.type === FATHER_ROUTE) {
        res.push(...recursionGetNotFather(_childRoute.children))
      } else {
        res.push(resConfig)
      }
    })
    return res
  } else return []
}

export {
  COMPONENT_ROUTE,
  IFRAME_ROUTE,
  OUTER_ROUTE,
  FATHER_ROUTE,
  TOP_ROUTE_ID,
  CliRoute,
  adapter,
  initAndSetPath,
  transToConfig,
  recursionGetNotFather
}
