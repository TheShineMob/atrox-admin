import Vue from 'vue'
import 'xe-utils'
import VXETable, { FormatsParams } from 'vxe-table'
import 'vxe-table/lib/index.css'
import AtroxCrud from './AtroxCrud'
import dayjs from 'dayjs'

Vue.use(VXETable)

// 自定义全局的格式化处理函数
VXETable.formats.mixin({
  //    格式化日期
  time(data: FormatsParams, format = 'YYYY-MM-DD HH:mm') {
    return data.cellValue ? dayjs(data.cellValue).format(format) : '-'
  },
  //    数字枚举
  numberEnum(data: FormatsParams, enumArr: string[]) {
    return data.cellValue === undefined ? '' : enumArr[data.cellValue]
  },
  //    boolean枚举
  booleanEnum(data: FormatsParams, enumArr: string[] = ['否', '是']) {
    return data.cellValue === undefined ? '' : enumArr[data.cellValue ? 1 : 0]
  }
})

export default AtroxCrud
