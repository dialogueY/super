<template>
  <SearchForm :formConfig="formConfig" ref="searchFormRef" :searchParam="searchParam">
    <template #searchBtn>
      <el-col :span="8" style="padding-left: 32px;" v-if="showSearch">
        <el-button type="primary" @click.stop="clickSearch">查询</el-button>
      </el-col>
    </template>
  </SearchForm>
  <el-table :data="tableData" style="width: 100%" ref="tableRef" :border="border">
    <!-- 默认插槽 -->
    <slot></slot>
    <template v-for="item in tableColumns" :key="item">
      <!-- // 序号列 -->
      <el-table-column v-bind="item" :index="getIndex" :align="item.align ?? 'left'" v-if="item.type == 'index'">
			</el-table-column>
      <!-- 多选列 -->
      <el-table-column
					v-bind="item"
					:align="item.align ?? 'left'"
					:reserve-selection="item.type == 'selection'"
					v-if="item.type == 'selection'"
				>
      </el-table-column>
      <!-- 普通列，可以自定义 -->
      <el-table-column
        v-bind="item"
        :align="item.align ?? 'left'"
        v-if="!item.type && item.isShow"
      >
        <!-- 表头的slot -->
        <template #header>
          <slot :name="`${item.prop}Header`" v-bind="item">{{ item.label }}</slot>
        </template>
        <!-- 表内容的slot -->
        <template #default="scope">
          <slot :name="item.prop" v-bind="scope">{{ scope.row[item.prop] }}</slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <slot name="pagination">
    <el-pagination
      style="margin-top: 24px;justify-content: end;"
      v-if="pagination"
      :current-page="pageable.currPage"
      :page-size="pageable.pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Number(pageable.total)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </slot>
</template>
<script lang="ts" setup>
import { ref,reactive, watch } from "vue";
import SearchForm from "../FormComponent/index.vue"
interface ProTableProps  {
  tableData?:any; // 表格数据，非比传；但是和requestApi必须传一个
	requestApi?: (params: any) => Promise<any>; // 请求表格数据的api ==> 非必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
  tableColumns?: any; // 列配置项
  showSearch?: boolean; //
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	tableData:[],
	pagination: true,
	border: true,
  tableColumns:[],
  showSearch:true
});

const tableRef = ref();

// 表单查询需要参数
const searchParam = ref<any>({})
// 表单展示需要参数
const formConfig = ref<any>([])
// 处理列
const tableColumns = ref<any>([]);
const handleColumns = (columns:any[])=>{
  formConfig.value = [];
  return columns.map((col:any)=>{
    // 给每一项 column 添加 isShow；还有其他的处理也可以在这里处理
		col.isShow = col.isShow ?? true;
    // 如果有查询参数需要添加到formConfig
    if(col.search){
      formConfig.value.push({
        label:col.label,
        prop:col.prop,
        ...col.search
      })
      searchParam.value[col.prop] = col.defaultValue || "";
    }
    return col;
  })
}
watch(
	() => props.tableColumns,
	columns => {
		tableColumns.value = handleColumns(columns)
	},
	{ deep: true, immediate: true }
);
// 分页内容
const pageable = reactive({
    // 当前页数
    currPage: 1,
    // 每页显示条数
    pageSize: 10,
    // 总条数
    total: 0
})
const tableData = ref([])
const getTableList = async () => {
		try {
      // 如果tableData是存在的
			if(props.tableData){
        // 如果tableData是对象
        if(props.tableData instanceof Object){
          tableData.value = props.tableData.data
          pageable.currPage = props.tableData.currPage;
          pageable.pageSize = props.tableData.pageSize;
          pageable.total = props.tableData.total;
        }else {
          tableData.value = props.tableData
        }
      }else {
        // 如果不存在需要请求
      }
		} catch (error) {
			console.log(error);
		}
};
// 监听数据
watch(
	() => props.tableData,
	() => {
		getTableList()
	},
	{ deep: true, immediate: true }
);
//序号自增
const getIndex = (index: number) => {
	const page = pageable.currPage;
	const pagesize = pageable.pageSize;
	// 当前页数 - 1 * 每页数据条数 + index + 1
	if (!page || !pagesize) {
		return index + 1;
	}
	return (page - 1) * pagesize + index + 1;
};

// 分页
const handleSizeChange = (val: number) => {
		pageable.currPage = 1;
		pageable.pageSize = val;
};
const handleCurrentChange = (val: number) => {
		pageable.currPage = val;
};
const searchFormRef = ref();
// 点击查询
const clickSearch = ()=>{
    console.log(searchParam.value)
}
</script>