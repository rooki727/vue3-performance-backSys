import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getUserListAPI, getAdminListAPI, addAdminListAPI } from '@/apis/user'
export const useUserStore = defineStore('user', () => {
  const user = reactive({})
  const adminList = reactive({})
  // 加上api请求
  const getUser = async () => {
    const res = await getUserListAPI()
    Object.assign(user, res[0])
  }
  //获取管理员
  const getAdminList = async () => {
    const res = await getAdminListAPI()
    Object.assign(adminList, res)
  }
  // 添加用户
  const addAdmin = async (id, name, account, verify, gender, phone, email) => {
    await addAdminListAPI(id, name, account, verify, gender, phone, email)
    getAdminList()
  }
  return {
    user,
    adminList,
    getUser,
    getAdminList,
    addAdmin
  }
})
