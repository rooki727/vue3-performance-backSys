<script setup>
import IndicatorsTable from './components/IndicatorsTable.vue'
import { ref, onMounted, provide } from 'vue'
import addDialog from './components/addDialog.vue'
import { ElMessage } from 'element-plus'
import { getIndicatorListAPI } from '@/apis/indicators'

const dialogTitle = ref('')
// 表格内容
const indicatorsList = ref([])
const originalData = ref([])
// 获取table数据
const getTableForm = async () => {
  // 请求接口
  const res = await getIndicatorListAPI()
  // 判断是否成功
  if (res.code == 1) {
    indicatorsList.value = res.data
    originalData.value = res.data
  } else {
    ElMessage({ type: 'error', message: '获取指标列表失败' })
  }
}
// 使用 provide 暴露父组件的方法
provide('getTableForm', getTableForm)
// 添加对话框
const dialogFormVisible = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}

// 点击打开添加表单
const openAddDialog = () => {
  dialogTitle.value = '添加指标'
  changeDialogVisible(true)
}

// 加载网页加载数据
onMounted(() => {
  getTableForm()
})
</script>

<template>
  <addDialog
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @changeDialogVisible="changeDialogVisible"
    @updateList="getTableForm"
  ></addDialog>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem; margin-bottom: 1rem"
      ><el-icon><Plus /></el-icon>添加指标</el-button
    >
  </div>
  <span class="tips">温馨提示：修改或添加指标时，需调整占比值总和为1，（即100%）</span>
  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <IndicatorsTable
        :indicatorsList="indicatorsList"
        @getDelTable="getDelTable"
      ></IndicatorsTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
.tips {
  margin-left: 20px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  padding: 8px;
  background-color: #f0b63ac4;
  color: #f54708d8;
}
</style>