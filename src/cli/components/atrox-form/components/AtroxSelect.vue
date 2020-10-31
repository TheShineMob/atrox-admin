<!--
 * @description 
 * @author wuy1fffff
 * @date 2020-09-02 16:21
 * @lastEditTime 2020-09-02 16:21
-->
<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :items="lazyItems"
    :loading="loading"
    :disabled="loading || $attrs.disabled"
  ></v-select>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { get } from 'lodash'

@Component({ name: 'AtroxSelect' })
export default class AtroxSelect extends Vue {
  @Prop({ type: Array, default: () => [] }) items!: Array<any>

  @Prop({ type: Promise, default: null }) target!: Promise<DataResponse>
  @Prop({ type: String, default: '' }) targetPath!: string

  lazyItems: Array<any> = []
  loading = false

  created() {
    this.lazyItems = this.items
    //  远程获取
    if (this.target) {
      this.loading = true
      this.target
        .then(r => {
          this.lazyItems = get(r, this.targetPath)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
