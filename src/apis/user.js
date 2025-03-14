import httpInstance from '@/utils/http'

// 登录
export const loginAPI = (account, password, role) => {
  return httpInstance({
    method: 'post',
    url: '/user/login',
    data: {
      account: account,
      password: password,
      role: role
    }
  })
}

// 获取用户列表
export const getUserListAPI = () => {
  return httpInstance({
    method: 'get',
    url: '/user/findAll'
  })
}
// 根据用户id获取用户信息
export const getUserByIdAPI = (user_id) => {
  return httpInstance({
    method: 'post',
    url: '/user/getUserById',
    data: {
      user_id: user_id
    }
  })
}
// 修改个人用户基本信息
export const updateUserAPI = (user_id, real_name, gender, phone_number, email) => {
  return httpInstance({
    method: 'post',
    url: '/user/updateUser',
    data: {
      user_id: user_id,
      real_name: real_name,
      gender: gender,
      phone_number: phone_number,
      email: email
    }
  })
}
// 修改头像
export const updateAvatarAPI = (user_id, avatar) => {
  return httpInstance({
    method: 'post',
    url: '/user/updateUser',
    data: {
      user_id: user_id,
      avatar: avatar
    }
  })
}
// 修改密码
export const updatePasswordAPI = (user_id, password) => {
  return httpInstance({
    method: 'post',
    url: '/user/updateUser',
    data: {
      user_id: user_id,
      password: password
    }
  })
}
// 判断原密码是否正确
export const checkOldPasswordAPI = (user_id, password) => {
  return httpInstance({
    method: 'post',
    url: '/user/checkOldPassword',
    data: {
      user_id: user_id,
      password: password
    }
  })
}

// 获取验证码
export const getCaptchaAPI = () => {
  return httpInstance({
    method: 'get',
    url: '/user/generateCaptcha'
  })
}
// 删除用户
export const deleteUserAPI = (user_id) => {
  return httpInstance({
    method: 'post',
    url: '/user/deleteUser',
    data: {
      user_id: user_id
    }
  })
}

// 查询所有教师
export const getAllTeacherAPI = () => {
  return httpInstance({
    method: 'get',
    url: '/user/findAllTeacher'
  })
}
// 管理员修改用户信息
export const updateUserByAdminAPI = (data) => {
  return httpInstance({
    method: 'post',
    url: '/user/updateUserByAdmin',
    data
  })
}
// 添加用户
export const addUserAPI = (data) => {
  return httpInstance({
    method: 'post',
    url: '/user/addUser',
    data
  })
}
// 检验账号
export const checkUserAccountAPI = (account) => {
  return httpInstance({
    method: 'post',
    url: '/user/checkUserName',
    data: {
      account: account
    }
  })
}
