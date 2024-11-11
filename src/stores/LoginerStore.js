import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { ElMessage } from 'element-plus'

export const useLoginerStore = defineStore(
  'userLogin',
  () => {
    // 定义登陆用户对象
    const userInfo = ref({})
    
    const clearUser = () => {
      userInfo.value = {}
    }
    return {
      userInfo,
      clearUser,
      
    }
  },
  {
    persist: true
  }
)
