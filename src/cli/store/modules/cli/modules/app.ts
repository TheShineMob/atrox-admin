/**
 * @description 应用全局设置
 * @author wuy1fffff
 * @date 2020-07-20 16:25
 * @lastEditTime 2020-07-20 16:25
 */

export interface CliAppStore {
  grayActive: boolean //  是否全屏灰色
  loadingActive: boolean //  是否全屏加载
}

export default {
  namespaced: true,
  state: {
    grayActive: false,
    loadingActive: false
  },
  getters: {},
  mutations: {
    //    设置是否启用灰色
    setGrayActive(state: CliAppStore, payload: { grayActive: boolean }) {
      state.grayActive = payload.grayActive
    },
    //  设置全屏加载
    setLoadingActive(state: CliAppStore, payload: { loadingActive: boolean }) {
      state.loadingActive = payload.loadingActive
    }
  },
  actions: {}
}
