import httpInstance from '@/utils/http'
// 查询物流信息列表
export const findAllLogisticsAPI = (page, pageSize) => {
  return httpInstance({
    url: `/logistics/findAllLogistics?page=${page}&pageSize=${pageSize}`,
    method: 'GET'
  })
}
export const findLogisticsByIdAPI = (order_id) => {
  return httpInstance({
    url: `/logistics/findLogisticsById?order_id=${order_id}`,
    method: 'GET'
  })
}
// 删除
export const deleteLogisticsAPI = (logistics_id) => {
  return httpInstance({
    url: '/logistics/deleteLogistics',
    method: 'POST',
    data: {
      logistics_id: logistics_id
    }
  })
}
// 添加
export const addLogisticsAPI = (
  order_id,
  company_name,
  company_tel,
  logistics_number,
  text,
  time
) => {
  return httpInstance({
    url: '/logistics/addLogistics',
    method: 'POST',
    data: {
      order_id: order_id,
      company_name: company_name,
      company_tel: company_tel,
      logistics_number: logistics_number,
      text: text,
      time: time
    }
  })
}
