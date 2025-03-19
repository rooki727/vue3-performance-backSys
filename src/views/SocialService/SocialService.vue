<script setup>
import SocialTable from './components/SocialTable.vue'
import { ref, onMounted, provide, computed } from 'vue'
import addDialog from './components/addDialog.vue'
import { ElMessage } from 'element-plus'
import { getAllSocialAPI, getSocialByUserAPI, deleteSocialAPI } from '@/apis/socialService'
import { isTeacher } from '@/utils/checkRole'
import { useLoginerStore } from '@/stores/LoginerStore'
import { useRoute } from 'vue-router'
const loginerStore = useLoginerStore()
loginerStore.getUserInfo()
const role = computed(() => loginerStore.userInfo.role)
const user_id = computed(() => loginerStore.userInfo.user_id)
// 搜索功能变量
const searchInput = ref('')
const route = useRoute()

// 表格内容
const socialTable = ref([])
const originalData = ref([])
// 获取table数据
const getTableForm = async () => {
  let res = null
  if (isTeacher(role.value)) {
    res = await getSocialByUserAPI(user_id.value)
  } else {
    res = await getAllSocialAPI()
  }
  // 判断是否成功
  if (res.code == 1) {
    socialTable.value = res.data
    originalData.value = res.data
  } else {
    ElMessage({ type: 'error', message: '获取任务列表失败' })
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
  changeDialogVisible(true)
}

// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  socialTable.value = [...originalData.value]
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
      socialTable.value = [...originalData.value]
    } else {
      // 根据输入值过滤数据
      const filteredData = originalData.value.filter((item) =>
        item?.real_name?.includes(inputvalue)
      )
      // 更新表格数据
      socialTable.value = filteredData
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
    const deletePromises = delTableId.value.map((item) => deleteSocialAPI(item))

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
onMounted(async () => {
  await getTableForm()
  if (route.query.real_name) {
    searchInput.value = route.query.real_name
    handleSearch(searchInput.value) // 赋值后手动触发搜索事件
  }
})
</script>

<template>
  <addDialog
    :dialogFormVisible="dialogFormVisible"
    @changeDialogVisible="changeDialogVisible"
    @updateList="getTableForm"
  ></addDialog>
  <div class="search" v-if="!isTeacher(role)">
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
      ><el-icon><Plus /></el-icon>上传社会服务</el-button
    >
    <el-popconfirm title="确认删除本行数据吗" @confirm="blukDel">
      <template #reference>
        <el-button type="danger"
          ><el-icon><DeleteFilled /></el-icon>批量删除</el-button
        ></template
      >
    </el-popconfirm>
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <SocialTable :socialTable="socialTable" @getDelTable="getDelTable"></SocialTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>