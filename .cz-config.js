'use strict'
//git-cz配置文件
module.exports = {
  types: [
    //  经常使用
    { value: 'feat',      name: '特性:    一个新的特性' },
    { value: 'fix',       name: '修复:    修复一个Bug' },
    { value: 'change',    name: '变更:    变更一个需求' },
    //  不经常使用
    { value: 'doc',       name: '文档:    变更的只有文档' },
    { value: 'style',     name: '格式:    空格, 分号等格式修复' },
    { value: 'refactor',  name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: 'perf',      name: '性能:    提升性能' },
    { value: 'test',      name: '测试:    添加一个测试' },
    { value: 'chore',     name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: 'revert',    name: '回滚:    代码回退' }
  ],
  messages: {
    type: '本次提交类型:',
    // scope: '选择一个scope (可选):',
    customScope: '涉及范围:',
    subject: '说明:\n',
    // body: '长说明，使用"|"换行(可选)：\n',
    // breaking: '非兼容性说明 (可选):\n',
    // footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交?'
  },
  skipQuestions: ['body', 'footer'],
  allowCustomScopes: true,
  // allowBreakingChanges: ['特性', '修复'],
  // limit subject length
  subjectLimit: 100
}
