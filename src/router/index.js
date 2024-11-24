import HomeIndex from '@/views/Home/HomeIndex.vue'
import LayoutIndex from '@/views/Layout/LayoutIndex.vue'
import LoginIndex from '@/views/Login/LoginIndex.vue'
import UserList from '@/views/User/UserList.vue'
import LoginInfo from '@/views/LoginInfo/LoginInfo.vue'
import BasicInfo from '@/views/LoginInfo/BasicInfo/BasicInfo.vue'
import CancelAccount from '@/views/LoginInfo/CancelAccount/CancelAccount.vue'
import ModifyAwator from '@/views/LoginInfo/ModifyAwator/ModifyAwator.vue'
import PasswordManagement from '@/views/LoginInfo/PasswordManagement/PasswordManagement.vue'
import SingerList from '@/views/Singer/SingerList.vue'
import PlayLists from '@/views/Playlists/PlayLists.vue'
import SongList from '@/views/SongForm/SongList.vue'
import CommentList from '@/views/Comment/CommentList.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useLoginerStore } from '@/stores/LoginerStore'

import { computed } from 'vue'

const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: '/',
      component: LayoutIndex,
      name: 'LayoutIndex',
      children: [
        {
          path: '/',
          component: HomeIndex,
          name: 'HomeIndex',
          meta: { requiresAuth: true } // 需要登录的路由
        },
        {
          path: '/loginInfo',
          component: LoginInfo,
          name: 'LoginInfo',
          children: [
            {
              path: 'basicinfo',
              component: BasicInfo,
              name: 'BasicInfo'
            },
            {
              path: 'modifyawator',
              component: ModifyAwator,
              name: 'ModifyAwator'
            },
            {
              path: 'passwordmanagement',
              component: PasswordManagement,
              name: 'PasswordManagement'
            },
            {
              path: 'cancelaccount',
              component: CancelAccount,
              name: 'CancelAccount'
            }
          ]
        },
        {
          path: '/user',
          component: UserList,
          name: 'UserList'
        },
        {
          path: '/singer',
          component: SingerList,
          name: 'SingerList'
        },
        {
          path: '/playlists',
          component: PlayLists,
          name: 'PlayLists'
        },
        {
          path: '/songlist',
          component: SongList,
          name: 'SongList'
        },
        {
          path: '/comment', // 评论管理
          component: CommentList,
          name: 'CommentList'
        }
      ]
    },
    {
      path: '/login',
      component: LoginIndex,
      name: 'LoginIndex'
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const loginerStore = useLoginerStore()
  const token = computed(() => loginerStore.userInfo.token) // 模拟用户是否登录
  // 如果访问的路由需要登录权限，并且用户未登录
  if (to.name !== 'LoginIndex' && !token.value) {
    next({ name: 'LoginIndex' }) // 重定向到登录页面
  } else {
    next() // 允许通过
  }
})
export default router
