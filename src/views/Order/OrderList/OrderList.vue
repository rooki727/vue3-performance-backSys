<template>
  <SummaryOrder
    :originList="originList"
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @changeDialogVisible="changeDialogVisible"
  ></SummaryOrder>
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
    <el-button type="primary" round style="margin-left: 3rem" @click="handleReset">重置</el-button>
  </div>
  <div style="margin-top: 1.1rem; margin-left: 0.2rem">
    <el-input
      v-model="searchInputState"
      style="width: 16rem; margin-left: 1rem"
      :placeholder="$t('messages.searchStateName_input')"
      @input="handleSearchState"
      clearable
    ></el-input>
  </div>
  <div class="option">
    <el-button
      type="warning"
      round
      style="margin-top: 0.5rem; margin-left: 3rem"
      @click="handleSummary"
      >{{ $t('messages.summary') }}</el-button
    >
  </div>
  <el-divider content-position="center">{{ $t('messages.following_order') }}</el-divider>
  <OrderTable :orderList="orderList"></OrderTable>
</template>

<script setup>
import OrderTable from './components/OrderTable.vue'
import { useOrderStore } from '@/stores/OrderStore'
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import SummaryOrder from './components/SummaryOrder.vue'
const { t } = useI18n()
const OrderStore = useOrderStore()
const orderListComputed = computed(() => OrderStore.orderList)
const orderList = ref([])
// 搜索得到的数组
const filteredOrders = ref([])
// 存储原数组
const originList = ref([])
const searchInput = ref('')
const searchInputState = ref('')

const oringDate = [new Date(2013, 0, 1, 10, 10, 10), new Date()]
//
const valueDate = ref([new Date(2013, 0, 1, 10, 10, 10), new Date()]) // 从2013年1月1日到当前日期
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
    searchInputState.value = ''
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
    searchInputState.value = ''
    if (filteredOrders.value.length > 0) {
      filteredOrders.value = filteredOrders.value.filter((order) => {
        const orderDate = new Date(order.buildTime) // 将订单时间转换为日期对象
        return orderDate.getTime() >= value[0] && orderDate.getTime() <= value[1] // 比较时间戳是否相等
      })
    } else {
      filteredOrders.value = originList.value.filter((order) => {
        const orderDate = new Date(order.buildTime) // 将订单时间转换为日期对象
        return orderDate.getTime() >= value[0] && orderDate.getTime() <= value[1] // 比较时间戳是否相等
      })
    }

    orderList.value = filteredOrders.value
  } else {
    filteredOrders.value = []
    valueDate.value = [new Date(2013, 0, 1, 10, 10, 10), new Date()]
    if (searchInput.value) {
      handleSearch(searchInput.value)
    } else {
      orderList.value = originList.value
    }
  }
}

// 根据状态搜索

// 监听输入框的 input 事件，触发搜索功能
const handleSearchState = (inputvalue2) => {
  if (inputvalue2 === '') {
    // 如果输入为空，恢复原始数据
    orderList.value = originList.value
  } else {
    searchInput.value = ''
    filteredOrders.value = []

    valueDate.value = [new Date(2013, 0, 1, 10, 10, 10), new Date()]
    let filteredData
    filteredData = originList.value.filter((item) => item.order_status.includes(inputvalue2))
    orderList.value = filteredData
    // 更新表格数据
  }
  // 根据输入值过滤数据
}

// 重置函数
const handleReset = () => {
  searchInputState.value = ''
  searchInput.value = ''
  orderList.value = originList.value
  filteredOrders.value = []
  valueDate.value = [new Date(2013, 0, 1, 10, 10, 10), new Date()]
}
// 添加对话框
const dialogFormVisible = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}

// 点击打开汇总表单
const dialogTitle = ref('')
const handleSummary = () => {
  dialogTitle.value = t('messages.summary')
  changeDialogVisible(true)
}
onMounted(() => OrderStore.getOrderList())
</script>

<style lang="sass" scoped>
.demo-range .el-date-editor
  margin: 8px

.demo-range .el-range-separator
  box-sizing: content-box
</style>