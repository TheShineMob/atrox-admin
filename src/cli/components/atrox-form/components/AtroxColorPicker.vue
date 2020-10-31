<!--
 * @description 颜色选择器
 * @author wuy1fffff
 * @date 2020-09-03 10:40
 * @lastEditTime 2020-09-03 10:40
-->
<template>
  <v-menu offset-y max-width="300" nudge-top="20" :close-on-content-click="false">
    <template #activator="{on}">
      <v-text-field
        v-on="on"
        readonly
        v-bind="$attrs"
        @click:clear="handleClearClick"
        :value="value"
      >
        <template #append>
          <div style="padding-top: 3px;">
            <v-avatar :color="value" tile size="16"></v-avatar>
          </div>
        </template>
      </v-text-field>
    </template>
    <v-color-picker v-bind="$attrs" v-model="lazyValue" />
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

@Component({ name: 'AtroxColorPicker' })
export default class AtroxColorPicker extends Vue {
  @Prop({ type: [String, Object], default: null }) value!: string | Record<string, any>

  @Prop({ type: String, default: 'hex' }) valueType!:
    | 'hex'
    | 'hexa'
    | 'rgba'
    | 'hsla'
    | 'hsva'

  localChangeSign = false
  lazyValue: Record<string, any> | null = null

  @Watch('lazyValue', { deep: true })
  lazyValueChange() {
    this.$emit('input', this.lazyValue ? this.lazyValue[this.valueType] : null)
  }

  handleClearClick() {
    this.$emit('input', null)
  }
}
</script>
