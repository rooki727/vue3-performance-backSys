import httpInstance from '@/utils/http'

// 获取概要user
export const getUserListAPI = () => {
  return httpInstance({
    url: '/users',
    method: 'GET'
  })
}

// 获取管理员列表
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

// 修改管理员
export const updateAdminListAPI = (id, name, account, verify, gender, phone, email) => {
  return httpInstance({
    url: '/adminList/' + id,
    method: 'PATCH',
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
// 删除管理员
export const deleteAdminAPI = (id) => {
  return httpInstance({
    url: `/adminList/${id}`,
    method: 'DELETE'
  })
}

// 普通用户部分
// 获取普通用户列表
export const getCommonUserAPI = () => {
  return httpInstance({
    url: '/commonUserList',
    method: 'GET'
  })
}

// 添加普通用户
export const addCommonUserAPI = (id, name, account, verify, gender, phone, email) => {
  return httpInstance({
    url: '/commonUserList',
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

// 修改普通用户
export const updateCommonUserAPI = (id, name, account, verify, gender, phone, email) => {
  return httpInstance({
    url: '/commonUserList/' + id,
    method: 'PATCH',
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
// 删除普通用户
export const deleteCommonUserAPI = (id) => {
  return httpInstance({
    url: `/commonUserList/${id}`,
    method: 'DELETE'
  })
}
