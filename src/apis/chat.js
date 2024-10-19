import httpInstance from '@/utils/http'

// 获取全部chat 的user
export const getUniqueUserIdsAPI = () => {
  return httpInstance({
    url: '/chat/getUniqueUserIds',
    method: 'GET'
  })
}
