/*
 * @Descripttion:
 * @version:
 * @Author: Mob@Hz
 * @Date: 2020-10-13 17:53:09
 * @LastEditors: Mob@Hz
 * @LastEditTime: 2020-10-20 16:38:43
 */
/**
 * @description 注册全局组件
 * @author wuy1fffff
 * @date 2020-07-17 14:34
 * @lastEditTime 2020-07-17 14:34
 */
import Vue from 'vue'

import AtroxContainer from '@/cli/components/atrox-container/AtroxContainer.tsx'
import AtroxIframe from '@/cli/components/atrox-iframe/AtroxIframe.vue'
import AtroxEditor from '@/cli/components/atrox-editor/AtroxEditor.vue'
import AtroxEditorView from '@/cli/components/atrox-editor/AtroxEditorView.vue'
import AtroxDialog from '@/cli/components/atrox-dialog'
import AtroxMessage from '@/cli/components/atrox-message'
import AtroxLoadingDirective from '@/cli/components/atrox-loading'
import AtroxUpload from '@/cli/components/atrox-upload/AtroxUpload.vue'

import AtroxForm from '@/cli/components/atrox-form/AtroxForm.tsx'
import AtroxSelect from '@/cli/components/atrox-form/components/AtroxSelect.vue'
import AtroxCheckboxes from '@/cli/components/atrox-form/components/AtroxCheckboxes.vue'
import AtroxColorPicker from '@/cli/components/atrox-form/components/AtroxColorPicker.vue'
import AtroxIconSelect from '@/cli/components/atrox-form/components/AtroxIconSelect.vue'
import AtroxBtnGroup from '@/cli/components/atrox-form/components/AtroxBtnGroup.vue'
import AtroxSwitch from '@/cli/components/atrox-form/components/AtroxSwitch.vue'
import AtroxRadioGroup from '@/cli/components/atrox-form/components/AtroxRadioGroup.vue'
import AtroxFormUpload from '@/cli/components/atrox-form/components/AtroxFormUpload.vue'
import AtroxAuto from '@/cli/components/atrox-form/components/AtroxAuto.vue'
import AtroxFormEdiotr from '@/cli/components/atrox-form/components/AtroxFormEditor.vue'
import AtroxDate from '@/cli/components/atrox-form/components/AtroxDate.vue'
import AtroxCrud from '@/cli/components/atrox-crud'

Vue.component('AContainer', AtroxContainer)
Vue.component('AIframe', AtroxIframe)
Vue.component('AEditor', AtroxEditor)
Vue.component('AEditorView', AtroxEditorView)
Vue.component('AUpload', AtroxUpload)

Vue.component('AForm', AtroxForm)
Vue.component('ASelect', AtroxSelect)
Vue.component('ACheckboxes', AtroxCheckboxes)
Vue.component('AColorPicker', AtroxColorPicker)
Vue.component('AIconSelect', AtroxIconSelect)
Vue.component('ABtnGroup', AtroxBtnGroup)
Vue.component('ASwitch', AtroxSwitch)
Vue.component('ARadioGroup', AtroxRadioGroup)
Vue.component('ACrud', AtroxCrud)
Vue.component('AFormUpload', AtroxFormUpload)
Vue.component('AAuto', AtroxAuto)
Vue.component('ADate', AtroxDate)
Vue.component('AFormEditor', AtroxFormEdiotr)

Vue.prototype.$adialog = AtroxDialog
Vue.prototype.$amessage = AtroxMessage

Vue.directive('aloading', AtroxLoadingDirective)
