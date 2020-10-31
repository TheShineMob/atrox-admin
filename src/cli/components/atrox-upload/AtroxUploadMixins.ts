/**
 * @description 混入方法
 * @author wuy1fffff
 * @date 2020-08-26 14:04
 * @lastEditTime 2020-08-26 14:04
 */
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
import { AtroxFile } from './AtroxUploadInterface'

@Component
export default class AtroxUploadMixins extends Vue {
  @Prop({
    type: [Object, Array, String],
    default: null
  })
  value!: AtroxFile | null | Array<AtroxFile>

  @Prop({ type: Function, default: undefined }) uploadRequest!: (
    file: AtroxFile
  ) => Promise<string>

  @Prop({
    type: Boolean,
    default: false
  })
  manualUpload!: boolean //是否开启手动上传

  @Prop({
    type: Number,
    default: -1
  })
  size!: number //限制大小

  @Prop({
    type: Boolean,
    default: true
  })
  autoImg!: boolean //自动按图片处理

  lazyValue!: AtroxFile | null | Array<AtroxFile>
  loading = false
  url = ''
  mutilpe = false
  base64 = true

  @Emit('changeFile')
  emitChangeFile(file: File) {
    console.log(file, 'changeFile')
    return file
  }

  uploadFile(fileList: FileList, accept: string) {
    //上传文件方法
    if (this.mutilpe) {
      for (let i = 0; i < fileList.length; i++) {
        this.uploadAction(fileList[i], accept)
      }
    } else {
      this.uploadAction(fileList[0], accept)
    }
  }

  uploadAction(file: File, accept: string) {
    const atroxFile: AtroxFile = {
      src: '',
      progress: 0,
      file
    }
    if (!this.beforeUpload(file, accept)) {
      //  上传被阻止
      return false
    }
    this.uploadMethod(atroxFile)
  }

  //  上传前处理
  beforeUpload(file: File, accept: string): boolean {
    //  处理图片
    if (accept) {
      const typeArr = accept.split(',')
      if (typeArr.indexOf(file.type) === -1) {
        this.$amessage.error('文件类型不匹配!!')
        return false
      }
    }
    if (this.size >= 0) {
      if (file.size > this.size) {
        this.$amessage.error(`文件过大!(最大为${this.getfilesize(this.size)})`)
        return false
      }
    }
    return true
  }

  //  上传方法
  async uploadMethod(atroxFile: AtroxFile) {
    if (this.uploadRequest) {
      this.loading = true
      await this.uploadRequest(atroxFile)
        .then(r => {
          atroxFile.src = r
          this.changeLazyValue(atroxFile)
        })
        .catch(e => {
          this.$amessage.error('上传失败' + e)
        })
        .finally(() => {
          this.loading = false
        })
    } else if (this.manualUpload) {
      //手动处理上传
      if (atroxFile.file) this.emitChangeFile(atroxFile.file)
    } else if (this.autoImg) {
      this.uploadImage(atroxFile)
    } else {
      this.changeLazyValue(atroxFile)
    }
  }

  //  上传图片
  async uploadImage(atroxFile: AtroxFile) {
    if (this.base64 && atroxFile.file) {
      await this.imageToBase64(atroxFile.file).then(r => {
        atroxFile.src = r
        this.changeLazyValue(atroxFile)
      })
    } else {
      atroxFile.src = URL.createObjectURL(atroxFile.file)
      this.changeLazyValue(atroxFile)
    }
  }

  //  图片转Base64
  imageToBase64(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() {
        resolve(reader.result as string)
      }
    })
  }

  mounted() {
    if (this.mutilpe) {
      this.lazyValue = []
    } else {
      this.lazyValue = null
    }
  }

  changeLazyValue(atroxFile: AtroxFile) {
    if (this.mutilpe) {
      ;(this.lazyValue as AtroxFile[]).push(atroxFile)
    } else {
      this.lazyValue = atroxFile
    }
    this.$emit('input', this.lazyValue)
  }

  getfilesize(size: number): string {
    //把字节转换成正常文件大小
    if (!size) return ''
    const num = 1024.0 //byte
    if (size < num) return size + 'B'
    if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB' //kb
    if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + 'MB' //M
    if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + 'G' //G
    return (size / Math.pow(num, 4)).toFixed(2) + 'T' //T
  }
}
