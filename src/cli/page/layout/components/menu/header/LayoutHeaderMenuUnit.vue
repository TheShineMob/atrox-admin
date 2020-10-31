<!--
 * @description 顶部菜单一个单元
 * @author wuy1fffff
 * @date 2020-07-14 15:06
 * @lastEditTime 2020-07-14 15:06
-->
<template>
  <v-menu
    offset-y
    transition="auto-expand-transition"
    :max-height="menu.children.length * 36 + 32"
  >
    <template v-slot:activator="{ on }">
      <!-- 当前父菜单 -->
      <v-btn
        v-on="on"
        text
        :class="{
          'atrox-active': activeAsideMenu && menu.id === activeAsideMenu.parentId
        }"
      >
        <v-icon size="18">{{ menu.icon }}</v-icon>
        <div>
          {{ menu.disName }}
        </div>
        <v-icon size="18"> mdi-menu-down </v-icon>
      </v-btn>
    </template>
    <v-sheet class="pa-4">
      <!-- 子菜单列表 -->
      <v-btn
        text
        block
        v-for="_childMenu in menu.children"
        :key="_childMenu.id"
        @click="handleMenuClick(_childMenu)"
        :class="{
          'atrox-active': activeAsideMenu && _childMenu.id === activeAsideMenu.id
        }"
      >
        <v-icon size="18" class="pr-2">{{ _childMenu.icon }}</v-icon>
        <div>
          {{ _childMenu.disName }}
        </div>
      </v-btn>
    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import { CliRoute } from '@/cli/router/cli/adapter'

@Component({ name: 'LayoutHeaderMenuUnit' })
export default class LayoutHeaderMenuUnit extends Vue {
  @Prop({ type: Object, default: () => ({}) }) menu!: CliRoute //  这个单元父菜单
  @Prop({ type: Object, default: () => ({}) }) activeAsideMenu!: CliRoute //  这个单元父菜单

  @Emit('click:menu')
  handleMenuClick(menu: CliRoute) {
    return menu
  }
}
</script>

<style lang="scss" scoped>
::v-deep.v-sheet {
  .v-btn {
    display: block;

    .v-btn__content {
      justify-content: start;
      min-width: 118px;

      & div {
        @extend %transition-all;
        @extend %overfloew-ellipsis;
      }
    }

    &:hover .v-btn__content {
      color: $color-primary;
    }
  }
}

.atrox-active {
  &.v-btn::before {
    background-color: $color-primary;
    opacity: 0.18;
  }
}

::v-deep.v-menu__content {
  overflow-y: hidden;
}
</style>
