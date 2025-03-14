<script setup>
import { watch, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { useRouter } from 'vue-router'
const Router = useRouter()
const LoginerStore = useLoginerStore()
const circleUrl = '/avatar.jpg'
const route = useRoute()
const props = defineProps(['isCollapse'])
const emit = defineEmits(['changeCollapse'])
const changeOpen = () => {
  emit('changeCollapse')
}
const secondBreadName = ref('')
const secondBread = ref(true)
const changeBreadName = () => {
  if (route.path === '/') {
    secondBread.value = false
  } else {
    secondBread.value = true
    // 导航switch ，也可以采用数组渲染形式，v-for,这样还能实现国际化
    // （实现国际化借助route里的name，在数组上加上对应的name  $t(`messages.${v-name}`)）
    switch (route.path) {
      case '/user':
        secondBreadName.value = '用户管理'
        break
      case '/loginInfo/basicinfo':
        secondBreadName.value = '基础信息'
        break
      case '/loginInfo/modifyawator':
        secondBreadName.value = '修改头像'
        break
      case '/loginInfo/passwordmanagement':
        secondBreadName.value = '修改密码'
        break
      case '/loginInfo/cancelaccount':
        secondBreadName.value = '注销账号'
        break
      case '/indicatorsSettings':
        secondBreadName.value = '指标设置'
        break
      case '/teacherPerIndicators':
        secondBreadName.value = '当前季度绩效评定'
        break
      case '/perManage':
        secondBreadName.value = '教师历史季度绩效管理'
        break
      case '/academyPer':
        secondBreadName.value = '学院季度绩效统计报表'
        break
      case '/perSelf':
        secondBreadName.value = '绩效自评'
        break
      case '/personHisPer':
        secondBreadName.value = '个人历史绩效'
        break
      case '/teacherPerNow':
        secondBreadName.value = '本季度绩效报表公示'
        break
      case '/personAssessment':
        secondBreadName.value = '个人绩效详情'
        break
      case '/adminAssessment':
        secondBreadName.value = '管理教师历史绩效详情'
        break
      default:
        // 默认情况下的处理逻辑
        break
    }
  }
}

watch(
  () => route.path,
  () => {
    changeBreadName()
  }
)

const dialogVisible = ref(false)
const showPopoverConfirm = () => {
  dialogVisible.value = true
}
const cancelExit = () => {
  dialogVisible.value = false
  // 取消退出操作
}
const confirmExit = async () => {
  // 执行退出登录操作，例如清除登录信息等
  dialogVisible.value = false
  // 确认退出操作
  const id = computed(() => LoginerStore.userInfo.id)
  console.log(id.value)
  // await resetAdminTokenAPI(id.value)
  LoginerStore.clearUser()
  Router.push('/login')
}

onMounted(() => {
  changeBreadName()
})
</script>


<template>
  <!-- 对话框确定栏 -->
  <el-dialog v-model="dialogVisible" title="提醒" width="350">
    <span>您确认退出要当前登录吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelExit">取消</el-button>
        <el-button type="primary" @click="confirmExit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 顶部栏 -->
  <el-row class="header">
    <el-col :span="4">
      <el-icon @click="changeOpen" v-show="!props.isCollapse" style="cursor: pointer"
        ><Fold
      /></el-icon>
      <el-icon @click="changeOpen" v-show="props.isCollapse" style="cursor: pointer"
        ><Expand
      /></el-icon>
    </el-col>

    <el-col :span="20">
      <div class="right">
        <div class="isLogin" v-if="LoginerStore.userInfo?.token">
          <div class="uerinfo">
            <el-dropdown size="small" style="background-color: transparent">
              <!-- 增加头像和id -->
              <div class="avatarName">
                <el-avatar
                  size="small"
                  :src="LoginerStore.userInfo?.avatar ? LoginerStore.userInfo?.avatar : circleUrl"
                />
                <span style="margin-left: 0.5rem">
                  {{ LoginerStore.userInfo.real_name || LoginerStore.userInfo.account }}
                </span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.replace('/loginInfo/basicinfo')"
                    >个人信息</el-dropdown-item
                  >

                  <el-dropdown-item @click="showPopoverConfirm">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <el-divider direction="vertical" style="height: 24px" />
        </div>
        <div class="noLogin" v-else>
          <RouterLink to="/login" style="text-decoration: none; color: white">请先登录</RouterLink>
          <el-divider direction="vertical" style="height: 24px" />
        </div>
      </div>
    </el-col>
  </el-row>
  <el-alert
    title="系统自使用当天起，从每年的1月起，三个月为一个季度，每位教师的自评数据会在管理员评定后七天自动清除，管理员评定后综合绩效会自动呈现在历史绩效报表中，请前往查看。"
    type="warning"
  />
  <el-breadcrumb :separator-icon="ArrowRight" style="padding-top: 8px; padding-bottom: 18px">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="secondBread">{{ secondBreadName }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- router出口 -->
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="route.meta.keepAlive">
      <component :is="Component" />
    </keep-alive>
    <component v-else :is="Component" />
  </router-view>
</template>


<style scoped lang="scss">
.header {
  background: linear-gradient(
    to right,
    rgb(73, 104, 243),
    rgb(71, 103, 247),
    rgb(108, 131, 236),
    rgb(149, 166, 241)
  ) !important;

  position: relative;
  .right {
    position: absolute;
    top: 0.5rem;
    right: 3rem;

    .isLogin {
      display: flex;
    }
    .noLogin {
      display: flex;
    }
  }
  .el-icon {
    color: white;
    padding: 0.5rem 0;
    font-size: 1.6rem;
    line-height: 1.6rem;
  }
}
.avatarName {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 0.9375rem;
}

// 头像
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>