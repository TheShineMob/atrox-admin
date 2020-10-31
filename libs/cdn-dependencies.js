//  cdn节点配置，使用es5语法导入导出
const cdnList = [
  {
    name: 'axios',
    library: 'axios',
    js: 'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
    css: ''
  },
  {
    name: 'babel-polyfill',
    library: 'BabelPolyfill',
    js: 'https://cdn.jsdelivr.net/npm/babel-polyfill@6.26.0/browser.js',
    css: ''
  },
  {
    name: 'better-scroll',
    library: 'BScroll',
    js: 'https://cdn.jsdelivr.net/npm/better-scroll@1.15.2/dist/bscroll.min.js',
    css: ''
  },
  {
    name: 'dayjs',
    library: 'dayjs',
    js: 'https://cdn.jsdelivr.net/npm/dayjs@1.8.17/dayjs.min.js',
    css: ''
  },
  {
    name: 'js-cookie',
    library: 'Cookies',
    js: 'https://cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js',
    css: ''
  },
  {
    name: 'js-shortid',
    library: 'shortid',
    js: 'https://cdn.jsdelivr.net/npm/js-shortid@0.1.1/lib/js-shortid.min.js',
    css: ''
  },
  {
    name: 'lodash',
    library: '_',
    js: 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js',
    css: ''
  },
  {
    name: 'lowdb',
    library: 'low',
    js: 'https://cdn.jsdelivr.net/npm/lowdb@1.0.0/dist/low.min.js',
    css: ''
  },
  {
    name: 'lowdb/adapters/LocalStorage',
    library: 'LocalStorage',
    js: 'https://cdn.jsdelivr.net/npm/lowdb@1.0.0/dist/LocalStorage.min.js',
    css: ''
  },
  {
    name: 'nprogress',
    library: 'NProgress',
    js: 'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    css: 'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.css'
  },
  {
    name: 'screenfull',
    library: 'screenfull',
    js: 'https://cdn.jsdelivr.net/npm/screenfull@5.0.2/dist/screenfull.min.js',
    css: ''
  },
  {
    name: 'vue',
    library: 'Vue',
    js: 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    css: ''
  },
  {
    name: 'Component',
    library: 'vue-class-component',
    js:
      'https://cdn.jsdelivr.net/npm/vue-class-component@7.2.3/dist/vue-class-component.min.js',
    css: ''
  },
  {
    name: 'vue-i18n',
    library: 'VueI18n',
    js: 'https://cdn.jsdelivr.net/npm/vue-i18n@8.15.1/dist/vue-i18n.min.js',
    css: ''
  },
  {
    name: 'vue-property-decorator',
    library: 'VuePropertyDecorator',
    js:
      'https://cdn.jsdelivr.net/npm/vue-property-decorator@9.0.0/lib/vue-property-decorator.umd.js',
    css: ''
  },
  {
    name: 'vue-router',
    library: 'VueRouter',
    js: 'https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    css: ''
  },
  {
    name: 'vuetify',
    library: 'Vuetify',
    js: 'https://cdn.jsdelivr.net/npm/vuetify@2.3.4/dist/vuetify.min.js',
    css: 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css'
  },
  {
    name: 'vuex',
    library: 'Vuex',
    js: 'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
    css: ''
  },
  {
    name: 'vuex-class',
    library: 'VuexClass',
    js: 'https://cdn.jsdelivr.net/npm/vuex-class@0.3.2/dist/vuex-class.min.js',
    css: ''
  },
  {
    name: 'draggable',
    library: 'vuedraggable',
    js: 'https://cdn.jsdelivr.net/npm/vuedraggable@2.23.2/dist/vuedraggable.umd.min.js',
    css: ''
  }
  // {
  //   name: '',
  //   library: '',
  //   js: '',
  //   css: ''
  // },
]

//需要持续加载的css列表
const alwaysCssCdnList = [
  'https://cdn.jsdelivr.net/npm/@mdi/font@5.3.45/css/materialdesignicons.min.css',
  'https://cdn.jsdelivr.net/npm/vue2-animate@2.1.3/dist/vue2-animate.min.css'
]
//  cdn需要加载的js与css
const cdn = {
  css: cdnList
    .map(_cdnDependency => _cdnDependency.css)
    .filter(_cdnDependencyCss => _cdnDependencyCss),
  js: cdnList
    .map(_cdnDependency => _cdnDependency.js)
    .filter(_cdnDependencyJs => _cdnDependencyJs)
}
//  webpack需要排除的bundle中的依赖
const externals = {}

cdnList.forEach(_cdnDependency => {
  externals[_cdnDependency.name] = _cdnDependency.library
})

module.exports = {
  cdn,
  externals,
  alwaysCssCdnList
}
