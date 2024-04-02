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
// 验证账号密码登录并且返回数据
export const checkFormLoginAPI = (account, password) => {
  return httpInstance({
    url: `/loginer/?account=${account}&password=${password}`,
    method: 'GET',
    data: {
      account,
      password
    }
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

// 根据id重新获取Loginer
export const getNewLoginerAPI = (id) => {
  return httpInstance({
    url: '/loginer/' + id,
    method: 'GET'
  })
}

// 修改name
export const updateBaseAPI = (id, name, phone, email) => {
  return httpInstance({
    url: '/loginer/' + id,
    method: 'PATCH',
    data: {
      name: name,
      phone: phone,
      email: email
    }
  })
}

// 修改头像
export const uploadAvatarAPI = (id, awatar) => {
  return httpInstance({
    url: '/loginer/' + id,
    method: 'PATCH',
    data: {
      awatar: awatar
    }
  })
}

//更新密码
export const updatePasswordAPI = (id, password) => {
  return httpInstance({
    url: '/loginer/' + id,
    method: 'PATCH',
    data: {
      password: password
    }
  })
}
