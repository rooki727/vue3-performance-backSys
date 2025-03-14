import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserByIdAPI } from '@/apis/user'
// import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
export const useLoginerStore = defineStore('userLogin', () => {
  // 定义登陆用户对象
  const userInfo = ref({})
  const SECRET_KEY = 'linyinlu789' // 加密的密钥，确保其安全存储

  const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
  }
  const decrypt = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }

  const clearUser = () => {
    userInfo.value = {}
    window.localStorage.removeItem('userInfoLinyinlu')
  }
  const setUserInfo = (user) => {
    userInfo.value = user
    const encryptedData = encrypt(userInfo.value)
    window.localStorage.setItem('userInfoLinyinlu', encryptedData)
    userInfo.value = decrypt(encryptedData)
    console.log(userInfo.value)
  }
  // 获取用户信息
  const getUserById = async () => {
    await getUserByIdAPI(userInfo.value.user_id).then((res) => {
      userInfo.value = res.data
    })
    const encryptedData = encrypt(userInfo.value)
    window.localStorage.setItem('userInfoLinyinlu', encryptedData)
  }
  const getUserInfo = () => {
    const encryptedData = window.localStorage.getItem('userInfoLinyinlu')
    if (encryptedData) {
      userInfo.value = decrypt(encryptedData)
    }
  }
  return {
    userInfo,
    clearUser,
    setUserInfo,
    getUserById,
    getUserInfo
  }
})
