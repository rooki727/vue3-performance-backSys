import httpInstance from '@/utils/http'

// 获取指标列表
export const getIndicatorListAPI = () => {
  return httpInstance({
    url: '/indicators/findAllIndicators',
    method: 'get'
  })
}
// 添加指标
export const addIndicatorAPI = (data) => {
  return httpInstance({
    url: '/indicators/addIndicators',
    method: 'post',
    data
  })
}
// 修改指标
export const updateIndicatorAPI = (data) => {
  return httpInstance({
    url: '/indicators/updateIndicators',
    method: 'post',
    data
  })
}
// 删除指标
export const deleteIndicatorAPI = (data) => {
  return httpInstance({
    url: '/indicators/deleteIndicators',
    method: 'post',
    data
  })
}
