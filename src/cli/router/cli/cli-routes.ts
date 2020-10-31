/**
 * @description 需要adapter转换的路由
 * @author wuy1fffff
 * @date 2020-07-13 15:54
 * @lastEditTime 2020-07-13 15:54
 */

import { CliRoute, TOP_ROUTE_ID, COMPONENT_ROUTE } from './adapter'
import { cliUtils } from '@/cli/utils'

const indexId: string = cliUtils.base.getId()
const INDEX_PAGE_NAME = 'Index'
const cliRoutes: Array<CliRoute> = [
  {
    type: COMPONENT_ROUTE,
    id: indexId,
    name: INDEX_PAGE_NAME,
    disName: '主页',
    icon: 'mdi-home-circle-outline',
    path: 'index',
    parentId: TOP_ROUTE_ID,
    component: 'index/Index.vue'
  }
]

export { cliRoutes, INDEX_PAGE_NAME }
