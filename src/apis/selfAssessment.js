import httpInstance from '@/utils/http'

// 获取自我评估
export function getSelfAssessmentListAPI() {
  return httpInstance({
    method: 'get',
    url: '/selfAssessment/findAllSelfAssessment'
  })
}
// 根据用户id获取自我评估
export function getSelfAssessmentByIdAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/selfAssessment/findAllSelfAssessmentByUserId',
    data
  })
}

// 添加自我评估
export function addSelfAssessmentAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/selfAssessment/addSelfAssessment',
    data
  })
}

// 修改自我评估
export function updateSelfAssessmentAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/selfAssessment/updateSelfAssessment',
    data
  })
}
// 删除自我评估
export function deleteSelfAssessmentAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/selfAssessment/deleteSelfAssessment',
    data
  })
}
