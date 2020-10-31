<!--
 * @description 布局顶部标签页
 * @author wuy1fffff
 * @date 2020-07-20 16:47
 * @lastEditTime 2020-07-20 16:47
-->
<template>
  <div class="d-flex">
    <v-chip outlined class="mr-0 close-tab" @click="closeAll"
      ><v-icon size="18">mdi-close-circle-outline</v-icon></v-chip
    >
    <div style="width: calc(100% - 43px);">
      <v-chip-group show-arrows :value="$route.name" mandatory>
        <v-chip
          :ripple="false"
          label
          outlined
          :value="INDEX_PAGE_NAME"
          @click="handleClickTab({ name: INDEX_PAGE_NAME })"
        >
          {{ $t('index') }}
        </v-chip>
        <draggable @start="drag = true" @end="drag = false" :animation="300">
          <v-chip
            :ripple="false"
            v-for="tab in tabList"
            :key="tab.id"
            :value="tab.name"
            label
            close
            outlined
            close-icon="mdi-close-circle-outline"
            @click.middle="handleCloseTab(tab)"
            @click="handleClickTab(tab)"
            @click:close="handleCloseTab(tab)"
          >
            {{ tab.disName }}
          </v-chip>
        </draggable>
      </v-chip-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import draggable from 'vuedraggable'
import { Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import { CliTab } from '@/cli/store/modules/cli/modules/tab'
import { INDEX_PAGE_NAME } from '@/cli/router/cli/cli-routes'

const tabSotre: BindingHelpers = namespace('cli/tab')

@Component({ name: 'LayoutTabs', components: { draggable } })
export default class LayoutTabs extends Vue {
  drag = false
  @tabSotre.State('tabList') tabList!: Array<CliTab>
  @tabSotre.Action('setTabList') setTabList!: (payload: {
    tabList: Array<CliTab>
  }) => void
  @tabSotre.Action('addTab') addTab!: (payload: { newTab: CliTab }) => void

  INDEX_PAGE_NAME: string = INDEX_PAGE_NAME

  handleClickTab(tab: CliTab) {
    if (tab.name !== this.$route.name) {
      this.$router.push({
        name: tab.name,
        query: tab.query,
        params: tab.params
      })
    }
  }

  handleCloseTab(tab: CliTab): void {
    if (tab.name === INDEX_PAGE_NAME) return
    const res = this.tabList.filter(_tab => _tab.name !== tab.name)
    if (res.length === 0) {
      this.$router.push({
        name: INDEX_PAGE_NAME
      })
    } else {
      if (tab.name === this.$route.name) {
        this.handleClickTab(this.tabList[this.getNextRoute(tab)])
      }
    }
    this.setTabList({ tabList: res })
  }

  getNextRoute(tab: CliTab): number {
    if (tab.name === this.tabList[this.tabList.length - 1].name) {
      return this.tabList.length - 2
    } else {
      let index = 0
      for (; index < this.tabList.length; index++) {
        if (tab.name === this.tabList[index].name) break
      }
      return index + 1
    }
  }

  @Watch('$route')
  routeChange(newRoute: Route) {
    if (newRoute.name === INDEX_PAGE_NAME) return
    const newTab: CliTab = {
      ...newRoute.meta,
      query: newRoute.query,
      parmas: newRoute.params
    }
    this.addTab({ newTab })
  }

  closeAll() {
    this.$adialog.cancel('确定关闭所有页面?').then(() => {
      this.setTabList({ tabList: [] })
      this.$router.push({
        name: INDEX_PAGE_NAME
      })
    })
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-chip__content {
  & .v-icon {
    transition: none;
  }
}

.close-tab {
  @extend %unable-select;

  border-right: none !important;
  border-left: none !important;
}
</style>
