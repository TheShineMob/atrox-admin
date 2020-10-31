<!--
 * @description 首页
 * @author wuy1fffff
 * @date 2020-07-21 18:03
 * @lastEditTime 2020-07-21 18:03
-->
<template>
  <a-container>
    <template v-for="_top in menuList">
      <v-row v-if="_top.children && _top.children.length > 0" :key="_top.name">
        <v-col cols="12" class="py-0">
          <v-alert
            class="font-weight-bold title"
            color="primary"
            border="left"
            elevation="2"
            colored-border
          >
            <template #prepend>
              <v-icon v-text="_top.icon" color="primary" size="32"></v-icon
            ></template>
            <div class="pl-2">
              {{ _top.disName }}
            </div>
          </v-alert>
        </v-col>
        <v-col class="app-block" v-for="_second in _top.children" :key="_second.name">
          <v-hover #default="{ hover }">
            <v-card @click="handleMenuClick(_second)" :elevation="hover ? 4 : 2">
              <v-responsive :aspect-ratio="1">
                <div class="fill-height pa-4 d-flex align-center justify-center">
                  <div class="text-center">
                    <v-icon v-text="_second.icon" color="primary" size="48"></v-icon>
                    <div class="title font-weight-bold">
                      {{ _second.disName }}
                    </div>
                  </div>
                </div>
              </v-responsive>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </template>
  </a-container>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import HeaderMenuMixin from '@/cli/page/layout/components/menu/header/HeaderMenuMixin'

@Component({ name: 'Index' })
export default class Index extends mixins(HeaderMenuMixin) {
  test = ''
}
</script>

<style lang="scss" scoped>
.app-block {
  flex: none;
  width: 200px;
}
</style>
