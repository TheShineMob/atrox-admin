import { BaseField } from '@/config/cli-interface'

export interface Shyk extends BaseField {
  absencePersonReason?: string // 缺陷人员及原因
  actualAttendNum?: number // 实到人数
  content?: string // 内容
  meetingTime?: number // 会议时间
  meetingTitle?: string //  		会议名称
  organizationId?: string //  组织id
  organizationName?: string //  组织名称
  presenter?: string // 主持人
  shouldAttendNum?: number // 应到人数
  summary?: string // 简要总结
  type?: number //  会议类型 1-支部党员大会 2-党部支委会 3-党小组会 4-民主生活会 5-组织生活会 6-民主评议会
}
