/**
 * @description 框架容器
 * @author wuy1fffff
 * @date 2020-07-17 14:10
 * @lastEditTime 2020-07-17 14:10
 */
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Ref } from 'vue-property-decorator'
//  容器类型
import AtroxContainerFull from '@/cli/components/atrox-container/components/AtroxContainerFull.vue' //  填充式布局容器
import AtroxContainerFullBs from '@/cli/components/atrox-container/components/AtroxContainerFullBs.vue' //  滚动优化填充式布局容器
import AtroxContainerCard from '@/cli/components/atrox-container/components/AtroxContainerCard.vue' //  卡片式布局容器
import AtroxContainerCardBs from '@/cli/components/atrox-container/components/AtroxContainerCardBs.vue' //  滚动优化卡片式布局容器

@Component({
  name: 'AtroxContainer',
  components: {
    AtroxContainerFull,
    AtroxContainerFullBs,
    AtroxContainerCard,
    AtroxContainerCardBs
  }
})
export default class AtroxContainer extends Vue {
  @Prop({ type: String, default: 'full' }) type!: string //容器类型
  @Prop({ type: Boolean, default: false }) bs!: boolean //是否开启bs滚动优化
  @Prop({ type: Boolean, default: true }) tt!: boolean //返回頂部功能是否开启
  @Prop({ type: Number, default: 369 }) tty!: number //返回顶部按钮显示判断的距离
  scrollY = {} //滚动条位置对象
  @Ref() component: any //选择的容器

  @Emit('scroll')
  scroll(scrollEvent: { x: number; y: number }) {
    this.scrollY = scrollEvent.y
    return scrollEvent
  }

  //  返回容器类型对应的组件
  get parseComponent(): string {
    switch (this.type) {
      case 'full':
        return this.bs ? 'AtroxContainerFullBs' : 'AtroxContainerFull'
        break
      case 'card':
        return this.bs ? 'AtroxContainerCardBs' : 'AtroxContainerCard'
        break
      default:
        return 'div'
    }
  }

  // 获取页面最大值z-index
  get maxZIndex() {
    return (
      [...document.all].reduce(
        (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
        0
      ) + 1
    )
  }

  // 调用返回顶部方法
  doToTop(): void {
    if (this.component && this.component.scrollToTop) {
      this.component.scrollToTop()
    }
  }
  //回到顶部按钮逻辑封装
  toTopBtn() {
    if (this.scrollY >= this.tty)
      return (
        <v-btn
          fab
          dark
          small
          onClick={this.doToTop}
          class={{
            'atrox-container-button-to-top': true,
            'elevation-9': true
          }}
          style={{
            zIndex: this.maxZIndex
          }}
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      )
    else return null
  }
  //实现回调顶部按钮过度动画
  showToTop() {
    if (this.tt)
      return (
        <transition name={'atrox-button-to-top-animation'}>{this.toTopBtn()}</transition>
      )
    else return null
  }

  render() {
    //  插槽  默认插槽和头部  脚步
    const slots = [
      this.$slots.default,
      this.$slots.header ? <template slot="header">{this.$slots.header}</template> : null,
      this.$slots.footer ? <template slot="footer">{this.$slots.footer}</template> : null
    ]

    return (
      <div ref="container" class="atrox-container-component">
        <this.parseComponent
          ref="component"
          {...{ attrs: this.$attrs }}
          onScroll={this.scroll}
        >
          {slots}
        </this.parseComponent>
        {this.showToTop()}
      </div>
    )
  }
}
