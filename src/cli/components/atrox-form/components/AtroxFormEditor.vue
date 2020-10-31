<!--
 * @description 表单中的富文本
 * @author wuy1fffff
 * @date 2020-10-09 10:42
 * @lastEditTime 2020-10-09 10:42
-->
<template>
  <v-input :value="$attrs.value" :rules="rules">
    <a-editor v-bind="$attrs" v-on="$listeners"></a-editor>
  </v-input>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { RuleFunction } from '../AtroxFormInterface'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'AtroxFormEditor' })
export default class AtroxFormEditor extends Vue {
  @Prop({ type: Array, default: () => [] }) rules!: RuleFunction[]
}
</script>
