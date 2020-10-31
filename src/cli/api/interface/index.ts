import { isUndefined } from 'lodash'
import { Module } from 'vuex'
import { user } from './user'
//引入所有XXXApi.ts
const apiFile = require.context('@/views', true, /Api.ts$/)
const apis: Record<string, Module<any, any>> = {}
//得到所有Api文件名称
const apiFileNameList = apiFile.keys().map(value => {
  return value.match(/[a-zA-Z0-9_]{1,}Api/)?.map(fileName => fileName)[0]
})
//遍历所有Api文件
apiFile.keys().forEach((key, index) => {
  //得到Api对象
  if (!isUndefined(apiFileNameList[index])) {
    //@ts-ignore
    apis[apiFileNameList[index]] = apiFile(key).default
  }
})

const cliApi = {
  user,
  ...apis
}
type CliApi = {
  user: typeof user
  [key: string]: any
}

export { cliApi, CliApi }
