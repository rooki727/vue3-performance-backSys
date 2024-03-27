import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginerStore = defineStore(
  'userLogin',
  () => {
    // 定义登陆用户对象
    const userInfo = ref({
      token: '123213213213',
      nickname: 'rooki',
      account: 123456,
      awatar: '',
      verify: 'first'
    })

    // 写api请求

    // 清空函数
    const clearUser = () => {
      userInfo.value = null
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
