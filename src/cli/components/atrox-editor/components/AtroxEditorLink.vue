<!--
 * @description 超链接操作
 * @author wuy1fffff
 * @date 2020-08-27 16:43
 * @lastEditTime 2020-08-27 16:43
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

    <v-card>
      <v-card-title>{{ $t(tooltip) }}</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            dense
            outlined
            :label="$t(tooltip)"
            v-model="url"
            :rules="urlRule"
          ></v-text-field>
          <div>{{ $t('cli.editor.openMethod') }}</div>
          <v-radio-group row v-model="newTab" dense class="mt-0">
            <v-radio :label="$t('cli.editor.openCurrent')" :value="false"></v-radio>
            <v-radio :label="$t('cli.editor.openNew')" :value="true"></v-radio>
          </v-radio-group>
        </v-form>
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
import { MenuData } from 'tiptap'
import { Prop, Ref, Inject } from 'vue-property-decorator'
import { DEFAULT_IMAGE_URL_REGEX } from '../helper/constant'

@Component({ name: 'AtroxEditorLink' })
export default class AtroxEditorLink extends Vue {
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

  @Ref() form!: any

  dialogSign = false
  url = ''
  newTab = false

  @Inject() atroxEditor!: any

  dialogSignChange(val: boolean) {
    if (val) {
      if (
        this.atroxEditor.editor.selection.from === this.atroxEditor.editor.selection.to
      ) {
        this.$amessage.error('请选中要添加链接的文字')
        this.$nextTick(() => {
          this.dialogSign = false
        })
      }
      this.form && this.form.resetValidation()
      const { getMarkAttrs } = this.editorContext
      const linkAttrs = getMarkAttrs('link')

      this.url = linkAttrs.href
      this.newTab = linkAttrs.openInNewTab || false
    }
  }

  get urlRule() {
    return [
      (v: string) =>
        DEFAULT_IMAGE_URL_REGEX.test(v) ||
        this.$t('form.error.required', [this.$t('cli.editor.extensions.link')])
    ]
  }

  handleConfirm() {
    if (this.form.validate()) {
      this.editorContext.commands.link({ href: this.url, openInNewTab: this.newTab })
      this.dialogSign = false
    }
  }

  handleCancel() {
    this.editorContext.commands.link({ href: '', openInNewTab: undefined })
    this.dialogSign = false
  }
}
</script>
