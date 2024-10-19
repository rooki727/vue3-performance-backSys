import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  checkFormLoginAPI,
  getLoginerPhoneAPI,
  updateBaseAPI,
  getNewLoginerAPI,
  updateAvatarAPI
} from '@/apis/login'
export const useLoginerStore = defineStore(
  'userLogin',
  () => {
    // 定义登陆用户对象
    const userInfo = ref({})

    // 写api请求登陆人信息请求
    const getLoginerForm = async (account, password) => {
      // 假设获取的是res
      const res = await checkFormLoginAPI(account, password)
      userInfo.value = res
    }
    // 清空函数
    const clearUser = () => {
      // 使用 Object.keys() 和 delete 关键字删除 userInfo 对象的所有属性
      userInfo.value = {}
    }
    // 重新获取该登录者的信息
    const getNewLoginer = async (id) => {
      const res = await getNewLoginerAPI(id)
      userInfo.value = res
    }
    // // check验证码，并且返回值部分，实际应用应放到loginerStore里
    // const checkLoginStatus = async () => {
    //   const res = await checkLoginStatusAPI()
    //   let checkInterval = setInterval(async () => {
    //     if (res.data.loggedIn) {
    //       clearInterval(checkInterval)
    //     }
    //   }, 2000)
    // }
    // onUnmounted(() => {
    //   clearInterval(checkInterval)
    // })

    // phone获取表单数据
    const getLoginerPhone = async (phone) => {
      phone = parseInt(phone)
      // 假设获取的是res
      const res = await getLoginerPhoneAPI(phone)
      Object.assign(userInfo, res[0])
    }
    // 修改基本资料
    const updateupdateBase = async (id, name, gender, phone, email) => {
      await updateBaseAPI(id, name, gender, phone, email).then((res) => {
        if (res.result) {
          ElMessage({
            message: '修改成功',
            type: 'success',
            plain: true
          })
          getNewLoginer(id)
        }
      })
    }
    // 更新头像
    const uploadAvatar = async (id, awatar) => {
      await updateAvatarAPI(id, awatar)
      getNewLoginer(id)
    }

    return {
      userInfo,
      clearUser,
      getLoginerForm,
      getLoginerPhone,
      updateupdateBase,
      getNewLoginer,
      uploadAvatar
    }
  },
  {
    persist: true
  }
)
