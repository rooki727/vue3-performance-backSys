<script setup>
import UserTable from './components/UserTable.vue'
import { ref, onMounted, provide } from 'vue'
import addDialog from './components/addDialog.vue'
import { ElMessage } from 'element-plus'
import { getAllTeacherAPI, deleteUserAPI } from '@/apis/user'
// 获取t方法才可以在js代码里使用

// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const tableCommonUser = ref([])
const originalData = ref([])
// 获取table数据
const getTableForm = async () => {
  // 请求接口
  const res = await getAllTeacherAPI()
  // 判断是否成功
  if (res.code == 1) {
    tableCommonUser.value = res.data
    originalData.value = res.data
  } else {
    ElMessage({ type: 'error', message: '获取用户列表失败' })
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
  dialogTitle.value = '添加教师'
  changeDialogVisible(true)
}

// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  tableCommonUser.value = [...originalData.value]
}
let debounceTimer = null // 在函数外部定义定时器变量，以保证它在多个调用之间是共享的

const handleSearch = (inputvalue) => {
  // 清除上一次的定时器
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  // 设置新的定时器
  debounceTimer = setTimeout(() => {
    // 如果输入为空，恢复原始数据
    if (inputvalue === '') {
      tableCommonUser.value = [...originalData.value]
    } else {
      // 根据输入值过滤数据
      const filteredData = originalData.value.filter((item) =>
        item?.real_name?.includes(inputvalue)
      )
      // 更新表格数据
      tableCommonUser.value = filteredData
    }
  }, 500) // 500毫秒后触发搜索，可以根据需要调整
}

// 批量删除功能
const delTableId = ref([])
const getDelTable = (value) => {
  delTableId.value = value
}
const blukDel = async () => {
  if (delTableId.value.length > 0) {
    // 执行请求操作（并行执行所有删除请求）
    const deletePromises = delTableId.value.map((item) => deleteUserAPI(item))

    // 等待所有删除请求完成
    await Promise.all(deletePromises)

    // 所有删除操作完成后
    ElMessage({ type: 'success', message: '批量删除成功' })

    // 删除完后清空数据
    delTableId.value = []

    // 在所有操作完成后再调用 getTableForm
    await getTableForm()
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
    @updateList="getTableForm"
  ></addDialog>
  <div class="search">
    <el-input
      label="search"
      v-model.lazy="searchInput"
      style="width: 33rem; margin-left: 1rem"
      placeholder="根据姓名搜索"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">重置</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem"
      ><el-icon><Plus /></el-icon>添加教师</el-button
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