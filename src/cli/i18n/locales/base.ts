/**
 * @description 基础国际化
 * @author wuy1fffff
 * @date 2020-07-11 13:13
 * @lastEditTime 2020-07-11 13:13
 */
import { AtroxLocaleLang } from '@/cli/i18n/locales/mixins'
import { form } from './form'
import { error } from './error'

const base: AtroxLocaleLang = {
  index: ['Index', '主页'],
  tip: ['Tip', '提示'],
  username: ['Username', '用户名'],
  password: ['Password', '密码'],
  confirmLogout: ['Confirm Logout?', '确认注销当前用户?'],
  default: ['Default', '默认'],
  cli: {
    login: ['Login', '登录'],
    header: {
      notLog: ['Not Logged', '未登录'],
      language: ['Language', '语言'],
      localeList: {
        'zh-CN': ['简体中文', '简体中文'],
        'en-US': ['English', 'English']
      },
      color: ['Color', '颜色'],
      colorList: [
        'Cint | Energy | High | Indie | Young',
        '华智 | 能量 | 高端 | 清新 | 年轻'
      ],
      theme: ['Theme', '主题'],
      themeList: ['Dev | Cint', '开发版 | 华智'],
      logout: ['Logout', '注销'],
      about: ['About', '关于我们'],
      doc: ['Doc', '文档'],
      reloadMenu: ['Reload Menu', '重载菜单'],
      fullscreen: ['Fullscreen', '全屏'],
      exitFullscreen: ['Exit', '退出全屏']
    },
    editor: {
      extensions: {
        bold: ['Bold', '加粗'],
        blockquote: ['Blockquote', '引用'],
        bulletList: ['List', '列表'],
        fontSize: ['Font Size', '字体大小'],
        orderList: ['Num List', '数字列表'],
        lineHeight: ['Line Spacing', '行间距'],
        code: ['Code', '代码'],
        codeBlock: ['CodeBlock', '代码块'],
        heading: ['Head', '标题'],
        undo: ['Undo', '撤销'],
        redo: ['Redo', '重做'],
        line: ['Line', '横线'],
        indent: ['Indent', '增加缩进'],
        outdent: ['Outdent', '减少缩进'],
        italic: ['Italic', '斜体'],
        strike: ['Strike', '删除线'],
        underline: ['UnderLine', '下划线'],
        leftAlign: ['Align Left', '居左对齐'],
        rightAlign: ['Align Right', '居右对齐'],
        centerAlign: ['Align Center', '居中对齐'],
        justifyAlign: ['Align Justify', '两端对齐'],
        fontColor: ['Font Color', '文字颜色'],
        fontHighlight: ['HighLig', '底色'],
        table: ['Table', '表格'],
        insertTable: ['Insert Table', '插入表格'],
        addColumn: ['Add Column', '添加列'],
        left: ['Left', '左边'],
        right: ['Right', '右边'],
        top: ['Top', '上方'],
        bottom: ['Bottom', '下方'],
        addRow: ['Add Row', '添加行'],
        deleteColumn: ['Delete Column', '删除列'],
        deleteRow: ['Delete Row', '删除行'],
        mergeCells: ['Merge Cells', '合并单元格'],
        splitCell: ['Split Cell', '拆分单元格'],
        deleteTable: ['Delete Table', '删除表格'],
        image: ['Image', '图片'],
        video: ['Video', '视频'],
        file: ['File', '文件'],
        link: ['Link', '链接'],
        editText: ['Edit Text', '编辑文字'],
        openLink: ['Open Link', '打开链接']
      },
      openMethod: ['Open Method', '打开方法'],
      openCurrent: ['Current', '本页打开'],
      openNew: ['New Tab', '新窗口']
    },
    error: {
      404: ['The page you were looking for does not exist.', '你要找的页面不存在.']
    }
  },
  $vuetify: {
    noDataText: ['No Data', '暂无数据'],
    dataTable: {
      itemsPerPageText: ['Per Page', '每页条数']
    },
    dataFooter: {
      itemsPerPageAll: ['All', '全部']
    }
  },
  action: {
    confirm: ['Confirm', '确认'],
    cancel: ['Cancel', '取消'],
    back: ['Back', '返回'],
    edit: ['Edit', '编辑'],
    insert: ['Insert', '新增'],
    delete: ['Delete', '删除'],
    upload: ['Upload', '上传'],
    export: ['Export', '导出'],
    template: ['Template', '模板']
  },
  form,
  error
}

export { base }
