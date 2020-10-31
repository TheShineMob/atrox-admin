const { cdn, externals, alwaysCssCdnList } = require('./libs/cdn-dependencies.js') //  引入webpack需要排除的依赖与index中需要加载的cdn资源
const { set, each } = require('lodash') //  https://www.lodashjs.com/
const CompressionWebpackPlugin = require('compression-webpack-plugin') //  gzip压缩插件
const TerserWebpackPlugin = require('terser-webpack-plugin') //  压缩代码
const ThemeColorReplacer = require('webpack-theme-color-replacer') //  主题色
const FileManagerPlugin = require('filemanager-webpack-plugin') //  管理打包后文件
const HappyPack = require('happypack') //  多线程打包
const os = require('os') //  node系统操作模块
const happyThreadPool = HappyPack.ThreadPool({ size: Math.min(os.cpus().length, 4) }) //获得可用核数量创建线程池
const isProd = process.env.NODE_ENV === 'production'
//  写入主题颜色
const fs = require('fs') // node操作文件
let color = fs
  .readFileSync('./src/assets/styles/unit/color.scss', 'utf8')
  .split(/\r\n|\n|\r/gm)
if (color[0].startsWith('$color-primary:')) color.shift()
color.unshift(`$color-primary: ${process.env.VUE_APP_PRIMARY_COLOR};`)
fs.writeFileSync('./src/assets/styles/unit/color.scss', color.join('\r\n'))

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version //  版本
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss') //  打包时间

// 基础路径 注意发布之前要先修改这里
const publicPath = process.env.VUE_APP_PUBLIC_PATH || './'

module.exports = {
  transpileDependencies: isProd ? [] : ['vuetify'],
  publicPath,
  // outputDir:`${process.env.VUE_APP_TITLE}-${process.env.VUE_APP_VERSION}`,
  //将eslint错误转为编译错误
  lintOnSave: true,
  devServer: {
    port: 8877,
    open: true,
    proxy: {
      '/file': {
        // target: 'http://127.0.0.1:8612',
        target: process.env.VUE_APP_GATEWAY,
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/file': '/file'
        }
      },
      '/api': {
        target: process.env.VUE_APP_GATEWAY,
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: "@import '~@/assets/styles/public.scss';"
      }
    }
  },
  configureWebpack: () => {
    const configNew = {}
    //  生产环境排除cdn的包
    if (isProd) {
      configNew.externals = externals
      configNew.plugins = [
        // gzip压缩文件
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]', //目标名称
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), //  匹配文件
          threshold: 10240, //  大于这个大小的文件进行压缩
          minRatio: 0.8, //  小于这个压缩比率的文件进行压缩
          deleteOriginalAssets: true
        }),
        //多线程打包
        new HappyPack({
          id: 'scripts',
          threadPool: happyThreadPool,
          loaders: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: { happyPackMode: true }
            }
          ]
        }),
        //压缩代码
        new TerserWebpackPlugin({
          sourceMap: false,
          terserOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            },
            mangle: false,
            output: {
              beautify: true
            }
          },
          parallel: true
        }),
        //  打包后自动压缩为zip
        new FileManagerPlugin({
          onEnd: {
            delete: [`./dist/dist.zip`],
            archive: [{ source: './dist', destination: './dist/dist.zip' }]
          }
        })
      ]
    }
    return configNew
  },
  chainWebpack: config => {
    //  压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
    //  等待加载的cdn列表
    const waitCdnList = {
      js: [],
      css: [...alwaysCssCdnList]
    }
    if (isProd) {
      //  塞入生成环境cdn列表
      waitCdnList.js.push(...cdn.js)
      waitCdnList.css.push(...cdn.css)
      //happypack多线程打包
      const jsRule = config.module.rule('js')
      const tsRule = config.module.rule('ts')
      jsRule.uses.clear()
      tsRule.uses.clear()
      jsRule
        .use('happypack/loader?id=scripts')
        .loader('happypack/loader?id=scripts')
        .end()
      tsRule
        .use('happypack/loader?id=scripts')
        .loader('happypack/loader?id=scripts')
        .end()
    } else {
      // 开发环境 sourcemap 不包含列信息
      config.devtool('cheap-source-map')
    }
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload')

    //  打包依赖图
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    //  切换主题色
    config.plugin('theme-color-replacer').use(ThemeColorReplacer, [
      {
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: [process.env.VUE_APP_PRIMARY_COLOR],
        injectCss: true
      }
    ])
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     */
    const targetHtmlPluginNames = ['html']
    each(targetHtmlPluginNames, name => {
      config.plugin(name).tap(options => {
        set(options[0], 'cdn', waitCdnList)
        return options
      })
    })
  }
}
