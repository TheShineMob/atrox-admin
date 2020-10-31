import { Node as ProsemirrorNode, DOMOutputSpec } from 'prosemirror-model'
import { Image as TiptapImage } from 'tiptap-extensions'
import { MenuData } from 'tiptap'
import {
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_DISPLAY,
  DEFAULT_IMAGE_URL_REGEX,
  DEFAULT_IMAGE_HEIGHT
} from '../helper/constant'
import { ImageDisplay } from '../helper/utils/image'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorVideoView from '../components/video/AtroxEditorVideoView.vue'
import AtroxEditorVideo from '../components/video/AtroxEditorVideo.vue'

//  获得属性
function getAttrs(p: string | Node): { [key: string]: any } {
  if (typeof p === 'string') return { p: '' }
  //    强行转换
  const dom: HTMLElement = p as HTMLElement
  const { cssFloat, display } = dom.style
  let { width, height } = dom.style

  let dp = dom.getAttribute('data-display') || dom.getAttribute('display')
  if (dp) {
    dp = /(inline|block|left|right)/.test(dp) ? dp : ImageDisplay.INLINE
  } else if (cssFloat === 'left' && !display) {
    dp = ImageDisplay.FLOAT_LEFT
  } else if (cssFloat === 'right' && !display) {
    dp = ImageDisplay.FLOAT_RIGHT
  } else if (!cssFloat && display === 'block') {
    dp = ImageDisplay.BREAK_TEXT
  } else {
    dp = ImageDisplay.INLINE
  }

  width = width || dom.getAttribute('width') || ''
  height = height || dom.getAttribute('height') || ''
  return {
    style: dom.style.cssText,
    src: dom.getAttribute('src') || '',
    title: dom.getAttribute('title') || '',
    alt: dom.getAttribute('alt') || '',
    width: width === null ? null : parseInt(width, 10),
    height: height === null ? null : parseInt(height, 10),
    display: dp
  }
}

function toDOM(node: ProsemirrorNode): DOMOutputSpec {
  const { src, alt, title, width, height, display, style } = node.attrs
  console.log(node.attrs)
  const attrs: { [key: string]: any } = {
    src,
    alt,
    title,
    width,
    height,
    style,
    controlslist: 'nodownload',
    controls: 'controls'
  }

  attrs['data-display'] = display
  return ['video', attrs]
}

export default class Image extends TiptapImage implements AtroxEditorActionRender {
  get name() {
    return 'video'
  }

  get defaultOptions() {
    return {
      defaultWidth: DEFAULT_IMAGE_WIDTH,
      defaultDisplay: DEFAULT_IMAGE_DISPLAY,
      urlPattern: DEFAULT_IMAGE_URL_REGEX,
      uploadRequest: null
    }
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        src: {
          default: ''
        },
        alt: {
          default: ''
        },
        title: {
          default: ''
        },
        width: {
          default:
            this.imageDefaultWidth > 0 ? this.imageDefaultWidth : DEFAULT_IMAGE_WIDTH
        },
        height: {
          default:
            this.imgaeDefaultHeight > 0 ? this.imgaeDefaultHeight : DEFAULT_IMAGE_HEIGHT
        },
        display: {
          default: /(inline|block|left|right)/.test(this.defaultDisplay)
            ? this.defaultDisplay
            : DEFAULT_IMAGE_DISPLAY
        },
        style: {
          default: ''
        }
      },
      group: 'inline',
      draggable: true,
      parseDOM: [{ tag: 'video[src]', getAttrs }],
      toDOM
    }
  }

  get view() {
    return AtroxEditorVideoView
  }

  renderFun(editorContext: MenuData) {
    return {
      component: AtroxEditorVideo,
      componentProps: {
        editorContext,
        icon: 'mdi-video-box',
        tooltip: 'cli.editor.extensions.video',
        accept: 'audio/mp4,video/mp4',
        size: 314572800
      }
    }
  }
}
