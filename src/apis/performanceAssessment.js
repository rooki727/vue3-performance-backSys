import httpInstance from '@/utils/http'

// 获取所有历史绩效
export function findAllPerformanceAPI(params) {
  return httpInstance({
    url: '/assessmentPerformance/findAllPerformance',
    method: 'get',
    params
  })
}

// 根据user_id获取历史绩效
export function getPerformancesAssessmentsByIdAPI(params) {
  return httpInstance({
    url: '/assessmentPerformance/getPerformancesAssessmentsById',
    method: 'get',
    params
  })
}

// 删除
export function deletePerformanceAPI(params) {
  return httpInstance({
    url: '/assessmentPerformance/deleteTeacherPerformance',
    method: 'get',
    params
  })
}
// 获取当前季度所有绩效
export function findAllPerformanceNowAPI(params) {
  return httpInstance({
    url: '/assessmentPerformance/findAllPerformanceNow',
    method: 'get',
    params
  })
}

// 获取学院统计情况
export function getCollegeStatisticsAPI() {
  return httpInstance({
    url: '/assessmentPerformance/getAcademyUserStatistics',
    method: 'get'
  })
}
