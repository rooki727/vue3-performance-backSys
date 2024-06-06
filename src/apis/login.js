import httpInstance from '@/utils/http'

// 获取二维码
export const generateQRCodeAPI = () => {
  return httpInstance({
    url: '/api/generateQRCode',
    method: 'GET'
  })
}
// check二维码
export const checkLoginStatusAPI = () => {
  return httpInstance({
    url: '/api/checkLoginStatus',
    method: 'GET'
  })
}
// 获取电话号码短信
export const getPhoneCodeAPI = () => {
  return httpInstance({
    url: '/phoneCode',
    method: 'Get'
  })
}
// 通过号码获取用户信息
export const getLoginerPhoneAPI = (phone) => {
  return httpInstance({
    url: `/loginer/?phone=${phone}`,
    method: 'GET'
  })
}
// 验证账号密码登录并且返回数据
export const checkFormLoginAPI = (account, password) => {
  return httpInstance({
    url: 'user/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

// 根据id重新获取Loginer
export const getNewLoginerAPI = (id) => {
  return httpInstance({
    url: '/user/getLoginById',
    method: 'POST',
    data: {
      id: id
    }
  })
}

// 修改name, phone, email
export const updateBaseAPI = (id, name, phone, email) => {
  return httpInstance({
    url: '/user/updateAdmin',
    method: 'POST',
    data: {
      id: id,
      name: name,
      phone: phone,
      email: email
    }
  })
}

// 修改头像
export const uploadAvatarAPI = (id, awatar) => {
  return httpInstance({
    url: '/user/uploadAvatar',
    method: 'POST',
    data: {
      id: id,
      awatar: awatar
    }
  })
}

//更新密码
export const updatePasswordAPI = (id, password) => {
  return httpInstance({
    url: '/user/updatePassword',
    method: 'POST',
    data: {
      id: id,
      password: password
    }
  })
}
