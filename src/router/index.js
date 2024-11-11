import HomeIndex from '@/views/Home/HomeIndex.vue'
import LayoutIndex from '@/views/Layout/LayoutIndex.vue'
import LoginIndex from '@/views/Login/LoginIndex.vue'
import UserList from '@/views/User/UserList.vue'
import LoginInfo from '@/views/LoginInfo/LoginInfo.vue'
// import BasicInfo from '@/views/LoginInfo/BasicInfo/BasicInfo.vue'
// import CancelAccount from '@/views/LoginInfo/CancelAccount/CancelAccount.vue'
// import ModifyAwator from '@/views/LoginInfo/ModifyAwator/ModifyAwator.vue'
// import PasswordManagement from '@/views/LoginInfo/PasswordManagement/PasswordManagement.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: LayoutIndex,
      name: LayoutIndex,
      children: [
        {
          path: '/',
          component: HomeIndex,
          name: HomeIndex
        },
        {
          path: '/loginInfo',
          component: LoginInfo,
          name: LoginInfo
          // children: [
          //   {
          //     path: 'basicinfo',
          //     component: BasicInfo,
          //     name: BasicInfo
          //   },
          //   {
          //     path: 'modifyawator',
          //     component: ModifyAwator,
          //     name: ModifyAwator
          //   },
          //   {
          //     path: 'passwordmanagement',
          //     component: PasswordManagement,
          //     name: PasswordManagement
          //   },
          //   {
          //     path: 'cancelaccount',
          //     component: CancelAccount,
          //     name: CancelAccount
          //   }
          // ]
        },
        {
          path: '/user',
          component: UserList,
          name: UserList
        }
      ]
    },
    {
      path: '/login',
      component: LoginIndex,
      name: LoginIndex
    }
  ]
})

export default router
