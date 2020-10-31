import { CliRoute } from '@/cli/router/cli/adapter'
import { Commit, Dispatch } from 'vuex'
import { Dictionary } from 'vue-router/types/router'

/**
 * @description 标签页模块
 * @author wuy1fffff
 * @date 2020-07-22 10:37
 * @lastEditTime 2020-07-22 10:37
 */
export type CliTab = CliRoute & {
  query: Dictionary<string>
  params: Dictionary<string>
} //  框架的标签对象

export interface CliTabStore {
  tabList: Array<CliTab> //  标签列表
}
export default {
  namespaced: true,
  state: {
    tabList: []
  },
  getters: {},
  mutations: {
    //  修改store
    setTabList(state: CliTabStore, payload: { tabList: Array<CliTab> }) {
      state.tabList = payload.tabList
    }
  },
  actions: {
    addTab(
      context: { state: CliTabStore; commit: Commit; dispatch: Dispatch },
      payload: { newTab: CliTab }
    ) {
      const tabList = [...context.state.tabList]
      for (let i = 0; i < tabList.length; i++) {
        //  名称相同
        if (tabList[i].name === payload.newTab.name) {
          //  参数也相同
          if (
            JSON.stringify(tabList[i].query) === JSON.stringify(payload.newTab.query) &&
            JSON.stringify(tabList[i].params) === JSON.stringify(payload.newTab.params)
          ) {
            return
          } else {
            //  参数不同，替换
            context.commit('setTabList', { tabList })
            tabList.splice(i, 1, payload.newTab)
            return
          }
        }
      }
      //  不存在，push
      tabList.push(payload.newTab)
      context.dispatch('setTabList', { tabList })
    },
    setTabList(
      context: { dispatch: Dispatch; commit: Commit },
      payload: { tabList: Array<CliTab> }
    ) {
      context.commit('setTabList', payload)
      //  持久化
      context.dispatch(
        'cli/db/set',
        {
          database: 'database',
          path: 'tabList',
          value: payload.tabList
        },
        { root: true }
      )
    },
    //  初始化标签
    async load(context: { dispatch: Dispatch; commit: Commit }) {
      const dbTabList: Array<CliTab> = await context.dispatch(
        'cli/db/get',
        { database: 'database', path: 'tabList', defaultValue: [] },
        { root: true }
      )
      // 应用
      context.commit('setTabList', { tabList: dbTabList })
    }
  }
}
