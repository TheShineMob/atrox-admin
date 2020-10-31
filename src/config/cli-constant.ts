/**
 * @description 常用常量
 * @author wuy1fffff
 * @date 2020-07-30 15:21
 * @lastEditTime 2020-07-30 15:21
 */

interface CliConst {
  timestamp: {
    second: number
    min: number
    hour: number
    day: number
  }
  noop: () => void
  //  投票地址前缀
  voteUrl: string
  //  文件地址前缀
  fileUrl: string
}

const second = 1000
const min: number = second * 60
const hour: number = min * 60
const day: number = hour * 24

const cliConst: CliConst = {
  timestamp: {
    second,
    min,
    hour,
    day
  },
  noop: function() {
    //空方法
  },
  voteUrl: 'http://front.biru.cintsoft.com/#/life/review/vote?id=',
  // voteUrl: 'http://192.168.124.7:10505/#/life/review/vote?id=',
  fileUrl: 'file'
}

export { cliConst, CliConst }
