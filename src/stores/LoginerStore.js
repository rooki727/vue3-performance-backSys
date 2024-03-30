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
      awatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      verify: 'First-level',
      name: 'rooki',
      gender: '男',
      phone: 1231231231,
      email: '123456@qq.com'
    })

    // 写api请求登陆人信息请求

    // 清空函数
    const clearUser = () => {
      userInfo.value = {}
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
