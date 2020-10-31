<!--
 * @description 关于我们
 * @author wuy1fffff
 * @date 2020-07-11 12:46
 * @lastEditTime 2020-07-11 12:46
-->
<template>
  <v-list-item @click="$autil.dom.open('http://cintsoft.com/')">
    <v-list-item-title>
      {{ $t('cli.header.about') }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'LayoutUserAbout' })
export default class LayoutUserAbout extends Vue {}
</script>
