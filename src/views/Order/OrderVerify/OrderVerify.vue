<template>
  <div>
    <el-date-picker
      v-model="valueDate"
      type="datetimerange"
      range-separator="To"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      @change="getDateChoose"
      :disabled-date="disabledDate"
    />
    <el-input
      v-model="searchInput"
      style="width: 16rem; margin-left: 1rem"
      :placeholder="$t('messages.user_idInput')"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" round style="margin-left: 3rem" @click="handleReset">{{
      $t('messages.reset')
    }}</el-button>
  </div>
  <div class="opTable" style="margin-top: 1.1rem; margin-left: 0.5rem">
    <el-button type="success" @click="exportToExcel">{{ $t('messages.Out_EXCEL') }}</el-button>
  </div>
  <el-divider content-position="center">{{ $t('messages.following_order') }}</el-divider>
  <OrderTable :orderList="orderList"></OrderTable>
</template>

<script setup>
import OrderTable from './components/OrderTable.vue'
import { useOrderStore } from '@/stores/OrderStore'
import { computed, onMounted, watch } from 'vue'
import * as XLSX from 'xlsx'
import { ref } from 'vue'

const OrderStore = useOrderStore()
const orderListComputed = computed(() => OrderStore.summaryList)
const orderList = ref([])
// 搜索得到的数组
const filteredOrders = ref([])
// 存储原数组
const originList = ref([])
const searchInput = ref('')

const oringDate = [new Date(2023, 0, 1, 10, 10, 10), new Date()]
//
const valueDate = ref([new Date(2023, 0, 1, 10, 10, 10), new Date()]) // 从2023年1月1日到当前日期
watch(
  () => orderListComputed.value,
  (newVal) => {
    orderList.value = newVal
    originList.value = orderList.value
  },
  {
    deep: true
  }
)

// 设置不可选时间函数
const disabledDate = (time) => {
  if (valueDate.value) {
    const start = new Date(valueDate.value[0])
    const end = new Date(valueDate.value[1])
    return time.getTime() < start.getTime() || time.getTime() > end.getTime()
  }
}

// 监听输入框的 input 事件，触发搜索功能
const handleSearch = (inputvalue) => {
  // 如果输入为空，恢复原始数据
  if (inputvalue === '') {
    filteredOrders.value = []
    if (valueDate.value !== oringDate) {
      // valueDate双向绑定一直能拿到最新的值
      getDateChoose(valueDate.value)
    } else {
      orderList.value = originList.value
    }
  } else {
    // 根据输入值过滤数据
    let filteredData
    if (filteredOrders.value.length > 0) {
      filteredData = filteredOrders.value.filter((item) => item.user_id == inputvalue)
    } else {
      filteredData = originList.value.filter((item) => item.user_id == inputvalue)
    }
    orderList.value = filteredData
    // 更新表格数据
  }
}
const getDateChoose = (value) => {
  if (value) {
    if (filteredOrders.value.length > 0) {
      filteredOrders.value = filteredOrders.value.filter((order) => {
        const orderDate = new Date(order.formattedBuildTime) // 将订单时间转换为日期对象
        return orderDate.getTime() >= value[0] && orderDate.getTime() <= value[1] // 比较时间戳是否相等
      })
    } else {
      filteredOrders.value = originList.value.filter((order) => {
        const orderDate = new Date(order.formattedBuildTime) // 将订单时间转换为日期对象
        return orderDate.getTime() >= value[0] && orderDate.getTime() <= value[1] // 比较时间戳是否相等
      })
    }

    orderList.value = filteredOrders.value
  } else {
    filteredOrders.value = []
    valueDate.value = [new Date(2023, 0, 1, 10, 10, 10), new Date()]
    if (searchInput.value) {
      handleSearch(searchInput.value)
    } else {
      orderList.value = originList.value
    }
  }
}

// 根据状态搜索

// 重置函数
const handleReset = () => {
  searchInput.value = ''
  orderList.value = originList.value
  filteredOrders.value = []
  valueDate.value = [new Date(2023, 0, 1, 10, 10, 10), new Date()]
}
// 导出表格功能
const exportToExcel = () => {
  // 创建一个Workbook对象
  const wb = XLSX.utils.book_new()
  // 将数据转换为Excel格式
  const wsData = [['summary_id', 'user_id', '汇总时间', '总消费金额', '总消费数量']]
  // 将JSON数据转换为CSV格式设置一个分隔符，然后将得到的字符串重新切割为数组
  const csvData = originList.value
    .map((order) => {
      return `${order.summary_id},${order.user_id},${order.formattedBuildTime},${order.totalMoney},${order.totalCount}`
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
  const fileName = 'SummaryList.xlsx' // 设置文件名，可以根据需要修改
  // 创建一个下载链接元素。
  const downloadLink = document.createElement('a')
  // 将 Blob 对象的 URL 赋值给下载链接的 href 属性。
  downloadLink.href = window.URL.createObjectURL(blob)
  downloadLink.download = fileName
  // 模拟点击下载链接，触发文件下载
  downloadLink.click()
}
onMounted(() => OrderStore.getSummaryList())
</script>

<style lang="scss" scoped>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>