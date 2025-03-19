import httpInstance from '@/utils/http'

export function getAllSocialAPI() {
  return httpInstance({
    method: 'get',
    url: '/socialService/getAllSocial'
  })
}

// 根据用户获取
export function getSocialByUserAPI(user_id) {
  return httpInstance({
    method: 'get',
    url: `/socialService/getSocialByUser?user_id=${user_id}`
  })
}
// 删除
export function deleteSocialAPI(service_id) {
  return httpInstance({
    method: 'post',
    url: `/socialService/deleteSocial?service_id=${service_id}`
  })
}

// 添加
export function addSocialAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/socialService/addSocial',
    data
  })
}

// 修改
export function updateSocialAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/socialService/updateSocial',
    data
  })
}

// 审核
export function checkTaskAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/socialService/checkStatus',
    data
  })
}
