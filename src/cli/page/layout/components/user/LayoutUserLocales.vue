<!--
 * @description 切换语言
 * @author wuy1fffff
 * @date 2020-07-08 14:17
 * @lastEditTime 2020-07-08 14:17
-->
<template>
  <v-menu
    max-width="150"
    min-width="150"
    nudge-left="10"
    nudge-top="8"
    left
    offset-x
    :close-on-content-click="false"
    transition="slide-x-transition"
  >
    <!-- 触发插槽 -->
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-title>
          {{ $t('cli.header.language') }}
        </v-list-item-title>
        <v-list-item-action class="my-0">
          <v-icon size="18">mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
    <!-- 语言列表 -->
    <v-list dense nav class="px-2">
      <v-list-item
        v-for="_locale in localeList"
        :key="_locale"
        @click="changeLocale({ locale: _locale })"
      >
        <v-list-item-title>
          {{ $t(`cli.header.localeList.${_locale}`) }}
        </v-list-item-title>
        <v-list-item-action class="my-0">
          <v-icon size="18" v-if="locale === _locale">mdi-check</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { localeList } from '@/cli/i18n/locales/mixins'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'

const localeStore: BindingHelpers = namespace('cli/locale')

@Component({ name: 'LayoutUserLanguage' })
export default class LayoutUserLanguage extends Vue {
  //  语言列表
  localeList: string[] = localeList
  //  当前语言
  @localeStore.State('locale') locale!: string
  //  切换语言
  @localeStore.Action('changeLocale') changeLocale!: (payload: { locale: string }) => void
}
</script>
