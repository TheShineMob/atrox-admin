<!--
 * @description 富文本封装
 * @author wuy1fffff
 * @date 2020-08-10 17:58
 * @lastEditTime 2020-08-10 17:58
-->
<template>
  <div
    v-if="editor"
    class="atrox-editor"
    :class="{
      'atrox-editor-fullscreen': isFullscreen
    }"
  >
    <atrox-editor-menu-bubble :editor="editor"></atrox-editor-menu-bubble>
    <v-card v-bind="cardProps" class="atrox-editor-content" elevation="0">
      <!-- 工具菜单栏 -->
      <atrox-editor-toolbar v-if="showToolbar && !readonly" :editor="editor">
      </atrox-editor-toolbar>
      <editor-content class="atrox-editor-wrap" :editor="editor" :style="editorSize" />
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Editor, EditorContent, EditorUpdateEvent, Extension } from 'tiptap'
import { Prop, Watch, Provide } from 'vue-property-decorator'
import AtroxEditorToolbar from './AtroxEditorToolbar.vue'
import AtroxEditorMenuBubble from './menu-bubble/AtroxMenuBubble.vue'
import { Placeholder, TableHeader, TableCell, TableRow } from 'tiptap-extensions'
import {
  ABlockquote,
  ABold,
  ABulletList,
  ADoc,
  ALineHeight,
  AListItem,
  AParagraph,
  AText,
  ACodeBlock,
  AFontSize,
  AHeading,
  AHistory,
  ALine,
  ATrailingNode,
  AHardBreak,
  AIndent,
  AItalic,
  AOrderList,
  AStrike,
  ATextAlign,
  AUnderline,
  ADivider,
  AFontColor,
  AFontHighlight,
  AFullScreen,
  ATable,
  AImage,
  ALink,
  AVideo,
  AFile
} from '@/cli/components/atrox-editor/extensions'

@Component({
  name: 'AtroxEditor',
  components: {
    AtroxEditorToolbar,
    AtroxEditorMenuBubble,
    EditorContent
  }
})
export default class AtroxEditor extends Vue {
  editor: Editor | null = null //  富文本实例
  @Prop({
    type: [String, Number],
    default: '100%'
  })
  readonly width!: string | number //  宽度

  @Prop({
    type: [String, Number],
    default: '300px'
  })
  readonly height!: string | number //  高度

  @Prop({
    type: Boolean,
    default: true
  })
  readonly showToolbar!: boolean //  是否显示toolbar

  @Prop({
    type: Object,
    default: () => ({})
  })
  readonly cardProps!: Record<string, any> //  vuetify卡片属性

  @Prop({
    type: Boolean,
    default: false
  })
  readonly readonly!: boolean //  只读

  @Prop({
    type: String,
    default: ''
  })
  readonly value!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly placeholder!: string //  placeholder占位内容

  @Provide() get atroxEditor(): AtroxEditor {
    return this
  }

  baseExtensions: Array<Extension> = [
    new ADoc(),
    new AText(),
    new AParagraph(),
    new AHardBreak(),
    new ATrailingNode()
  ]

  emitAfterOnUpdate = false //  内部改变绑定值
  isFullscreen = false //  是否全屏

  mounted() {
    const extensions: Array<Extension> = this.generateExtensions()
    //  初始化编辑器
    this.editor = new Editor({
      extensions,
      editable: !this.readonly,
      useBuiltInExtensions: false, //  取消默认的doc，paragraph
      content: this.value,
      onUpdate: this.onUpdate.bind(this),
      editorProps: {
        handleDOMEvents: {
          paste: (view, event: Event) => {
            let hasFiles = false
            const reader = new FileReader()
            //注册加载文件完毕事件
            reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
              //获取object url
              if (readerEvent.target) {
                const imageUrl = readerEvent.target.result
                //插入到编辑器中
                const node = view.state.schema.nodes.image.create({ src: imageUrl })
                const transaction = view.state.tr.replaceSelectionWith(node)
                view.dispatch(transaction)
              }
            }
            //从剪贴板中读取图片文件
            const clipEvent = event as ClipboardEvent
            if (clipEvent.clipboardData) {
              Array.from(clipEvent.clipboardData.files)
                .filter(item => item.type.startsWith('image')) //提取图片文件
                .forEach(item => {
                  //读取数据
                  reader.readAsDataURL(item)
                  hasFiles = true
                })
            }

            //扫尾
            if (hasFiles) {
              event.preventDefault()
              return true
            }
            return hasFiles
          }
        }
      }
    })
    //  渲染完成回调
    this.$emit('init', {
      editor: this.editor
    })
  }

  //  值改变
  onUpdate(options: EditorUpdateEvent) {
    this.emitAfterOnUpdate = true

    this.$emit('input', options.getHTML(), options)
  }

  //  外部改变值改变富文本内容
  @Watch('value')
  onValueChange(val: string): void {
    if (this.emitAfterOnUpdate) {
      this.emitAfterOnUpdate = false
      return
    }

    if (this.editor) this.editor.setContent(val)
  }

  beforeDestroy() {
    if (this.editor) this.editor.destroy()
  }

  //  生成插件
  generateExtensions(): Array<Extension> {
    const extensions: Extension[] = [...this.baseExtensions]
    if (!this.showToolbar || this.readonly) return extensions
    extensions.push(
      //  文字操作
      new AFontSize(),
      new AFontColor(),
      new AFontHighlight(),
      new ABold({ bubble: true }),
      new AUnderline({ bubble: true }),
      new AItalic({ bubble: true }),
      new AStrike({ bubble: true }),
      new ADivider(),
      //  段落操作
      new AHeading(),
      new ABulletList(),
      new AOrderList(),
      new ATextAlign({ bubble: true }),
      new ALineHeight(),
      new AIndent({ bubble: true }),
      new ABlockquote({ bubble: true }),
      new ACodeBlock({ bubble: true }),
      new ADivider(),
      //  高级操作
      new ATable(),
      new TableHeader(),
      new TableCell(),
      new TableRow(),
      new AImage(),
      new AVideo(),
      new AFile(),
      new ALink({ bubble: true }),
      new ADivider(),
      //  其余操作
      new ALine(),
      new AFullScreen(),
      new AHistory(),
      new ADivider(),

      // 支持
      new AListItem()
    )

    // placeholder
    extensions.push(
      new Placeholder({
        emptyEditorClass: 'atrox-editor--empty',
        emptyNodeClass: 'atrox-editor__placeholder',
        emptyNodeText: this.placeholder
      })
    )

    return extensions
  }

  //  转换检验富文本尺寸
  get editorSize(): Record<string, any> {
    let { width, height } = this

    width = isNaN(Number(width)) ? width : `${width}px`
    height = isNaN(Number(height)) ? height : `${height}px`

    return {
      width,
      height: this.isFullscreen ? '' : height
    }
  }
}
</script>

<style lang="scss">
@import './AtroxEditorStyle.scss';
</style>
