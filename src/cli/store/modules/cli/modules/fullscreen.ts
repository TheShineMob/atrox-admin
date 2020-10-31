/**
 * @description fullscreen模块
 * @author wuy1fffff
 * @date 2020-07-11 14:47
 * @lastEditTime 2020-07-11 14:47
 */
import screenfull, { Screenfull } from 'screenfull'
import { Commit } from 'vuex'

export interface CliFullscreenStore {
  fullscreen: boolean //是否全屏
}
export default {
  namespaced: true,
  state: {
    fullscreen: false //  是否全屏
  },
  getters: {},
  mutations: {
    //  设置全屏
    setFullscreen(state: CliFullscreenStore, payload: { fullscreen: boolean }) {
      state.fullscreen = payload.fullscreen
    }
  },
  actions: {
    listen(context: { commit: Commit }) {
      //  是否支持使用全屏
      if (screenfull.isEnabled) {
        //  开始监听全屏事件
        screenfull.on('change', () => {
          if (!(screenfull as Screenfull).isFullscreen)
            context.commit('setFullscreen', { fullscreen: false })
        })
      }
    },

    //  点击全屏按钮
    async fullscreenToggle(context: { state: CliFullscreenStore; commit: Commit }) {
      //  已经全屏
      if ((screenfull as Screenfull).isFullscreen) {
        ;(screenfull as Screenfull).exit()
        context.commit('setFullscreen', { fullscreen: false })
      } else {
        ;(screenfull as Screenfull).request()
        context.commit('setFullscreen', { fullscreen: true })
      }
    }
  }
}
