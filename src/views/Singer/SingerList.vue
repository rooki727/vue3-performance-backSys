<script setup>
import SingerTable from './components/SingerTable.vue'
import { ref, onMounted } from 'vue'
import addDialog from './components/addDialog.vue'
import { ElMessage } from 'element-plus'

// 获取t方法才可以在js代码里使用

// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const singerList = ref([
  {
    singer_id: 1,
    singer_img:
      'http://119.29.168.176:8080/library_ssm/static/5dbdd384-b94e-4727-80ac-632a931b0eea_th.jpg',
    name: '张三',
    gender: '男',
    country: '中国',
    birthday: '2000-01-01',
    introduction: '我太帅咯'
  },
  {
    singer_id: 2,
    singer_img: '',
    name: '李四',
    gender: '男',
    country: '小日子',
    birthday: '2000-01-01',
    introduction: '我太帅咯'
  }
])

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
  dialogTitle.value = '添加歌手'
  changeDialogVisible(true)
}

// 搜索功能
// 备份原始数据
const originalData = [...singerList.value]
const resetSearch = () => {
  searchInput.value = ''
  singerList.value = [...originalData]
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
      singerList.value = [...originalData]
    } else {
      // 根据输入值过滤数据
      const filteredData = originalData.filter((item) => item?.name?.includes(inputvalue))
      // 更新表格数据
      singerList.value = filteredData
    }
  }, 300) // 300毫秒后触发搜索，可以根据需要调整
}

// 批量删除功能
const delTableId = ref([])
const getDelTable = (value) => {
  delTableId.value = value
  console.log(delTableId.value)
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
      placeholder="根据歌手名字搜索"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">重置</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem"
      ><el-icon><Plus /></el-icon>添加歌手</el-button
    >
    <el-button type="danger" @click="blukDel"
      ><el-icon><DeleteFilled /></el-icon>批量删除</el-button
    >
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <SingerTable :singerList="singerList" @getDelTable="getDelTable"></SingerTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>