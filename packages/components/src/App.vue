<!--
 * @Author: yangfeng
 * @Date: 2023-08-28 13:02:26
 * @LastEditors: yangfeng
 * @LastEditTime: 2023-08-28 17:54:59
 * @FilePath: \super\packages\components\src\App.vue
-->
<template>
  <TableComponent :tableColumns="tableColumns" :tableData="tableData">
    <template #createByHeader>
      自定义表头
    </template>
    <template #createBy="{row}">
      {{ row.createBy + '啊' }}
    </template>
    <template #operation>
      <el-link type="primary">编辑</el-link>
    </template>
  </TableComponent>
</template>
<script setup lang="ts">
import TableComponent from "./components/TableComponent/index.vue";
const tableColumns = [
  { type: "selection", fixed: "left", width: 48 },
	{ type: "index", label: "序号", width: 80 },
  {
		prop: "createplace",
		label: "创建地点",
    search: { 
      type: "Select",
      defaultOptions:[{
        label:"北京",
        value:"beijing"
      }] 
    },
		minWidth: 120
	},
	{
		prop: "createBy",
		label: "创建人",
    search: { type: "Input" },
		minWidth: 120
	},
	{
		prop: "createTime",
		label: "创建时间",
		minWidth: 160
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 240 }
]
const tableData = {
  data:[{
    createBy:"张三"
  }],
  total:1,
  pageSize:10,
  currPage:1
}
</script>