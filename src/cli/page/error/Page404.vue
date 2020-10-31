<!--
 * @description 404界面
 * @author wuy1fffff
 * @date 2020-07-29 14:07
 * @lastEditTime 2020-07-29 14:07
-->
<template>
  <v-row class="fill-height flex-column error-404" align="center" justify="center">
    <div class="code-404 white--text">404</div>
    <p class="headline">{{ $t('cli.error.404') }}</p>
    <v-btn color="primary" depressed class="mt-4" @click="handleBackIndex">{{
      $t('action.back') + $t('index')
    }}</v-btn>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'Page404' })
export default class Page404 extends Vue {
  handleBackIndex() {
    this.$autil.dom.open('/index', '_self')
  }
}
</script>

<style lang="scss" scoped>
.error-404 {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../../../assets/images/error/404.png');
}

.code-404 {
  font-size: 16rem;
  line-height: 16rem;
  opacity: 0.7;
}
</style>
