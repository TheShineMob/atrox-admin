<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mob@Hz
 * @Date: 2020-10-13 17:51:04
 * @LastEditors: Mob@Hz
 * @LastEditTime: 2020-10-13 17:52:25
-->
<!--
 * @description 远程搜索
 * @author wuy1fffff
 * @date 2020-10-09 09:35
 * @lastEditTime 2020-10-09 09:35
-->
<template>
  <v-autocomplete
    ref="auto"
    v-bind="$attrs"
    v-on="$listeners"
    :items="lazyItems"
    :loading="loading"
    :search-input.sync="search"
    :disabled="$attrs.disabled"
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DataResponse } from '@/cli/api/atrox-axios/helper'
import { Prop, Watch } from 'vue-property-decorator'
import { get } from 'lodash'
import { Debounce } from 'lodash-decorators'

@Component({ name: 'AtroxAuto' })
export default class AtroxAuto extends Vue {
  @Prop({ type: Array, default: () => [] }) items!: Array<any>

  @Prop({ type: Function, default: null }) target!: (
    search: string
  ) => Promise<DataResponse>
  @Prop({ type: String, default: '' }) targetPath!: string

  lazyItems: Array<any> = []
  loading = false
  search = ''

  created() {
    this.lazyItems = this.items
  }

  @Debounce(500)
  @Watch('search')
  searchChange(val: string) {
    val && this.getItems(val)
  }

  getItems(val: string) {
    //  远程获取
    if (this.target) {
      this.loading = true
      this.target(val)
        .then(r => {
          this.lazyItems = get(r, this.targetPath)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

  setDefault(item: any) {
    this.lazyItems = [item]
  }
}
</script>
