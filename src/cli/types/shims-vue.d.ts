/**
 * @description vue的支持说明
 * @author wuy1fffff
 * @date 2020-07-11 13:17
 * @lastEditTime 2020-07-11 13:17
 */
import Vue from 'vue'

import { CliUtils } from '../utils'
import { AtroxDialog } from './atrox-dialog'
import { AtroxMessage } from './atrox-message'
import { CliConst } from '@/config/cli-constant'
import { CliApi } from '../api/interface'

declare module 'vue/types/vue' {
  interface Vue {
    $env: {
      NODE_ENV: 'development' | 'production'
      VUE_APP_LOCALE_ENABLE: string
    }
    $version: string
    $buildTime: string
    $autil: CliUtils
    $adialog: AtroxDialog
    $amessage: AtroxMessage
    $aconst: CliConst
    $aapi: CliApi
  }
}
