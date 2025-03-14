import httpInstance from '@/utils/http'

export const refreshTokenAPI = (user_id, refreshToken) => {
  return httpInstance({
    method: 'post',
    url: '/user/refreshTokenUser',
    data: {
      user_id: user_id,
      refreshToken: refreshToken
    }
  })
}
