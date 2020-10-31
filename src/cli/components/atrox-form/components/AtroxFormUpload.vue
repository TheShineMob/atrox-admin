<!--
 * @description 上传文件
 * @author wuy1fffff
 * @date 2020-10-08 15:31
 * @lastEditTime 2020-10-08 15:31
-->
<template>
  <v-input :value="value" :rules="rules">
    <v-card :width="width" :height="height" class="mr-1" v-if="uploadValue.src">
      <v-img width="100" height="100" :src="$aconst.fileUrl + uploadValue.src"></v-img>
    </v-card>
    <a-upload
      :value="uploadValue"
      v-bind="$attrs"
      :uploadRequest="uploadRequest"
    ></a-upload>
  </v-input>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { RuleFunction } from '../AtroxFormInterface'
import { Prop } from 'vue-property-decorator'
import { AtroxFile } from '../../atrox-upload/AtroxUploadInterface'

@Component({ name: 'AtroxFormUpload' })
export default class AtroxFormUpload extends Vue {
  @Prop({ type: Object, default: null }) value!: Record<string, any>

  @Prop({ type: Array, default: () => [] }) rules!: RuleFunction[]

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

  uploadRequest(file: AtroxFile) {
    return new Promise((resolve, reject) => {
      if (file.file) {
        this.$aapi.user
          .upload(file.file)
          .then(r => {
            this.$emit('input', r.data)
            resolve(this.$aconst.fileUrl + r.data.filePath)
          })
          .catch(e => {
            reject(e.msg || e)
          })
      }
    })
  }

  get uploadValue(): AtroxFile {
    if (this.value) {
      return {
        src: this.value.filePath,
        file: null,
        progress: 0
      }
    } else {
      return {
        src: '',
        progress: 0,
        file: null
      }
    }
  }
}
</script>
