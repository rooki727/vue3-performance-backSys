import HomeIndex from '@/views/Home/HomeIndex.vue'
import LayoutIndex from '@/views/Layout/LayoutIndex.vue'
import LoginIndex from '@/views/Login/LoginIndex.vue'
import UserList from '@/views/User/UserList.vue'
import LoginInfo from '@/views/LoginInfo/LoginInfo.vue'
import BasicInfo from '@/views/LoginInfo/BasicInfo/BasicInfo.vue'
import ModifyAwator from '@/views/LoginInfo/ModifyAwator/ModifyAwator.vue'
import PasswordManagement from '@/views/LoginInfo/PasswordManagement/PasswordManagement.vue'
import AcademyPer from '@/views/AcademyPer/AcademyPerIndex.vue'
import PerManage from '@/views/PerManage/PerManageIndex.vue'
import PersonHisPer from '@/views/PersonHisPer/PersonHisPerIndex.vue'
import PerSelf from '@/views/PerSelf/PerSelfIndex.vue'
import TeacherPerIndicators from '@/views/TeacherPerIndicators/TeacherPerIndicatorsIndex.vue'
import TeacherPerNow from '@/views/TeacherPerNow/TeacherPerNowIndex.vue'
import indicatorsSettings from '@/views/indicatorsSettings/indicatorsSettingsIndex.vue'
import PersonAssessment from '@/views/PersonAssessment/PersonAssessmentIndex.vue'
import AdminAssessment from '@/views/AdminAssessment/AdminAssessmentIndex.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useLoginerStore } from '@/stores/LoginerStore'

import { computed } from 'vue'
import { ElMessage } from 'element-plus'
const requireRole = (role) => (to, from, next) => {
  const loginerStore = useLoginerStore()
  loginerStore.getUserInfo()
  const userRole = computed(() => loginerStore.userInfo.role)
  if (userRole.value !== role) {
    next(false) // 阻止路由跳转
  } else {
    next()
  }
}
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
            }
          ]
        },
        {
          path: '/user',
          component: UserList,
          name: 'UserList',
          beforeEnter: requireRole('admin')
        },
        {
          path: '/indicatorsSettings',
          component: indicatorsSettings,
          name: 'indicatorsSettings',
          beforeEnter: requireRole('admin')
        },
        {
          path: '/academyPer',
          component: AcademyPer,
          name: 'AcademyPer',
          beforeEnter: requireRole('admin')
        },
        {
          path: '/perManage',
          component: PerManage,
          name: 'PerManage',
          beforeEnter: requireRole('admin'),
          meta: { keepAlive: true }
        },

        {
          path: '/teacherPerIndicators',
          component: TeacherPerIndicators,
          name: 'TeacherPerIndicators',
          beforeEnter: requireRole('admin')
        },
        {
          path: '/adminAssessment',
          component: AdminAssessment,
          name: 'AdminAssessment',
          beforeEnter: requireRole('admin')
        },
        {
          path: '/personHisPer',
          component: PersonHisPer,
          beforeEnter: requireRole('teacher')
        },
        {
          path: '/perSelf',
          component: PerSelf,
          name: 'PerSelf',
          beforeEnter: requireRole('teacher')
        },
        {
          path: '/personAssessment',
          component: PersonAssessment,
          name: 'PersonAssessment',
          beforeEnter: requireRole('teacher')
        },
        {
          path: '/teacherPerNow',
          component: TeacherPerNow,
          name: 'TeacherPerNow'
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
  loginerStore.getUserInfo()
  const token = computed(() => loginerStore.userInfo.token)
  // 如果访问的路由需要登录权限，并且用户未登录
  if (to.name !== 'LoginIndex' && !token.value) {
    ElMessage({
      type: 'warning',
      message: '登录过期，请重新登录'
    })
    next({ name: 'LoginIndex' }) // 重定向到登录页面
  } else {
    next() // 允许通过
  }
})
export default router
