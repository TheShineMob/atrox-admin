/**
 * @description 前端数据库
 * @author wuy1fffff
 * @date 2020-07-28 10:58
 * @lastEditTime 2020-07-28 10:58
 */
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import { cloneDeep } from 'lodash'

//  创建数据库再localstroage
const adapter = new LocalStorage(`atrox-${process.env.VUE_APP_VERSION}`)
const db = low(adapter)

//  初始化数据库
db.defaults({
  sys: {},
  database: {}
}).write()

interface DbUtils {
  //  设置一个值
  set: (database: string, path: string, value: string | Record<string, any>) => void
  //  得到一个值
  get: (
    database: string,
    path: string,
    defaultValue?: string | Record<string, any>
  ) => string | Record<string, any>
}

//  生成路径，根据数据库名和path，没有则创建
function pathInit(
  dbName = 'database',
  path = '',
  defaultValue: string | Record<string, any> = ''
) {
  //  拼装正确路径
  const currentPath = `${dbName}.${path ? `${path}` : ''}`
  //  尝试得到值
  const value = db.get(currentPath).value()
  //  不存在则初始化
  if (!(value !== undefined)) {
    db.set(currentPath, defaultValue).write()
  }
  return currentPath
}

const dbUtils: DbUtils = {
  //  设置一个值
  set: (database = 'database', path = '', value: string | Record<string, any> = '') => {
    db.set(pathInit(database, path), value).write()
  },
  //  得到一个值
  get: (database = 'database', path = '', defaultValue = '') => {
    return cloneDeep(db.get(pathInit(database, path, defaultValue)).value())
  }
}

export { dbUtils, DbUtils }
