<!--
 * @description 侧边子组菜单
 * @author wuy1fffff
 * @date 2020-07-16 18:02
 * @lastEditTime 2020-07-16 18:02
-->
<template>
  <!-- 嵌套调用，解决无法激活第二层菜单bug -->
  <layout-aside-menu-group :menu="menu" subGroup />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import LayoutAsideMenuGroup from '@/cli/page/layout/components/menu/aside/group/LayoutAsideMenuGroup.vue'
import { CliRoute } from '@/cli/router/cli/adapter'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'LayoutAsideMenuSubGroup',
  components: { LayoutAsideMenuGroup }
})
export default class LayoutAsideMenuSubGroup extends Vue {
  @Prop({ type: Object }) menu!: CliRoute //  需展示菜单
}
</script>

<style lang="scss" scoped></style>
