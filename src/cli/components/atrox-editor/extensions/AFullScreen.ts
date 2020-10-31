import { Extension } from 'tiptap'
import { AtroxEditorActionRender } from '../AtroxEditorInterface'
import AtroxEditorFullScreen from '@/cli/components/atrox-editor/components/AtroxEditorFullScreen.vue'

export default class AFullScreen extends Extension implements AtroxEditorActionRender {
  get name() {
    return 'fullscreen'
  }

  renderFun() {
    return {
      component: AtroxEditorFullScreen
    }
  }
}
