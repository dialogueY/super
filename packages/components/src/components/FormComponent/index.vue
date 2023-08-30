<!--
 * @Author: yangfeng
 * @Date: 2023-08-28 14:17:56
 * @LastEditors: yangfeng
 * @LastEditTime: 2023-08-30 13:39:19
 * @FilePath: \super\packages\components\src\components\FormComponent\index.vue
 * @Description: r
-->
<template>
  <el-form ref="formRef" :model="searchParam">
    <el-row>
      <el-col v-for="item in formConfig" :key="item.id" :span="item.col || 8">
        <el-form-item :label="`${item.label}`" :label-width="(item.labelWidth || 70) + 'px'">
          <component v-bind:is="components[item.type]"
          :searchProps="item" :searchParam="searchParam"></component>
        </el-form-item>
      </el-col>
      <slot name="searchBtn"></slot>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { watch, type Component } from "vue";
import FormInput from "./SearchFormComponents/Input.vue";
import FormSelect from "./SearchFormComponents/Select.vue";

interface ProTableProps {
	searchParam?: { [key: string]: any }; // 搜索参数
  formConfig?: any;
}

// 默认值
withDefaults(defineProps<ProTableProps>(), {
	searchParam: () => ({}),
  formConfig:[]
});
const components: { [key: string]: Component } = {
	Input:FormInput,
  Select:FormSelect
};
</script>