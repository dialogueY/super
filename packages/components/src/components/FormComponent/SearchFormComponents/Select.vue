<!--
 * @Author: yangfeng
 * @Date: 2023-08-28 15:49:58
 * @LastEditors: yangfeng
 * @LastEditTime: 2023-08-28 17:00:55
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
import { ref,computed } from "vue";
// import 
const {searchProps} = defineProps<{searchProps:any }>();

const columnEnum = ref<any>([]);

const initParams = async ()=>{
    if(searchProps.defaultOptions){
      columnEnum.value = searchProps.defaultOptions;
    }
    if(searchProps.getOptions){
      columnEnum.value = await searchProps.getOptions();
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

interface FilterEmits {
	(e: "changeValue", prop:string,value: any): void;
}
const emit = defineEmits<FilterEmits>();
const changeValue = (val:any)=>{
  emit("changeValue",searchProps.prop,val);
}
</script>