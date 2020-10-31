/**
 * @description better-scroll优化滚动的功能
 * @author wuy1fffff
 * @date 2020-07-17 16:13
 * @lastEditTime 2020-07-17 16:13
 */
import Vue from 'vue'
import BScroll, { BsOption } from 'better-scroll'
import Component from 'vue-class-component'
import { Prop, Ref, Emit } from 'vue-property-decorator'

interface Position {
  x: number
  y: number
}

@Component
export default class BetterScroll extends Vue {
  @Prop({ type: Object, default: () => ({}) }) betterScrollOptions!: BsOption
  @Ref() wrapper!: Element
  BS: BScroll | null = null

  //  发出滚动事件
  @Emit('scroll')
  scrollEmit(scrollEvent: Position) {
    return scrollEvent
  }

  mounted() {
    this.scrollInit()
  }

  beforeDestoryed() {
    this.scrollDestroy()
  }

  scrollInit() {
    // 初始化 bs
    this.BS = new BScroll(
      this.wrapper,
      Object.assign(
        {
          mouseWheel: true,
          click: true,
          scrollbar: {
            fade: true,
            interactive: false
          }
        },
        this.betterScrollOptions
      )
    )
    // 滚动时发出事件 并且统一返回的数据格式
    this.BS.on('scroll', (scrollEvent: Position) =>
      this.scrollEmit({
        x: -scrollEvent.x,
        y: -scrollEvent.y
      })
    )
  }
  scrollDestroy() {
    if (this.BS) {
      //  解决ie报错问题
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
  // 外部调用的方法 返回顶部
  scrollToTop() {
    if (this.BS) this.BS.scrollTo(0, 0, 300)
  }
  // 手动发出滚动事件
  scroll() {
    if (this.BS) {
      this.scrollEmit({ x: -this.BS.x, y: -this.BS.y })
    }
  }
}
