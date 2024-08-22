<script setup>
import tableItem from './components/tableItem.vue'
import { ref, onMounted, watch, computed } from 'vue'
import addDialog from './components/addDialog.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const LoginerStore = useLoginerStore()
const login_id = computed(() => LoginerStore.userInfo.id)
const UserStore = useUserStore()
// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const tableformAdmin = ref([])

// 获取table数据
const getTableForm = async () => {
  UserStore.getAdminList()
}

// 添加对话框
const dialogFormVisible = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}

// 点击打开添加表单
const openAddDialog = () => {
  dialogTitle.value = t('messages.add_admin')
  changeDialogVisible(true)
}
const computedAdminList = computed(() => JSON.parse(JSON.stringify(UserStore.adminList)))
// 先将表单赋值给一个表格用于存储数据，实现页面搜索不需要加载api
const originalTableformAdmin = ref([])
// 使用 watch 监听 adminList 的变化
watch(
  () => computedAdminList.value,
  (newValue) => {
    tableformAdmin.value = newValue
    originalTableformAdmin.value = newValue
  },
  {
    deep: true
  }
)

// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  tableformAdmin.value = [...originalTableformAdmin.value]
}
// 监听输入框的 input 事件，触发搜索功能
const handleSearch = (inputvalue) => {
  // 进行搜索操作，可以在这里触发相应的搜索逻辑
  // 备份原始数据
  const originalData = [...originalTableformAdmin.value]

  // 如果输入为空，恢复原始数据
  if (inputvalue === '') {
    tableformAdmin.value = [...originalTableformAdmin.value]
  } else {
    // 根据输入值过滤数据
    const filteredData = originalData.filter((item) => item?.name?.includes(inputvalue))
    // 更新表格数据
    tableformAdmin.value = filteredData
  }
}

// 批量删除功能
const delTable = ref([])
const getDelTable = (value) => {
  delTable.value = value
}
const blukDel = () => {
  if (delTable.value.length > 0) {
    // 执行请求操作
    delTable.value.forEach((item) => {
      setTimeout(() => {
        UserStore.deleteAdmin(item, login_id.value)
      }, 400)
    })
    ElMessage({ type: 'success', message: '批量删除成功' })
    // 删除完后清空数据
    delTable.value = []
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
      ><el-icon><Plus /></el-icon>{{ $t('messages.add_admin') }}</el-button
    >
    <el-button type="danger" :disabled="LoginerStore.userInfo.verify !== 'first'" @click="blukDel"
      ><el-icon><DeleteFilled /></el-icon>{{ $t('messages.bluk_del') }}</el-button
    >
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <tableItem :tableformAdmin="tableformAdmin" @getDelTable="getDelTable"></tableItem>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>