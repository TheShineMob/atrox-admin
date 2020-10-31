/*
 * @Descripttion:
 * @version:
 * @Author: Mob@Hz
 * @Date: 2020-09-23 09:08:50
 * @LastEditors: Mob@Hz
 * @LastEditTime: 2020-10-10 13:48:52
 */
import { AtroxLocaleLang } from './mixins'

/**
 * @description 表单国际化
 * @author wuy1fffff
 * @date 2020-07-29 13:59
 * @lastEditTime 2020-07-29 13:59
 */

const form: AtroxLocaleLang = {
  error: {
    required: ['{0} is required!', '请填写{0}!'],
    chooseOne: ['Please choose one at least!', '请至少选择一个！'],
    fileSize: ['The file size cannot be greater than 10MB', '文件大小不能大于10MB!']
  },
  confirm: {
    delete: ['Delete?', '确认删除这些数据?']
  },
  placeholder: {
    enter: ['Please Enter {0}', '请输入{0}']
  }
}

export { form }
