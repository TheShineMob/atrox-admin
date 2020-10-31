<!--
 * @description 基本布局
 * @author wuy1fffff
 * @date 2020-07-07 10:48
 * @lastEditTime 2020-07-08 15:14
-->
<template>
  <!-- 容器 -->
  <div class="atrox-container" :style="containerStyle">
    <!-- 遮罩层 -->
    <div class="atrox-container-mask"></div>
    <!-- 主题 -->
    <div class="atrox-body">
      <!-- 上部 -->
      <div class="atrox-body-main">
        <!-- 左边，包括logo和菜单 -->
        <div
          class="atrox-body-main-left"
          :class="{ 'atrox-body-main-left__trans': asideCollapseTransition }"
          :style="{ width: asideCollapse ? menuWidthCollapse : menuWidth }"
        >
          <!-- logo -->
          <router-link class="atrox-logo" to="/" tag="div">
            {{ asideCollapse ? $appTitle[0] : $appTitle }}
          </router-link>
          <!-- 菜单 -->
          <div class="atrox-menu">
            <layout-aside-menu />
          </div>
        </div>
        <!-- 右边，包括头和内容层 -->
        <div class="atrox-body-main-right">
          <!-- 头部 -->
          <div class="atrox-header">
            <!-- 切换左边边状态 -->
            <v-btn text @click="asideCollapseToggle">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <!-- 头部右边，包括头部菜单和操作 -->
            <div class="atrox-header-right">
              <!-- 头部菜单 -->
              <div class="atorx-header-menu"></div>
              <layout-header-menu />
              <div class="spacer"></div>
              <!-- 头部操作 -->
              <div class="atorx-header-options">
                <layout-fullscreen />
                <layout-user />
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="atrox-content">
            <div class="atrox-content-header">
              <layout-tabs />
            </div>
            <div class="atrox-content-body">
              <transition name="fade">
                <keep-alive :include="cacheList">
                  <router-view />
                </keep-alive>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="atrox-body-footer caption">
        上次更新时间：{{ $buildTime }} 版本：{{ $version }} - 未来未来
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import LayoutHeaderMenu from '@/cli/page/layout/components/menu/header/LayoutHeaderMenu.vue'
import LayoutAsideMenu from '@/cli/page/layout/components/menu/aside/LayoutAsideMenu.vue'
import LayoutUser from '@/cli/page/layout/components/user/LayoutUser.vue'
import LayoutFullscreen from '@/cli/page/layout/components/LayoutFullscreen.vue'
import LayoutTabs from '@/cli/page/layout/components/tabs/LayoutTabs.vue'
import { AtroxTheme } from '@/config/cli-config'
import { CliTab } from '@/cli/store/modules/cli/modules/tab'
import { INDEX_PAGE_NAME } from '@/cli/router/cli/cli-routes'

const menuStore: BindingHelpers = namespace('cli/menu') //  vuex中的menu模块
const themeStore: BindingHelpers = namespace('cli/theme') //  vuex中的Theme模块
const tabStore: BindingHelpers = namespace('cli/tab') //  vuex中的tab模块

@Component({
  name: 'Layout',
  components: {
    LayoutUser,
    LayoutFullscreen,
    LayoutHeaderMenu,
    LayoutAsideMenu,
    LayoutTabs
  }
})
export default class Layout extends Vue {
  //  侧边栏是否收缩
  @menuStore.State('asideCollapse') asideCollapse!: boolean
  //  是否开启侧边栏收缩动画
  @menuStore.State('asideCollapseTransition') asideCollapseTransition!: boolean
  //  标签列表
  @tabStore.State('tabList') tabList!: Array<CliTab>
  //  当前主题
  @themeStore.State('theme')
  theme!: AtroxTheme
  //  切换侧边栏状态
  @menuStore.Action('asideCollapseToggle') asideCollapseToggle!: () => void
  //  logo
  logo: string = require('@/assets/logo.png')
  //  正常情况菜单栏宽度
  menuWidth = '232px'
  //  收缩时菜单栏宽度
  menuWidthCollapse = '0px'

  get containerStyle(): Record<string, string> {
    const resStyle: Record<string, string> = {}
    if (Object.prototype.hasOwnProperty.call(this.theme, 'bg')) {
      resStyle.backgroundImage = `url('/${this.theme.bg}')`
    }
    return resStyle
  }

  get cacheList() {
    return [
      INDEX_PAGE_NAME,
      ...(this.tabList.length
        ? this.tabList.map(_tab => {
            return _tab.name
          })
        : [])
    ]
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/styles/theme/register.scss';
</style>
