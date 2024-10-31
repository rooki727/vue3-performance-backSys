import httpInstance from '@/utils/http'

// 刷新临时token
export const refreshTokenAPI = (id, refreshToken) => {
  return httpInstance({
    url: '/user/refreshToken',
    method: 'POST',
    data: {
      id: id,
      refreshToken: refreshToken
    }
  })
}
