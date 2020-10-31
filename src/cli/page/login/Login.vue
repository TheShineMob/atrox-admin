<!--
 * @description 登陆页面
 * @author wuy1fffff
 * @date 2020-07-15 17:53
 * @lastEditTime 2020-07-15 17:53
-->
<template>
  <v-row
    class="fill-height login-page"
    align="center"
    justify="center"
    v-aloading="loading"
  >
    <v-col class="login-wrap">
      <v-card tile class="px-4 pb-8 login-card" elevation="8">
        <v-card-title class="headline font-weight-bold justify-center">{{
          $appTitle
        }}</v-card-title>
        <v-card-title class="headline font-weight-bold justify-center">{{
          $t('cli.login')
        }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <div class="font-weight-bold subtitle-2">
              {{ $t('username') }}
            </div>
            <v-text-field
              autofocus
              v-model="username"
              :rules="[v => !!v || $t('form.error.required', [$t('username')])]"
              :placeholder="$t('form.placeholder.enter', [$t('username')])"
              prepend-inner-icon="mdi-account-box-outline"
              @keyup.enter="handleLoginClick"
              class="pt-0"
            ></v-text-field>
            <div class="font-weight-bold subtitle-2">
              {{ $t('password') }}
            </div>
            <v-text-field
              v-model="password"
              :rules="[v => !!v || $t('form.error.required', [$t('password')])]"
              :placeholder="$t('form.placeholder.enter', [$t('password')])"
              prepend-inner-icon="mdi-lock-open-outline"
              type="password"
              class="pt-0"
              @keyup.enter="handleLoginClick"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            depressed
            rounded
            class="login-btn"
            color="primary"
            dark
            @click="handleLoginClick"
            >{{ $t('cli.login') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { BindingHelpers, namespace } from 'vuex-class/lib/bindings'
import { Ref } from 'vue-property-decorator'
import { INDEX_PAGE_NAME } from '@/cli/router/cli/cli-routes'
import { localeList } from '@/cli/i18n/locales/mixins'

const userStore: BindingHelpers = namespace('cli/user') //  vuex中的user模块
const localeStore: BindingHelpers = namespace('cli/locale')

@Component({ name: 'Login' })
export default class Login extends Vue {
  @Ref() readonly form!: any
  //  加载标志位
  loading = false
  //  语言列表
  localeList: string[] = localeList
  //  当前语言
  @localeStore.State('locale') locale!: string
  //  切换语言
  @localeStore.Action('changeLocale') changeLocale!: (payload: { locale: string }) => void
  //  用户登录
  @userStore.Action('login') login!: (payload: {
    username: string
    password: string
  }) => Promise<void>
  //  用户登出
  @userStore.Action('logout') logout!: () => Promise<void>

  username = ''
  password = ''

  handleLoginClick() {
    if (this.form.validate()) {
      const redirect: string | undefined = this.$route.query.redirect as string
      this.loading = true
      this.login({ username: this.username, password: this.password })
        .then(() => {
          // 重定向对象不存在则返回顶层路径
          if (redirect) {
            this.$router.replace(redirect)
          } else {
            this.$router.replace({
              name: INDEX_PAGE_NAME
            })
          }
        })
        .catch(e => {
          this.logout()
          this.$adialog({
            title: '登陆失败',
            message: e
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  flex: none;
  width: 450px;
}

.login-card {
  background: white;
  opacity: 0.85;
}
</style>
