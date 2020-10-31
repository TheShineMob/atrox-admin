<!--
 * @description 文档
 * @author wuy1fffff
 * @date 2020-07-11 12:44
 * @lastEditTime 2020-07-11 12:44
-->
<template>
  <!-- 仅开发环境显示 -->
  <v-list-item
    v-if="$env.NODE_ENV === 'development'"
    @click="$autil.dom.open('http://atrox.cintsoft.com/atrox-admin/')"
  >
    <v-list-item-title>
      {{ $t('cli.header.doc') }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'LayoutUserDoc' })
export default class LayoutUserDoc extends Vue {}
</script>
