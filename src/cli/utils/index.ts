/*
 * @Descripttion:
 * @version:
 * @Author: Mob@Hz
 * @Date: 2020-09-23 19:02:51
 * @LastEditors: Mob@Hz
 * @LastEditTime: 2020-10-28 15:18:36
 */
/**
 * @description 公共工具类
 * @author wuy1fffff
 * @date 2020-07-11 13:04
 * @lastEditTime 2020-07-11 13:04
 */

import { domUtils, DomUtils } from '@/cli/utils/dom-utils'
import { baseUtils, BaseUtils } from './base-utils'
import { cookieUtils, CookieUtils } from './cookie-utils'
import { dbUtils, DbUtils } from './db-utils'
import xeUtils from 'xe-utils'

interface CliUtils {
  //  dom或bom操作
  dom: DomUtils
  //  基础操作
  base: BaseUtils
  // cookie操作
  cookie: CookieUtils
  //  本地数据库操作
  db: DbUtils
  //  xeUtils
  xe: typeof xeUtils
}

const cliUtils: CliUtils = {
  dom: domUtils,
  base: baseUtils,
  cookie: cookieUtils,
  db: dbUtils,
  xe: xeUtils
}

export { cliUtils, CliUtils }
