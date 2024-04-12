<script setup>
import UserTable from './components/UserTable.vue'
import { ref, onMounted, watch, computed } from 'vue'
import addDialog from './components/addDialog.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const LoginerStore = useLoginerStore()
const UserStore = useUserStore()
// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const tableCommonUser = ref([])

// 获取table数据
const getTableForm = async () => {
  UserStore.getCommonUser()
}

// 添加对话框
const dialogFormVisible = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}

// 点击打开添加表单
const openAddDialog = () => {
  dialogTitle.value = t('messages.addUser')
  changeDialogVisible(true)
}
const computedAdminList = computed(() => JSON.parse(JSON.stringify(UserStore.commonUserList)))
// 先将表单赋值给一个表格用于存储数据，实现页面搜索不需要加载api
const originaltableCommonUser = ref([])
// 使用 watch 监听 commonUserList 的变化
watch(
  () => computedAdminList.value,
  (newValue) => {
    tableCommonUser.value = newValue
    originaltableCommonUser.value = newValue
  },
  {
    deep: true
  }
)

// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  tableCommonUser.value = [...originaltableCommonUser.value]
}
// 监听输入框的 input 事件，触发搜索功能
const handleSearch = (inputvalue) => {
  // 进行搜索操作，可以在这里触发相应的搜索逻辑
  // 备份原始数据
  const originalData = [...originaltableCommonUser.value]

  // 如果输入为空，恢复原始数据
  if (inputvalue === '') {
    tableCommonUser.value = [...originaltableCommonUser.value]
  } else {
    // 根据输入值过滤数据
    const filteredData = originalData.filter((item) => item.name.includes(inputvalue))
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
    delTableId.value.forEach((item) => UserStore.deleteCommonUser(item))
    ElMessage({ type: 'success', message: '删除成功' })
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
      :placeholder="$t('messages.searchName_input')"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">{{
      $t('messages.reset')
    }}</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button
      @click="openAddDialog"
      type="warning"
      style="margin-left: 2rem"
      :disabled="LoginerStore.userInfo.verify !== 'first'"
      ><el-icon><Plus /></el-icon>{{ $t('messages.addUser') }}</el-button
    >
    <el-button type="danger" :disabled="LoginerStore.userInfo.verify !== 'first'" @click="blukDel"
      ><el-icon><DeleteFilled /></el-icon>{{ $t('messages.bluk_del') }}</el-button
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