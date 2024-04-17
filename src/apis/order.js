import httpInstance from '@/utils/http'

// 获取order
export const getOrderAPI = () => {
  return httpInstance({
    url: '/order',
    method: 'GET'
  })
}

// 获取orderList
export const getOrderListAPI = () => {
  return httpInstance({
    url: '/orderList',
    method: 'GET'
  })
}

// 获取MonthSaleList
export const getMonthSaleListAPI = () => {
  return httpInstance({
    url: '/MonthSaleList',
    method: 'GET'
  })
}

// 修改订单状态
export const updateOrderStateAPI = (id, state) => {
  return httpInstance({
    url: '/orderList/' + id,
    method: 'PATCH',
    data: {
      id: id,
      state: state
    }
  })
}

// 删除订单
export const deleteOrderAPI = (id) => {
  return httpInstance({
    url: `/orderList/${id}`,
    method: 'DELETE'
  })
}

// 获取汇总列表
export const getSummaryListAPI = () => {
  return httpInstance({
    url: '/SummaryList',
    method: 'GET'
  })
}

// 添加汇总列表
export const addSummaryListAPI = (name, account, time, totalMoney, totalCount) => {
  return httpInstance({
    url: '/SummaryList',
    method: 'POST',
    data: {
      name: name,
      account: account,
      time: time,
      totalMoney: totalMoney,
      totalCount: totalCount
    }
  })
}

// 修改订单状态
export const updateOrderSummaryStateAPI = (id, summaryState) => {
  return httpInstance({
    url: '/orderList/' + id,
    method: 'PATCH',
    data: {
      id: id,
      summaryState: summaryState
    }
  })
}

// 删除汇总订单
export const deleteSummaryListAPI = (id) => {
  return httpInstance({
    url: `/SummaryList/${id}`,
    method: 'DELETE'
  })
}
