import httpInstance from '@/utils/http'

// 获取概要user
export const getUserListAPI = () => {
  return httpInstance({
    url: '/user/getUserState',
    method: 'GET'
  })
}

// 获取管理员列表
export const getAdminListAPI = () => {
  return httpInstance({
    url: '/user/findAllAdmin',
    method: 'GET'
  })
}

// 检验添加的管理account是否存在
export const checkAdminAccountAPI = (account) => {
  return httpInstance({
    url: '/user/selectByAccount',
    method: 'POST',
    data: {
      account: account
    }
  })
}

// 检验添加的用户account是否存在
export const checkUserAccountAPI = (account) => {
  return httpInstance({
    url: '/user/selectByAccountUser',
    method: 'POST',
    data: {
      account: account
    }
  })
}

// 添加管理员
export const addAdminListAPI = (
  name,
  account,
  password,
  verify,
  gender,
  phone,
  email,
  buildTime
) => {
  return httpInstance({
    url: '/user/addAdmin',
    method: 'POST',
    data: {
      name: name,
      account: account,
      password: password,
      verify: verify,
      gender: gender,
      phone: phone,
      email: email,
      buildTime: buildTime
    }
  })
}

// 修改管理员
export const updateAdminListAPI = (id, name, account, verify, gender, phone, email, password) => {
  return httpInstance({
    url: '/user/updateAdmin',
    method: 'POST',
    data: {
      id: id,
      name: name,
      account: account,
      verify: verify,
      gender: gender,
      phone: phone,
      email: email,
      password: password
    }
  })
}
// 删除管理员
export const deleteAdminAPI = (id) => {
  return httpInstance({
    url: '/user/deleteAdmin',
    method: 'POST',
    data: {
      id: id
    }
  })
}

// 普通用户部分
// 获取普通用户列表
export const getCommonUserAPI = () => {
  return httpInstance({
    url: '/user/findAllUser',
    method: 'GET'
  })
}

// 添加普通用户
export const addCommonUserAPI = (
  name,
  account,
  password,
  verify,
  gender,
  phone,
  email,
  buildTime
) => {
  return httpInstance({
    url: '/user/addUser',
    method: 'POST',
    data: {
      name: name,
      account: account,
      password: password,
      verify: verify,
      gender: gender,
      phone: phone,
      email: email,
      buildTime: buildTime
    }
  })
}

// 修改普通用户
export const updateCommonUserAPI = (
  user_id,
  name,
  account,
  password,
  verify,
  gender,
  phone,
  email
) => {
  return httpInstance({
    url: '/user/updateUser',
    method: 'POST',
    data: {
      user_id: user_id,
      name: name,
      account: account,
      password: password,
      verify: verify,
      gender: gender,
      phone: phone,
      email: email
    }
  })
}
// 删除普通用户
export const deleteCommonUserAPI = (user_id) => {
  return httpInstance({
    url: '/user/deleteUser',
    method: 'POST',
    data: {
      user_id: user_id
    }
  })
}

// 获取验证码
export const getCaptchaAPI = () => {
  return httpInstance({
    url: '/user/generateCaptcha',
    method: 'GET'
  })
}
