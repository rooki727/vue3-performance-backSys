import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginerStore = defineStore(
  'userLogin',
  () => {
    // 定义登陆用户对象
    const userInfo = ref({
      token: '1231231',
      id: 123123213,
      account: 123456,
      awatar: '',
      verify: 'First-level',
      name: 'rooki',
      gender: '男',
      phone: 1231231231,
      password: 12312312,
      email: '123456@qq.com'
    })

    // 写api请求登陆人信息请求

    // 清空函数
    const clearUser = () => {
      userInfo.value = {
        token: '',
        nickname: '',
        account: null,
        awatar: '',
        verify: ''
      }
    }
    return {
      userInfo,
      clearUser
    }
  },
  {
    persist: true
  }
)
