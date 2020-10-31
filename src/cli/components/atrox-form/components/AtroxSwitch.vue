<!--
 * @description 选择封装
 * @author wuy1fffff
 * @date 2020-09-04 10:31
 * @lastEditTime 2020-09-04 10:31
-->
<template>
  <v-switch v-bind="$attrs" v-on="$listeners" @change="$listeners.input"></v-switch>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'AtroxSwitch' })
export default class AtroxSwitch extends Vue {}
</script>
