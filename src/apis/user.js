import httpInstance from '@/utils/http'

export const getUserListAPI = () => {
  return httpInstance({
    url: '/users',
    method: 'GET'
  })
}

export const getAdminListAPI = () => {
  return httpInstance({
    url: '/adminList',
    method: 'GET'
  })
}

// 添加管理员
export const addAdminListAPI = (id, name, account, verify, gender, phone, email) => {
  return httpInstance({
    url: '/adminList',
    method: 'POST',
    data: {
      id: id,
      name: name,
      account: account,
      verify: verify,
      gender: gender,
      phone: phone,
      email: email
    }
  })
}
