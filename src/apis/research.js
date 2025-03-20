import httpInstance from '@/utils/http'

export function getAllResearchAPI() {
  return httpInstance({
    method: 'get',
    url: '/research/getAllResearch'
  })
}

// 根据用户获取
export function getResearchByUserAPI(user_id) {
  return httpInstance({
    method: 'get',
    url: `/research/getResearchByUser?user_id=${user_id}`
  })
}
// 删除
export function deleteResearchAPI(research_id) {
  return httpInstance({
    method: 'post',
    url: `/research/deleteResearch?research_id=${research_id}`
  })
}

// 添加
export function addResearchAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/research/addResearch',
    data
  })
}

// 修改
export function updateResearchAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/research/updateResearch',
    data
  })
}

// 审核
export function checkStatusAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/research/checkStatus',
    data
  })
}
