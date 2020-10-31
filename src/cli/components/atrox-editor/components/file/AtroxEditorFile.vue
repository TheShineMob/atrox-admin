<!--
 * @description 文件下载
 * @author wuy1fffff
 * @date 2020-10-22 17:52
 * @lastEditTime 2020-10-22 17:52
-->
<template>
  <v-dialog max-width="400" v-model="dialogSign" @input="dialogSignChange">
    <template #activator="{ on:dialog }">
      <v-tooltip top>
        <template #activator="{ on:tooltip }">
          <v-btn
            v-on="{ ...dialog, ...tooltip }"
            small
            icon
            :class="{
              'v-btn--active': editorContext.isActive.link()
            }"
          >
            <v-icon v-text="icon"></v-icon>
          </v-btn>
        </template>
        <template>{{ $t(tooltip) }}</template>
      </v-tooltip>
    </template>

    <v-card style="position: relative;">
      <v-card-title>{{ $t(tooltip) }}</v-card-title>
      <v-card-text>
        <v-overlay :value="uploadLoading" absolute>
          <v-progress-circular :value="progress" size="64" color="primary">
            {{ progress }}
          </v-progress-circular>
        </v-overlay>
        <template v-if="file.file">
          <div class="d-flex align-center">
            <div>{{ file.file.name }}</div>
            <v-spacer></v-spacer>
            <v-btn @click="reUpload" outlined text>重新上传</v-btn>
          </div>
        </template>
        <template v-else>
          <div class="d-flex justify-center">
            <a-upload
              height="200"
              width="200"
              v-model="file"
              :autoImg="false"
              :size="314572800"
            ></a-upload>
          </div>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="handleCancel">{{ $t('action.cancel') }}</v-btn>
        <v-btn text @click="handleConfirm">{{ $t('action.confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Inject } from 'vue-property-decorator'
import { MenuData } from 'tiptap'
import { AtroxFile } from '@/cli/components/atrox-upload/AtroxUploadInterface'

@Component({ name: 'AtroxEditorFile' })
export default class AtroxEditorFile extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly editorContext!: MenuData //  上下文

  @Prop({
    type: String,
    required: true
  })
  readonly icon!: string //  图标

  @Prop({
    type: String,
    required: true
  })
  readonly tooltip!: string //  提示

  @Inject() atroxEditor!: any

  dialogSign = false
  file: AtroxFile = {
    src: '',
    progress: 0,
    file: null
  }

  uploadLoading = false
  progress = 0

  reUpload() {
    this.file = {
      src: '',
      progress: 0,
      file: null
    }
  }

  dialogSignChange(val: boolean) {
    if (val) {
      if (
        this.atroxEditor.editor.selection.from === this.atroxEditor.editor.selection.to
      ) {
        this.$amessage.error('请选中要添加文件下载的文字')
        this.$nextTick(() => {
          this.dialogSign = false
        })
      }
      const { getMarkAttrs } = this.editorContext
      const linkAttrs = getMarkAttrs('link')

      this.file = {
        src: linkAttrs.href,
        file: null,
        progress: 0
      }
    }
  }

  handleConfirm() {
    if (this.file.file) {
      this.uploadLoading = true
      this.progress = 0
      this.$aapi.user
        .upload(this.file.file, (progress: number) => {
          this.progress = progress
        })
        .then(r => {
          this.file.src = this.$aconst.fileUrl + r.data.filePath
          this.editorContext.commands.file({ href: this.file.src, openInNewTab: true })
          this.dialogSign = false
        })
        .catch(e => {
          this.$amessage.error(e.msg || e)
        })
        .finally(() => {
          this.uploadLoading = false
          this.progress = 0
        })
    } else if (this.file.src) {
      this.editorContext.commands.file({ href: this.file.src, openInNewTab: true })
      this.dialogSign = false
    } else {
      this.$amessage.error('请上传文件!')
    }
  }

  handleCancel() {
    // this.editorContext.commands.link({ href: '', openInNewTab: undefined })
    this.dialogSign = false
  }
}
</script>
