<script setup>
import UserTable from './components/UserTable.vue'
import { ref, onMounted } from 'vue'
import addDialog from './components/addDialog.vue'
import { ElMessage } from 'element-plus'

// 获取t方法才可以在js代码里使用

// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const tableCommonUser = ref([])

// 获取table数据
const getTableForm = async () => {
  // 请求接口
}

// 添加对话框
const dialogFormVisible = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}

// 点击打开添加表单
const openAddDialog = () => {
  dialogTitle.value = '添加用户'
  changeDialogVisible(true)
}

// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  tableCommonUser.value = [...tableCommonUser.value]
}
// 监听输入框的 input 事件，触发搜索功能
const handleSearch = (inputvalue) => {
  // 进行搜索操作，可以在这里触发相应的搜索逻辑
  console.log(111)
  // 备份原始数据
  const originalData = [...tableCommonUser.value]

  // 如果输入为空，恢复原始数据
  if (inputvalue === '') {
    tableCommonUser.value = [...tableCommonUser.value]
  } else {
    // 根据输入值过滤数据
    const filteredData = originalData.filter((item) => item?.name?.includes(inputvalue))
    // 更新表格数据
    tableCommonUser.value = filteredData
  }
}

// 批量删除功能
const delTableId = ref([])
const getDelTable = (value) => {
  delTableId.value = value
}
const blukDel = () => {
  if (delTableId.value.length > 0) {
    // 执行请求操作
    // delTableId.value.forEach((item) => deleteCommonUser(item))
    ElMessage({ type: 'success', message: '批量删除成功' })
    // 删除完后清空数据
    delTableId.value = []
  } else {
    ElMessage({
      type: 'error',
      message: '请勾选需要删除的数据'
    })
  }
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
  ></addDialog>
  <div class="search">
    <el-input
      label="search"
      v-model="searchInput"
      style="width: 33rem; margin-left: 1rem"
      placeholder="根据name搜索"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">重置</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem"
      ><el-icon><Plus /></el-icon>添加用户</el-button
    >
    <el-button type="danger" @click="blukDel"
      ><el-icon><DeleteFilled /></el-icon>批量删除</el-button
    >
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <UserTable :tableCommonUser="tableCommonUser" @getDelTable="getDelTable"></UserTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>