// prettier 配置文件
module.exports = {
  printWidth: 90, //超过80个字符就换行
  tabWidth: 2,  //tab符宽度 2个空格
  tabs: true, //缩进使用tab符
  semi: false, // 是否在语句末尾要不要分号
  singleQuote: true, // 基本使用单引号而非双引号
  trailingComma: 'none',  //多行对象或数组时最后不带逗号
  bracketSpacing: true, // 对象空格 {foo:bar} to { foo: bar }
  arrowParens: 'avoid', // 箭头函数是否省略括号  (a)=> a to a=> a,
  jsxBrackets: true,  // 不把标签结尾>单独放一行
  vueIndentScriptAndStyle: false, //  缩进 vue文件中script和style
}
