<!--
 * @description 用户
 * @author wuy1fffff
 * @date 2020-07-08 13:25
 * @lastEditTime 2020-07-08 15:14
-->
<template>
  <v-menu
    max-width="180"
    min-width="150"
    left
    offset-y
    transition="auto-expand-transition"
    max-height="326px"
  >
    <!-- 触发插槽，显示用户名 -->
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" text>
        <div class="user-name">
          {{ info.name || $t('cli.header.notLog') }}
        </div>
        <v-icon size="18"> mdi-menu-down </v-icon>
      </v-btn>
    </template>
    <!-- 操作list -->
    <v-list dense nav class="px-2">
      <!-- 语言 -->
      <layout-user-locales v-if="$env.VUE_APP_LOCALE_ENABLE !== 'false'" />
      <!-- 颜色 -->
      <layout-user-colors />
      <!-- 主题 -->
      <layout-user-themes />
      <v-divider class="mb-1"></v-divider>
      <!-- 文档，仅开发环境 -->
      <layout-user-doc />
      <!-- 关于我们 -->
      <layout-user-about />
      <!-- 重新加载菜单 -->
      <layout-user-menu />
      <v-divider class="mb-1"></v-divider>
      <!-- 退出登陆 -->
      <layout-user-logout @click:logout="handleLogout" />
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import LayoutUserLocales from '@/cli/page/layout/components/user/LayoutUserLocales.vue'
import LayoutUserColors from '@/cli/page/layout/components/user/LayoutUserColors.vue'
import LayoutUserThemes from '@/cli/page/layout/components/user/LayoutUserThemes.vue'
import LayoutUserDoc from '@/cli/page/layout/components/user/LayoutUserDoc.vue'
import LayoutUserAbout from '@/cli/page/layout/components/user/LayoutUserAbout.vue'
import LayoutUserLogout from '@/cli/page/layout/components/user/LayoutUserLogout.vue'
import LayoutUserMenu from '@/cli/page/layout/components/user/LayoutUserMenu.vue'

const userStore: BindingHelpers = namespace('cli/user')

@Component({
  name: 'LayoutUser',
  components: {
    LayoutUserLocales,
    LayoutUserColors,
    LayoutUserThemes,
    LayoutUserDoc,
    LayoutUserAbout,
    LayoutUserLogout,
    LayoutUserMenu
  }
})
export default class LayoutUser extends Vue {
  //用户信息
  @userStore.State('info') info!: Record<string, string>
  //  退出登录
  @userStore.Action('logout') logout!: (payload: {
    confirm: boolean
    logout: true
  }) => void

  handleLogout() {
    this.logout({ confirm: true, logout: true })
  }
}
</script>

<style lang="scss" scoped>
.user-name {
  @extend %overfloew-ellipsis;

  max-width: 120px;
}

::v-deep.v-menu__content {
  overflow-y: hidden;
}
</style>
