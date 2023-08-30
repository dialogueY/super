<!--
 * @Author: yangfeng
 * @Date: 2023-08-28 14:26:49
 * @LastEditors: yangfeng
 * @LastEditTime: 2023-08-28 16:59:52
 * @FilePath: \super\packages\components\src\components\FormComponent\SearchFormComponents\Input.vue
 * @Description: 
-->
<template>
  <el-input
			v-bind="searchProps"
			v-model="searchVal"
			:placeholder="searchProps?.eplaceholder ?? '请输入'"
			:clearable="searchProps?.clearable ?? false"
			@change="changeValue(searchVal)"
		>
		</el-input>
</template>
<script lang="ts" setup>
import { ref } from "vue";
// import 
const {searchProps,searchParam} = defineProps<{searchProps:any,searchParam:any }>();

const searchVal = ref(searchProps.searchVal)

const changeValue = (val:any)=>{
  searchParam[searchProps.prop] = val
}
</script>