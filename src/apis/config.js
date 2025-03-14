import httpInstance from '@/utils/http'
// 获取配置
export function getConfigAPI(params) {
  return httpInstance({
    method: 'get',
    url: '/config/getConfig',
    params
  })
}
// 设置配置
export function updateConfigAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/config/updateConfig',
    data
  })
}
