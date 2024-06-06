<script setup>
import BookListTable from './components/BookListTable.vue'
import { ref, onMounted, watch, computed } from 'vue'
import addDialog from './components/addDialog.vue'
import { useBookStore } from '@/stores/BookStore'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'

// 获取t方法才可以在js代码里使用
const { t } = useI18n()

const BookStore = useBookStore()
// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const BookList = ref([])

// 获取table数据
const getTableForm = async () => {
  await BookStore.getbookList()
  await BookStore.getcategoryList()
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
const computedBookList = computed(() => JSON.parse(JSON.stringify(BookStore.bookList)))
// 先将表单赋值给一个表格用于存储数据，实现页面搜索不需要加载api
const originalBookList = ref([])
// 使用 watch 监听 commonUserList 的变化
watch(
  () => computedBookList.value,
  (newValue) => {
    BookList.value = newValue
    originalBookList.value = newValue
  },
  {
    deep: true
  }
)

// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  BookList.value = [...originalBookList.value]
}
// 监听输入框的 input 事件，触发name搜索功能
const handleSearch = (inputvalue) => {
  // 进行搜索操作，可以在这里触发相应的搜索逻辑
  // 备份原始数据
  const originalData = [...originalBookList.value]

  // 如果输入为空，恢复原始数据
  if (inputvalue === '') {
    BookList.value = [...originalBookList.value]
  } else {
    // 根据输入值过滤数据
    const filteredData = originalData.filter((item) => {
      return (
        item.book_name.includes(inputvalue) ||
        item.author.includes(inputvalue) ||
        item.category.includes(inputvalue)
      )
    })
    // 更新表格数据
    BookList.value = filteredData
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
    delTableId.value.forEach((item) => BookStore.deleteBookList(item))
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

// 导出表格功能
const exportToExcel = () => {
  // 创建一个Workbook对象
  const wb = XLSX.utils.book_new()
  // 将数据转换为Excel格式
  const wsData = [['书名', '作者', '分类', '价格', '状态', 'book_id', '入库时间']]
  // 将JSON数据转换为CSV格式设置一个分隔符，然后将得到的字符串重新切割为数组
  const csvData = BookList.value
    .map((book) => {
      return `${book.book_name},${book.author},${book.category},${book.price},${book.status},${book.book_id},${book.formattedBuildTime}`
    })
    .join('、')
  const LastArray = ref([])
  const dataArray = csvData.split('、')
  // 再次遍历每个数组字符串再次分割
  dataArray.forEach((item) => {
    LastArray.value.push(item.split(','))
  })
  wsData.push(...LastArray.value)
  // 将二维数组转换为工作表对象。
  const ws = XLSX.utils.aoa_to_sheet(wsData)

  // 将工作表添加到 Workbook 中，命名为 'Sheet1'。
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  //将 Workbook 对象转换为 Excel 文件的二进制数组。
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })

  // 将Excel文件保存到本地
  // 创建一个 Blob 对象，表示二进制数据。
  const blob = new Blob([wbout], { type: 'application/octet-stream' })
  const fileName = 'BookList.xlsx' // 设置文件名，可以根据需要修改
  // 创建一个下载链接元素。
  const downloadLink = document.createElement('a')
  // 将 Blob 对象的 URL 赋值给下载链接的 href 属性。
  downloadLink.href = window.URL.createObjectURL(blob)
  downloadLink.download = fileName
  // 模拟点击下载链接，触发文件下载
  downloadLink.click()
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
      :placeholder="$t('messages.searchBook_input')"
      @input="handleSearch"
      clearable
    ></el-input>

    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">{{
      $t('messages.reset')
    }}</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem"
      ><el-icon><Plus /></el-icon>{{ $t('messages.addBook') }}</el-button
    >

    <el-button type="danger" @click="blukDel"
      ><el-icon><DeleteFilled /></el-icon>{{ $t('messages.bluk_del') }}</el-button
    >

    <el-button type="success" @click="exportToExcel">{{ $t('messages.Out_EXCEL') }}</el-button>
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <BookListTable :BookList="BookList" @getDelTable="getDelTable"></BookListTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>