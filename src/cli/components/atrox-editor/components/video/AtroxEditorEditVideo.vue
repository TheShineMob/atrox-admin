<!--
 * @description 修改视频属性
 * @author wuy1fffff
 * @date 2020-08-25 14:33
 * @lastEditTime 2020-08-25 14:33
-->
<template>
  <v-dialog v-model="dialogSign" max-width="500">
    <template #activator="{on:dialog}">
      <v-list-item v-on="dialog">{{ $t('action.edit') }}</v-list-item>
    </template>

    <v-card>
      <v-card-title>{{ $t('action.edit') }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                dense
                outlined
                label="Url"
                :value="videoAttrs.src"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                outlined
                label="宽度"
                v-model.number="videoAttrs.width"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                outlined
                label="高度"
                v-model.number="videoAttrs.height"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeEditVideoDialog">{{ $t('action.back') }}</v-btn>
        <v-btn text color="primary" @click="updateVideoAttrs">{{
          $t('action.confirm')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { Prop, Inject } from 'vue-property-decorator'

@Component({ name: 'AtroxEditorEditVideo' })
export default class AtroxEditorEditVideo extends Vue {
  dialogSign = false

  @Prop({
    type: ProsemirrorNode,
    required: true
  })
  readonly node!: ProsemirrorNode

  @Prop({
    type: Function,
    required: true
  })
  readonly updateAttrs!: Function

  @Inject() readonly atroxEditor!: any

  videoAttrs = this.getVideoAttrs()

  private syncVideoAttrs() {
    this.videoAttrs = this.getVideoAttrs()
  }

  private getVideoAttrs() {
    return {
      src: this.node.attrs.src,
      alt: this.node.attrs.alt,
      width: this.node.attrs.width,
      height: this.node.attrs.height
    }
  }

  private updateVideoAttrs() {
    let { width, height } = this.videoAttrs

    width = parseInt(width as string, 10)
    height = parseInt(height as string, 10)

    this.updateAttrs({
      alt: this.videoAttrs.alt,
      width: width >= 0 ? width : null,
      height: height >= 0 ? height : null
    })

    this.closeEditVideoDialog()
  }

  private closeEditVideoDialog() {
    this.dialogSign = false
  }
}
</script>
