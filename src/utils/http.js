import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'
import { useLoginerStore } from '@/stores/LoginerStore'
import { computed } from 'vue'
const httpInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// 拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const LoginerStore = useLoginerStore()
    const token = computed(() => LoginerStore.userInfo.token)
    if (!token.value) {
      router.push('/login')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    ElMessage({
      type: 'warning',
      // 具体可写后端提供的错误信息
      message: '请求错误'
    })
    // 401token失效处理
    if (error.response && error.response.data && error.response.data.error === 'Unauthorized') {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default httpInstance
