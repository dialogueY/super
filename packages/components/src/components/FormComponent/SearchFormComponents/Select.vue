<!--
 * @Author: yangfeng
 * @Date: 2023-08-28 15:49:58
 * @LastEditors: yangfeng
 * @LastEditTime: 2023-08-30 13:40:09
 * @FilePath: \super\packages\components\src\components\FormComponent\SearchFormComponents\Select.vue
 * @Description: 
-->
<template>
  <el-select
			v-bind="searchProps"
			v-model="searchVal"
			:placeholder="searchProps?.placeholder ?? '请选择'"
			:clearable="searchProps?.clearable ?? false"
			@change="changeValue(searchVal)"
      style="width: 100%;"
		>
			<el-option v-for="(col, index) in columnEnum" :key="index" :label="col[fieldNames.label]" :value="col[fieldNames.value]" />
		</el-select>
</template>
<script lang="ts" setup>
import { ref,computed,watch } from "vue";
// import 
const {searchProps,searchParam} = defineProps<{searchProps:any,searchParam:any }>();

const columnEnum = ref<any>([]);

const initParams = async ()=>{
    // 如果传递了默认值，下拉选项使用默认值
    if(searchProps.defaultOptions){
      columnEnum.value = searchProps.defaultOptions;
    }
    if(searchProps.getOptions){
      columnEnum.value = await searchProps.getOptions();
    }
    // 如果有关联项，需要监听关联项的改变
    if(searchProps.link){
      searchProps.link.forEach((el:string)=>{
          watch(
            ()=>searchParam[el],
            ()=>{
              console.log(searchParam)
            },
            { deep: true, immediate: true }
          )
      })
    }
}
initParams();

// 判断 fieldNames 设置 label && value 的 key 值
const fieldNames = computed(() => {
	return {
		label: searchProps.fieldNames?.label ?? "label",
		value: searchProps.fieldNames?.value ?? "value"
	};
});

const searchVal = ref(searchProps.searchVal)

const changeValue = (val:any)=>{
  searchParam[searchProps.prop] = val;
}
</script>