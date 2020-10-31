module.exports = {
  root: true, //  指定当前为最终目录，不然将继续向上查找
  env: {
    //  eslint的环境，将开启对应的一组预配置
    node: true //  配置node的全局环境变量
  },
  extends: [
    //  继承一组规则
    'plugin:vue/essential',
    'eslint:recommended', //  eslint推荐规则
    '@vue/typescript/recommended',
    '@vue/prettier', //  pritter
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    //  指定想要支持的js版本。 =》 最新版
    ecmaVersion: 2020
  },
  rules: {
    //  详细规则
    //  console,debugger  等在打包时使用插件去除
    'no-console': 'off', //  console
    'no-debugger': 'off', //  debugger
    'default-case': 'error', //  switch中必须有default
    'block-scoped-var': 'error', //  强制把变量的使用限制在其定义的作用域范围内
    eqeqeq: 'error', //  必须使用全等于===
    'no-floating-decimal': 'error', //  禁止数字字面量中使用前导和末尾小数点
    'no-self-compare': 'error', //  禁止自我比较，无意义
    'no-throw-literal': 'error', //  禁止throw字符串
    'no-useless-concat': 'error', //  禁止不必要的字符串拼接
    'no-label-var': 'error', //  禁止同一作用域下标签与变量重名
    'no-use-before-define': 'error', //  禁止在变量定义前使用,
    '@typescript-eslint/no-explicit-any': 'off', //  禁止使用any
    '@typescript-eslint/no-non-null-assertion': 'error', //  不允许使用！非空断言
    "@typescript-eslint/camelcase": 'off', //  对象键值命名
    "@typescript-eslint/ban-ts-ignore": 'off',
    "@typescript-eslint/no-this-alias":'off'  //  this取别名
  }
}
