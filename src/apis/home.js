import httpInstance from '@/utils/http'

export const getTotalCountAPI = () => {
  return httpInstance({
    url: '/home/getTotalCount',
    method: 'get'
  })
}
// getAcademyCount
export const getAcademyCountAPI = () => {
  return httpInstance({
    url: '/home/getAcademyCount',
    method: 'get'
  })
}

// findIndicatorsScore
export const findIndicatorsScoreAPI = () => {
  return httpInstance({
    url: '/home/findIndicatorsScore',
    method: 'get'
  })
}
