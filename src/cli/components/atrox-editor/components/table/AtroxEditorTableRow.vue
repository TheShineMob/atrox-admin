<!--
 * @description 添加行操作
 * @author wuy1fffff
 * @date 2020-08-19 09:48
 * @lastEditTime 2020-08-19 09:48
-->
<template>
  <v-menu offset-x right>
    <template #activator="{ on }">
      <v-list-item v-on="on" :disabled="disabled">
        {{ $t('cli.editor.extensions.addRow') }}</v-list-item
      >
    </template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item @click="editorContext.commands.addRowBefore">
          {{ $t('cli.editor.extensions.top') }}
        </v-list-item>
        <v-list-item @click="editorContext.commands.addRowAfter">
          {{ $t('cli.editor.extensions.bottom') }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { MenuData } from 'tiptap'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'AtroxEditorTableRow' })
export default class AtroxEditorTableRow extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly editorContext!: MenuData //  上下文

  @Prop({
    type: Boolean,
    default: false
  })
  readonly disabled!: boolean //  禁用
}
</script>
