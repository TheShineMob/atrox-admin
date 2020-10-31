/*
 * @Descripttion: entity 生成器
 * @version: 
 * @Author: Mob@Hz
 * @Date: 2020-10-15 17:51:28
 * @LastEditors: Mob@Hz
 * @LastEditTime: 2020-10-30 10:20:30
 */
import fs from 'fs'
import path from 'path'
import { config } from './config'

//  路径
const modulePath = 'manage/point'
//  模块名
const moduleName = 'Point'
//用到什么类型就写一下类型映射
const fieldType: { [key: string]: string } = {
  "string": 'string',
  "integer": 'number',
  "number": 'number'
}
//  对象 需要手动删除注释中的空格，以及删掉诸如exapmle:false 等
const entity = `
bfje	number($bigdecimal)
补发金额

createBy	string
创建者

createTime	integer($int64)
创建时间

deleted	integer($int32)
是否有效0-未删除1-已删除

df	number($bigdecimal)
电费

dwdkxj	number($bigdecimal)
单位代扣小计

dwmc	string
单位名称

dzzxlfd	number($bigdecimal)
大中专学历浮动

dzzxlgd	number($bigdecimal)
大中专学历固定

extra	string
额外信息

fzf	number($bigdecimal)
房租费

ggblgz	number($bigdecimal)
工改保留工资

ggbljt	number($bigdecimal)
工改保留津贴

glzs	number($bigdecimal)
工龄折算

gtgz	number($bigdecimal)
高套工资

gwgz	number($bigdecimal)
岗位工资

gzlbmc	string
工资类别名称

id	string
id

jbgz	number($bigdecimal)
级别工资

jbgzxj	number($bigdecimal)
基本工资小计

jhgz	number($bigdecimal)
教、护10％工资

jsdjgz	number($bigdecimal)
技术等级工资

jtbt	number($bigdecimal)
津贴补贴

jxjt	number($bigdecimal)
警衔津贴

kfgz	number($bigdecimal)
扣发工资

kjfdk	number($bigdecimal)
扣建房贷款

kjzk	number($bigdecimal)
扣借支款

mybt	number($bigdecimal)
煤油补贴

nd	integer($int32)
年度

nlsyxkjryfd	number($bigdecimal)
农林水一线科技人员浮动

nlsyxkjrygd	number($bigdecimal)
农林水一线科技人员固定

nscmc	string
内设处（科）室名称

qnjwf	number($bigdecimal)
取暖、降温费

qtbt	number($bigdecimal)
其他补贴

qtkk	number($bigdecimal)
其他扣款

sds	number($bigdecimal)
所得税

sf	number($bigdecimal)
水费

sfgz	number($bigdecimal)
实发工资

sfzh	string
身份证号

ssgyjlgz	number($bigdecimal)
十三个月奖励工资

sybx	number($bigdecimal)
失业保险

tshybljt	number($bigdecimal)
特殊行业保留津贴

updateBy	string
更新者

updateTime	integer($int64)
更新时间

version	integer($int32)
版本

weight	integer($int32)
权重

wnfd	number($bigdecimal)
五年浮动

xjgz	number($bigdecimal)
薪级工资

xm	string
姓名

xztsjt	number($bigdecimal)
西藏特殊津贴

yanglaobx	number($bigdecimal)
养老保险

yf	integer($int32)
月份

yfgz	number($bigdecimal)
应发工资

yiliaobx	number($bigdecimal)
医疗保险

yxdsssf	number($bigdecimal)
有线电视收视费

yzgz	number($bigdecimal)
援藏工资

zfbt	number($bigdecimal)
住房补贴

zfgjj	number($bigdecimal)
住房公积金

zwgz	number($bigdecimal)
职务工资

zynj	number($bigdecimal)
职业年金

zzgzgdA	number($bigdecimal)
在藏工作20（15）年固定

zzgzgdB	number($bigdecimal)
在藏工作40（30）年固定


`

function getFilePath(): string {
  return path.join(config.basePath, modulePath, `${moduleName}Entity.ts`)
}

function arrToContent(arr: string[]): string {
  return arr.join('\r\n')
}

function StringToMap(text: string) {
  const arr = text.split(/\n/).filter(value => value !== '')
  const map = new Map()
  arr.forEach((value, index) => {
    if (value.split(/\s+/).length >= 2) {
      if (arr[index + 1].split(/\s+/).length < 2) {
        console.log(value.split(/\s+/)[1].split(/\(/)[0])
        map.set(value.split(/\s+/)[0], {
          type: fieldType[value.split(/\s+/)[1].split(/\(/)[0]],
          comment: arr[index + 1]
        })
      } else {
        map.set(value.split(/\s+/)[0], {
          type: fieldType[value.split(/\s+/)[1]],
          comment: ''
        })
      }
    }
  })
  console.log(map)
  return map
}

function resolveObject(entity: string, name: string, res: string[]) {
  res.push('')
  res.push(`export interface ${name} extends BaseField {`)
  //将模板字符串转化为map
  const entityMap = StringToMap(entity)
  //  遍历key值
  entityMap.forEach((value: any, key: string) => {
    //  是否需要继承
    if (config.baseFields.indexOf(key) === -1) {
      //  不是对象
      res.push(`  ${key}?: ${value.type} //${value.comment}`)
    }
  })
  res.push('}')
}
function resolveColumns(entity: string, res: string[]) {
  res.push('/*')
  res.push(`{ \r\n type: 'checkbox',\r\n width: 40, \r\n fixed: 'left'  \r\n},`)
  //遍历key值
  const entityMap = StringToMap(entity)
  //遍历key值
  entityMap.forEach((value: any, key: string) => {
    //如果不是对象
    res.push(`{\r\n field: '${key}',\r\n title: '${value.comment}',\r\n minWidth: 100\r\n},`)
  })
  res.push('*/')
}

// function resolveObject(Object: Record<string, any>, name: string, res: string[]) {
//   res.push('')
//   res.push(`export interface ${name} extends BaseField {`)
//   const next: NextObject[] = []
//   //  遍历key值
//   for (const key in Object) {
//     //  是否需要继承
//     if (config.baseFields.indexOf(key) === -1) {
//       //  得到值
//       const val = Object[key]
//       const type = typeof val
//       //  不是对象
//       if (type !== 'object') res.push(`  ${key}?: ${type} //`)
//       else {
//         //  是数组
//         const nextName = upperFirst(camelCase(key))
//         if (Array.isArray(val) && val[0]) {
//           const secondType = typeof val[0]
//           if (secondType === 'object') {
//             res.push(`  ${key}?: ${nextName}[]  //`)
//             next.push({
//               name: nextName,
//               obj: val[0]
//             })
//           } else {
//             res.push(`  ${key}?: ${secondType}[]  //`)
//           }
//         } else {
//           res.push(`  ${key}?: ${nextName}  //`)
//           next.push({
//             name: nextName,
//             obj: val
//           })
//         }
//       }
//     }
//   }
//   res.push('}')
//   next.forEach(_next => {
//     resolveObject(_next.obj, _next.name, res)
//   })
// }
// function resolveColumns(Object: Record<string, any>, name: string, res: string[]) {
//   res.push('/*')
//   res.push(`{ \r\n type: 'checkbox',\r\n width: 40, \r\nfixed: 'left'  \r\n},`)
//   //遍历key值
//   for (const key in Object) {
//     const val = Object[key]
//     const type = typeof val
//     //如果不是对象
//     if (type !== 'object' && !Array.isArray(val)) {
//       res.push(`{\r\n field: '${key}',\r\n title: '${key}'\r\n},`)
//     }
//   }
//   res.push('*/')
// }

function startResolveEntity(): string[] {
  const res: string[] = []
  res.push("import { BaseField } from '@/config/cli-interface'")
  resolveObject(entity, moduleName, res)
  resolveColumns(entity, res)
  console.log(res)
  return res
}

function genEntity() {
  if (fs.existsSync(getFilePath())) {
    console.log('已存在')
  } else {
    console.log('不存在')
    const path = getFilePath()

    //  创建文件夹
    fs.mkdirSync(path.substring(0, path.lastIndexOf('\\')))
    fs.writeFileSync(path, arrToContent(startResolveEntity()))
  }
}

genEntity()
