<!--
 * @description 视频操作界面
 * @author wuy1fffff
 * @date 2020-08-25 12:45
 * @lastEditTime 2020-08-25 12:45
-->
<template>
  <span :class="imageViewClass">
    <div
      :class="{
        'atrox-editor-image-view__body--focused': selected,
        'atrox-editor-image-view__body--resizing': resizing
      }"
      :style="node.attrs.style"
    >
      <v-menu max-width="60" top offset-y>
        <template #activator="{on}">
          <div class="atrox-editor-image-view__body">
            <video
              :src="src"
              :title="node.attrs.title"
              :alt="node.attrs.alt"
              :width="width"
              :height="height"
              class="atrox-editor-image-view__body__image"
              @click="selectImage"
              v-on="on"
            />
            <div
              v-if="view.editable"
              v-show="selected || resizing"
              class="atrox-editor-image-resizer"
            >
              <span
                v-for="direction in resizeDirections"
                :key="direction"
                :class="`atrox-editor-image-resizer__handler--${direction}`"
                class="atrox-editor-image-resizer__handler"
                @mousedown="onMouseDown($event, direction)"
              />
            </div>
          </div>
        </template>

        <v-list dense>
          <atrox-editor-edit-image
            :node="node"
            :view="view"
            :update-attrs="updateAttrs"
          />
        </v-list>
      </v-menu>
    </div>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { ImageDisplay } from '../../helper/utils/image'
import { EditorView } from 'prosemirror-view'
import { NodeSelection } from 'prosemirror-state'
import { ResizeObserver } from '@juggle/resize-observer'
import AtroxEditorEditImage from '../image/AtroxEditorEditImage.vue'

const enum ResizeDirection {
  TOP_LEFT = 'tl',
  TOP_RIGHT = 'tr',
  BOTTOM_LEFT = 'bl',
  BOTTOM_RIGHT = 'br'
}

const MIN_SIZE = 20
const MAX_SIZE = 100000

@Component({
  name: 'AtroxEditorImageView',
  components: {
    AtroxEditorEditImage
  }
})
export default class AtroxEditorImageView extends Vue {
  @Prop({
    type: ProsemirrorNode,
    required: true
  })
  readonly node!: ProsemirrorNode

  @Prop({
    type: Function,
    required: true
  })
  readonly getPos!: Function

  @Prop({
    type: Boolean,
    required: true
  })
  readonly selected!: boolean

  @Prop({
    type: Object,
    required: true
  })
  readonly view!: EditorView

  @Prop({
    type: Function,
    required: true
  })
  readonly updateAttrs!: Function

  resizing = false

  originalSize = {
    width: 0,
    height: 0
  }

  maxSize = {
    width: MAX_SIZE,
    height: MAX_SIZE
  }

  private get src(): string {
    return this.node.attrs.src
  }

  private get width(): number {
    return this.node.attrs.width
  }

  private get height(): number {
    return this.node.attrs.height
  }

  private get display(): ImageDisplay {
    return this.node.attrs.display
  }

  private get imageViewClass() {
    return ['atrox-editor-image-view', `atrox-editor-image-view--${this.display}`]
  }

  resizeOb = new ResizeObserver(() => {
    this.getMaxSize()
  })

  /* invoked when window or editor resize */
  private getMaxSize() {
    const { width } = getComputedStyle(this.view.dom)
    this.maxSize.width = parseInt(width, 10)
  }

  resizeDirections = [
    ResizeDirection.TOP_LEFT,
    ResizeDirection.TOP_RIGHT,
    ResizeDirection.BOTTOM_LEFT,
    ResizeDirection.BOTTOM_RIGHT
  ]

  resizerState = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    dir: ''
  }

  private selectImage() {
    const { state } = this.view
    let { tr } = state
    const selection = NodeSelection.create(state.doc, this.getPos())
    tr = tr.setSelection(selection)
    this.view.dispatch(tr)
  }

  private onMouseDown(e: MouseEvent, dir: ResizeDirection): void {
    e.preventDefault()
    e.stopPropagation()

    this.resizerState.x = e.clientX
    this.resizerState.y = e.clientY

    const originalWidth = this.originalSize.width
    const originalHeight = this.originalSize.height
    const aspectRatio = originalWidth / originalHeight

    let { width, height } = this.node.attrs
    const maxWidth = this.maxSize.width

    if (width && !height) {
      width = width > maxWidth ? maxWidth : width
      height = Math.round(width / aspectRatio)
    } else if (height && !width) {
      width = Math.round(height * aspectRatio)
      width = width > maxWidth ? maxWidth : width
    } else if (!width && !height) {
      width = originalWidth > maxWidth ? maxWidth : originalWidth
      height = Math.round(width / aspectRatio)
    } else {
      width = width > maxWidth ? maxWidth : width
    }

    this.resizerState.w = width
    this.resizerState.h = height
    this.resizerState.dir = dir

    this.resizing = true

    this.onEvents()
  }

  clamp(val: number, min: number, max: number): number {
    if (val < min) {
      return min
    }
    if (val > max) {
      return max
    }
    return val
  }

  private onMouseMove(e: MouseEvent): void {
    e.preventDefault()
    e.stopPropagation()
    if (!this.resizing) return

    const { x, y, w, h, dir } = this.resizerState

    const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1)
    const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1)

    this.updateAttrs({
      width: this.clamp(w + dx, MIN_SIZE, this.maxSize.width),
      height: Math.max(h + dy, MIN_SIZE)
    })
  }

  private onMouseUp(e: MouseEvent): void {
    e.preventDefault()
    e.stopPropagation()
    if (!this.resizing) return

    this.resizing = false

    this.resizerState = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      dir: ''
    }

    this.offEvents()
    this.selectImage()
  }

  private onEvents(): void {
    document.addEventListener('mousemove', this.onMouseMove, true)
    document.addEventListener('mouseup', this.onMouseUp, true)
  }

  private offEvents(): void {
    document.removeEventListener('mousemove', this.onMouseMove, true)
    document.removeEventListener('mouseup', this.onMouseUp, true)
  }

  private mounted() {
    this.resizeOb.observe(this.view.dom)
  }

  private beforeDestroy() {
    this.resizeOb.disconnect()
  }
}
</script>
