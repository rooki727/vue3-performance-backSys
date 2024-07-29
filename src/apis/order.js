import httpInstance from '@/utils/http'

// 获取order
export const getOrderAPI = () => {
  return httpInstance({
    url: '/order/getOrderSum',
    method: 'GET'
  })
}

// 获取orderList
export const getOrderListAPI = () => {
  return httpInstance({
    url: '/order/findAllOrder',
    method: 'GET'
  })
}

// 修改订单状态
export const updateOrderStateAPI = (order_id, order_status) => {
  return httpInstance({
    url: '/order/updateOrder/',
    method: 'POST',
    data: {
      order_id: order_id,
      order_status: order_status
    }
  })
}

// 删除订单
export const deleteOrderAPI = (order_id) => {
  return httpInstance({
    url: '/order/deleteOrder',
    method: 'POST',
    data: {
      order_id: order_id
    }
  })
}

// 获取汇总列表
export const getSummaryListAPI = () => {
  return httpInstance({
    url: '/summary/findAllSummary',
    method: 'GET'
  })
}
// 修改订单汇总状态
export const updateOrderSummaryStateAPI = (order_id, summary_status) => {
  return httpInstance({
    url: '/order/updateSummaryStatus',
    method: 'POST',
    data: {
      order_id: order_id,
      summary_status: summary_status
    }
  })
}
// 添加汇总列表
export const addSummaryListAPI = (user_id, buildTime, totalMoney, totalCount) => {
  return httpInstance({
    url: '/summary/addSummary',
    method: 'POST',
    data: {
      user_id: user_id,
      buildTime: buildTime,
      totalMoney: totalMoney,
      totalCount: totalCount
    }
  })
}

// 删除汇总订单
export const deleteSummaryListAPI = (summary_id) => {
  return httpInstance({
    url: '/summary/deleteSummary',
    method: 'POST',
    data: { summary_id: summary_id }
  })
}
