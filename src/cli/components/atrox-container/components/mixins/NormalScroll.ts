/**
 * @description 普通滚动页面的功能(节流后再将滚动事件emit出去)
 * @author wuy1fffff
 * @date 2020-07-17 15:46
 * @lastEditTime 2020-07-17 15:46
 */
import Vue from 'vue'
import Component from 'vue-class-component'
import { throttle } from 'lodash'
import { Prop, Emit, Watch, Ref } from 'vue-property-decorator'

@Component
export default class NormalScroll extends Vue {
  @Prop({ type: Number, default: 10 }) scrollDelay!: number //  滚动节流间隔
  @Ref() body!: Element //  body的dom

  mounted() {
    // 增加滚动事件监听
    this.addScrollListener()
  }
  beforeDestroy() {
    // 移除滚动事件监听
    this.removeScrollListener()
  }

  handleScroll: null | EventListener = null

  //    生成滚动事件的handler
  genHandle(wait: number): EventListener {
    return throttle(e => {
      this.scroll({
        x: (e.target as Element).scrollLeft,
        y: (e.target as Element).scrollTop
      })
    }, wait)
  }

  //  发出滚动事件
  @Emit('scroll')
  scroll(scrollEvent: { x: number; y: number }) {
    return scrollEvent
  }

  @Watch('scrollDelay')
  handleScrollDelayChange(val: number) {
    // 移除旧的监听
    this.removeScrollListener()
    // 生成新的 handle 方法
    this.handleScroll = this.genHandle.call(this, val)
    // 添加新的监听
    this.addScrollListener()
  }

  // 增加滚动事件监听
  addScrollListener() {
    if (typeof this.handleScroll !== 'function') {
      // mounted 生命周期内调用这个方法的时候会进入这里的判断
      this.handleScroll = this.genHandle.call(this, this.scrollDelay)
    }
    // 添加监听
    this.body.addEventListener('scroll', this.handleScroll)
  }
  // 移除滚动事件监听
  removeScrollListener() {
    if (this.handleScroll) this.body.removeEventListener('scroll', this.handleScroll)
  }
  // 外部调用的方法 返回顶部
  scrollToTop() {
    const smoothscroll = () => {
      const body = this.body
      const currentScroll = body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll)
        body.scrollTo(0, currentScroll - currentScroll / 5)
      }
    }
    smoothscroll()
  }
}
