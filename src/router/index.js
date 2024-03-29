import BookCategory from '@/views/Book/BookCategory/BookCategory.vue'
import BookIndex from '@/views/Book/BookIndex.vue'
import BookList from '@/views/Book/BookList/BookList.vue'
import HomeIndex from '@/views/Home/HomeIndex.vue'
import LayoutIndex from '@/views/Layout/LayoutIndex.vue'
import LoginIndex from '@/views/Login/LoginIndex.vue'
import OrderIndex from '@/views/Order/OrderIndex.vue'
import OrderList from '@/views/Order/OrderList/OrderList.vue'
import OrderVerify from '@/views/Order/OrderVerify/OrderVerify.vue'
import AdminList from '@/views/User/Admin/AdminList.vue'
import UserList from '@/views/User/User/UserList.vue'
import UserIndex from '@/views/User/UserIndex.vue'
import LoginInfo from '@/views/LoginInfo/LoginInfo.vue'
import BasicInfo from '@/views/LoginInfo/BasicInfo/BasicInfo.vue'
import CancelAccount from '@/views/LoginInfo/CancelAccount/CancelAccount.vue'
import ModifyAwator from '@/views/LoginInfo/ModifyAwator/ModifyAwator.vue'
import PasswordManagement from '@/views/LoginInfo/PasswordManagement/PasswordManagement.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
          name: LoginInfo,
          children: [
            {
              path: 'basicinfo',
              component: BasicInfo,
              name: BasicInfo
            },
            {
              path: 'modifyawator',
              component: ModifyAwator,
              name: ModifyAwator
            },
            {
              path: 'passwordmanagement',
              component: PasswordManagement,
              name: PasswordManagement
            },
            {
              path: 'cancelaccount',
              component: CancelAccount,
              name: CancelAccount
            }
          ]
        },
        {
          path: '/user',
          component: UserIndex,
          name: UserIndex,
          children: [
            {
              path: 'adminlist',
              component: AdminList,
              name: AdminList
            },
            {
              path: 'userlist',
              component: UserList,
              name: UserList
            }
          ]
        },
        {
          path: '/book',
          component: BookIndex,
          name: BookIndex,
          children: [
            {
              path: 'booklist',
              component: BookList,
              name: BookList
            },
            {
              path: 'bookcategory',
              component: BookCategory,
              name: BookCategory
            }
          ]
        },
        {
          path: '/order',
          component: OrderIndex,
          name: OrderIndex,
          children: [
            {
              path: 'orderlist',
              component: OrderList,
              name: OrderList
            },
            {
              path: 'orderverify',
              component: OrderVerify,
              name: OrderVerify
            }
          ]
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
