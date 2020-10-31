<!--
 * @description 富文本全屏
 * @author wuy1fffff
 * @date 2020-08-12 18:03
 * @lastEditTime 2020-08-12 18:03
-->
<template>
  <atrox-action-btn
    :command="() => (isFullscreen = !isFullscreen)"
    :isActive="isFullscreen"
    :icon="isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
    :tooltip="isFullscreen ? 'cli.header.exitFullscreen' : 'cli.header.fullscreen'"
  ></atrox-action-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
import AtroxActionBtn from './AtroxEditorActionBtn.vue'

@Component({
  name: 'AtroxEditorFullScreen',
  components: {
    AtroxActionBtn
  }
})
export default class AtroxEditorFullScreen extends Vue {
  @Inject() readonly atroxEditor!: any

  get isFullscreen(): boolean {
    return this.atroxEditor.isFullscreen
  }

  set isFullscreen(isFull: boolean) {
    this.atroxEditor.isFullscreen = isFull
  }
}
</script>

<style lang="scss" scoped></style>
