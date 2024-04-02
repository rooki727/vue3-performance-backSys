<script setup>
import tableItem from '../components/tableItem.vue'
import { ref, reactive, onMounted, watch } from 'vue'
import addDialog from '../components/addDialog.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'

// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const LoginerStore = useLoginerStore()
const UserStore = useUserStore()
// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const tableformAdmin = reactive([])
// 搜索功能
const submitSearch = () => {
  if (searchInput.value.length >= 5) {
    // 过滤条件拼接成新数据
    tableformAdmin.splice(
      0,
      tableformAdmin.length,
      ...tableformAdmin.filter((item) => item.name === searchInput.value)
    )
  }
}
const handleBlur = () => {
  if (!searchInput.value.trim()) {
    Object.assign(tableformAdmin, UserStore.adminList)
  }
}

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
  dialogTitle.value = t('messages.addUser')
  changeDialogVisible(true)
}
// 使用 watch 监听 adminList 的变化
watch(
  () => UserStore.adminList,
  (newValue) => {
    Object.assign(tableformAdmin, newValue)
  },
  {
    deep: true
  }
)

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
      @blur="handleBlur"
      clearable
    ></el-input>
    <el-button type="primary" @click="submitSearch" style="margin-left: 3rem">{{
      $t('messages.search')
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
    <el-button type="danger" :disabled="LoginerStore.userInfo.verify !== 'first'"
      ><el-icon><DeleteFilled /></el-icon>{{ $t('messages.bluk_del') }}</el-button
    >
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="getTable">
      <tableItem :tableformAdmin="tableformAdmin"></tableItem>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>