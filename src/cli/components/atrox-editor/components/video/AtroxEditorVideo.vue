<!--
 * @description 图片操作
 * @author wuy1fffff
 * @date 2020-08-25 12:44
 * @lastEditTime 2020-08-25 12:44
-->
<template>
  <v-dialog v-model="dialogSign" max-width="400" persistent @input="dialogSignChange">
    <template #activator="{on:dialog}">
      <v-tooltip top>
        <template #activator="{ on:tooltip }">
          <v-btn v-on="{ ...dialog, ...tooltip }" small icon>
            <v-icon v-text="icon"></v-icon>
          </v-btn>
        </template>
        <template>{{ $t(tooltip) }}</template>
      </v-tooltip>
    </template>

    <v-tabs v-model="tabStep" grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab>
        {{ $t('action.upload') }}
      </v-tab>
      <v-tab>
        {{ $t('cli.editor.extensions.link') }}
      </v-tab>
      <v-tab-item>
        <v-card flat tile>
          <v-card-text class="d-flex align-center justify-center">
            <atrox-editor-upload-image
              @uploadFinish="handleUpload"
              :accept="accept"
              :size="size"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogSign = false"> {{ $t('action.back') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat tile>
          <v-card-text>
            <v-form ref="urlForm">
              <v-text-field
                outlined
                dense
                :label="$t('cli.editor.extensions.link')"
                v-model="url"
                :rules="urlRule"
              ></v-text-field
            ></v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogSign = false"> {{ $t('action.back') }}</v-btn>
            <v-btn color="primary" text @click="addUrlImage">
              {{ $t('action.confirm') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { MenuData } from 'tiptap'
import { Prop, Ref } from 'vue-property-decorator'
import AtroxEditorUploadImage from '../image/AtroxEditorUploadImage.vue'

@Component({
  name: 'AtroxEditorImage',
  components: {
    AtroxEditorUploadImage
  }
})
export default class AtroxEditorImage extends Vue {
  dialogSign = false
  tabStep = 0

  @Ref() urlForm!: any

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

  url = ''

  dialogSignChange(val: boolean) {
    this.urlForm && val && this.urlForm.reset()
  }

  get imageNodeOptions() {
    return this.editorContext.editor.extensions.options.image
  }

  get urlRule() {
    return [
      (v: string) =>
        this.imageNodeOptions.urlPattern.test(v) ||
        this.$t('form.error.required', [this.$t('cli.editor.extensions.link')])
    ]
  }

  addUrlImage() {
    if (this.urlForm.validate()) {
      this.editorContext.commands.video({ src: this.url })
      this.dialogSign = false
    }
  }

  handleUpload(src: string) {
    this.editorContext.commands.video({ src: src })
    this.dialogSign = false
  }
}
</script>
