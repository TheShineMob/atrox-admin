<!--
 * @description 在vuerouter中提供给Iframe菜单使用
 * @author wuy1fffff
 * @date 2020-07-20 14:05
 * @lastEditTime 2020-07-20 14:05
-->
<template>
  <a-iframe :src="$route.meta.url"></a-iframe>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'AtroxRouteIframe' })
export default class AtroxRouteIframe extends Vue {}
</script>
