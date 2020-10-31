<!--
 * @description 增加列操作
 * @author wuy1fffff
 * @date 2020-08-19 09:45
 * @lastEditTime 2020-08-19 09:45
-->
<template>
  <v-menu offset-x right>
    <template #activator="{ on }">
      <v-list-item v-on="on" :disabled="disabled">{{
        $t('cli.editor.extensions.addColumn')
      }}</v-list-item>
    </template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item @click="editorContext.commands.addColumnBefore">
          {{ $t('cli.editor.extensions.left') }}
        </v-list-item>
        <v-list-item @click="editorContext.commands.addColumnAfter">
          {{ $t('cli.editor.extensions.right') }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { MenuData } from 'tiptap'

@Component({ name: 'AtroxEditorTableColumn' })
export default class AtroxEditorTableColumn extends Vue {
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
