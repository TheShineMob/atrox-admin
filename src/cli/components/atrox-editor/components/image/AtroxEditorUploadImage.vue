<!--
 * @description 上传图片
 * @author wuy1fffff
 * @date 2020-08-25 15:19
 * @lastEditTime 2020-08-25 15:19
-->
<template>
  <a-upload
    width="200"
    height="200"
    :accept="accept"
    :uploadRequest="uploadRequest"
    :size="size"
    @input="uploadFinish"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { AtroxFile } from '@/cli/components/atrox-upload/AtroxUploadInterface'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'AtroxEditorUploadImage' })
export default class AtroxEditorUploadImage extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly accept!: string //  类型

  @Prop({
    type: Number,
    default: -1
  })
  size!: number //限制大小

  uploadFinish(atroxFile: AtroxFile) {
    this.$emit('uploadFinish', atroxFile.src)
  }

  uploadRequest(file: AtroxFile) {
    return new Promise((resolve, reject) => {
      if (file.file) {
        this.$aapi.user
          .upload(file.file)
          .then(r => {
            resolve(this.$aconst.fileUrl + r.data.filePath)
          })
          .catch(e => {
            reject(e.msg || e)
          })
      }
    })
  }
}
</script>
