import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  getOrderAPI,
  getOrderListAPI,
  updateOrderStateAPI,
  deleteOrderAPI,
  getSummaryListAPI,
  addSummaryListAPI,
  updateOrderSummaryStateAPI,
  deleteSummaryListAPI
} from '@/apis/order'
export const useOrderStore = defineStore('order', () => {
  const order = ref({})

  const orderList = ref([])
  const summaryList = ref([])
  const getOrder = async () => {
    const res = await getOrderAPI()
    order.value = res
  }

  const getOrderList = async () => {
    const res = await getOrderListAPI()
    orderList.value = res
  }

  // updateOrderStateAPI
  const updateOrderState = async (order_id, order_status) => {
    await updateOrderStateAPI(order_id, order_status)
    getOrderList()
  }
  // deleteOrderAPI
  const deleteOrder = async (order_id) => {
    await deleteOrderAPI(order_id)
    getOrderList()
  }
  // 获取汇总列表
  const getSummaryList = async () => {
    const res = await getSummaryListAPI()
    summaryList.value = res
  }
  // 添加汇总
  const addSummaryList = async (user_id, buildTime, totalMoney, totalCount) => {
    await addSummaryListAPI(user_id, buildTime, totalMoney, totalCount)
    getSummaryList()
  }
  // 修改汇总状态
  const updateOrderSummaryState = async (order_id, summary_status) => {
    await updateOrderSummaryStateAPI(order_id, summary_status)
    getOrderList()
  }
  // 删除汇总信息
  const deleteSummaryList = async (id) => {
    await deleteSummaryListAPI(id)
    getSummaryList()
  }

  const totalCount = computed(() => orderList.value.length)

  return {
    order,
    orderList,
    totalCount,
    summaryList,
    getOrder,
    getOrderList,
    updateOrderState,
    deleteOrder,
    getSummaryList,
    addSummaryList,
    updateOrderSummaryState,
    deleteSummaryList
  }
})
