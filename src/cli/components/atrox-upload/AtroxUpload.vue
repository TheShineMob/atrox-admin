<!--
 * @description 文件上传：simple-upload
 * @author wuy1fffff
 * @date 2020-08-26 10:25
 * @lastEditTime 2020-08-26 10:25
-->
<template>
  <v-card :width="width" :height="height" v-aloading="loading" :disabled="loading">
    <div
      class="fill-height atrox-upload-drop"
      ref="dropWrap"
      @click="e => uploadInput.click(e)"
    >
      <v-icon size="36">mdi-plus</v-icon>
    </div>
    <input
      type="file"
      :accept="accept"
      ref="uploadInput"
      @change="inputChange"
      style="display: none;"
    />
  </v-card>
</template>

<script lang="ts">
import { Prop, Mixins, Component, Ref } from 'vue-property-decorator'
import AtroxUploadMixins from './AtroxUploadMixins'

@Component({
  name: 'AtroxUpload'
})
export default class AtroxUpload extends Mixins(AtroxUploadMixins) {
  @Prop({
    type: String,
    default: ''
  })
  accept!: string

  @Prop({
    type: [Number, String],
    default: '100'
  })
  width!: number | string

  @Prop({
    type: [Number, String],
    default: '100'
  })
  height!: number | string

  @Ref() dropWrap!: any
  @Ref() uploadInput!: any

  dropHover = false //  拖拽激活

  mounted() {
    const _this = this
    this.dropWrap.addEventListener('drop', this.endDrop, false)
    this.dropWrap.addEventListener('dragleave', (e: DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      _this.dropHover = false
    })
    this.dropWrap.addEventListener('dragenter', (e: DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      _this.dropHover = true
    })
    this.dropWrap.addEventListener('dragover', (e: DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      _this.dropHover = true
    })
  }

  endDrop(e: DragEvent) {
    this.dropHover = false
    //  阻止事件传播和冒泡
    e.stopPropagation()
    e.preventDefault()
    if (e.dataTransfer) {
      const fileData: FileList = e.dataTransfer.files
      this.uploadFile(fileData, this.accept)
    }
  }

  inputChange(e: InputEvent) {
    //  阻止事件传播和冒泡
    e.stopPropagation()
    e.preventDefault()
    const files: FileList | null = (this.uploadInput as HTMLInputElement).files
    if (files && files.length > 0) {
      this.uploadFile(this.uploadInput.files, this.accept)
    }
  }
}
</script>

<style lang="scss" scoped>
.atrox-upload-drop {
  @extend %unable-select;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
