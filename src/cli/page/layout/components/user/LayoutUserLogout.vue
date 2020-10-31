<!--
 * @description 退出登陆
 * @author wuy1fffff
 * @date 2020-07-11 12:48
 * @lastEditTime 2020-07-11 12:48
-->
<template>
  <v-list-item @click="handleClickLogout">
    <v-list-item-title>
      {{ $t('cli.header.logout') }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator'

@Component({ name: 'LayoutUserLogout' })
export default class LayoutUserLogout extends Vue {
  @Emit('click:logout')
  handleClickLogout() {
    //  点击退出
  }
}
</script>
