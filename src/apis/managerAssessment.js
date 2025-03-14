import httpInstance from '@/utils/http'

// 管理员评估
export function manageAssessmentAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/managerAssessment/manageAssessment',
    data
  })
}

// 更新评定
export function updateAssessmentAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/managerAssessment/updateAssessment',
    data
  })
}
// 获取id历史评定
export function getAssessmentByIdAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/managerAssessment/getAssessmentById',
    data
  })
}
// 删除评定
export function deleteAssessmentAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/managerAssessment/deleteAssessment',
    data
  })
}
