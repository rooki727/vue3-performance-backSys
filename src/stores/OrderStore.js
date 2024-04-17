import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  getOrderAPI,
  getOrderListAPI,
  getMonthSaleListAPI,
  updateOrderStateAPI,
  deleteOrderAPI,
  getSummaryListAPI,
  addSummaryListAPI,
  updateOrderSummaryStateAPI,
  deleteSummaryListAPI
} from '@/apis/order'
export const useOrderStore = defineStore('order', () => {
  const order = ref({})
  const MonthSaleList = ref([])
  const orderList = ref([])
  const summaryList = ref([])
  const getOrder = async () => {
    const res = await getOrderAPI()
    order.value = res
  }

  const getOrderList = async () => {
    const res = await getOrderListAPI()
    orderList.value = res
    const perOrderMoney = ref([])
    orderList.value.forEach((item) => {
      perOrderMoney.value.push(
        item.books.reduce(
          (total, itemBook) => total + parseInt(itemBook.price) * parseInt(itemBook.count),
          0
        )
      )
    })
    // 将 perOrderMoney 中的值赋值给 orderList 数组中每个对象的一个新属性
    orderList.value.forEach((order, index) => {
      order.perOrderMoney = perOrderMoney.value[index]
    })
  }
  const getMonthSaleList = async () => {
    const res = await getMonthSaleListAPI()
    MonthSaleList.value = res
  }

  // updateOrderStateAPI
  const updateOrderState = async (id, state) => {
    await updateOrderStateAPI(id, state)
    getOrderList()
  }
  // deleteOrderAPI
  const deleteOrder = async (id) => {
    await deleteOrderAPI(id)
    getOrderList()
  }
  // 获取汇总列表
  const getSummaryList = async () => {
    const res = await getSummaryListAPI()
    summaryList.value = res
  }
  // 添加汇总
  const addSummaryList = async (name, account, time, totalMoney, totalCount) => {
    await addSummaryListAPI(name, account, time, totalMoney, totalCount)
    getSummaryList()
  }
  // 修改汇总状态
  const updateOrderSummaryState = async (id, summaryState) => {
    await updateOrderSummaryStateAPI(id, summaryState)
    getOrderList()
  }
  // 删除汇总信息
  const deleteSummaryList = async (id) => {
    await deleteSummaryListAPI(id)
    getSummaryList()
  }
  const monthSale = computed(() =>
    MonthSaleList.value.reduce((total, item) => total + parseInt(item.count), 0)
  )
  const monthMoney = computed(() =>
    MonthSaleList.value.reduce((total, item) => total + parseInt(item.totalMoney), 0)
  )

  const totalCount = computed(() => orderList.value.length)

  return {
    order,
    monthSale,
    MonthSaleList,
    orderList,
    monthMoney,
    totalCount,
    summaryList,
    getOrder,
    getOrderList,
    getMonthSaleList,
    updateOrderState,
    deleteOrder,
    getSummaryList,
    addSummaryList,
    updateOrderSummaryState,
    deleteSummaryList
  }
})
