<script setup>
import { watch, ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import LanguageChange from '@/components/languageChange.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { useRouter } from 'vue-router'
const Router = useRouter()
const LoginerStore = useLoginerStore()
const route = useRoute()
const props = defineProps(['isCollapse'])
const emit = defineEmits(['changeCollapse'])
const changeOpen = () => {
  emit('changeCollapse')
}
const secondBreadName = ref('')
const thitdBreadName = ref('')
const secondBread = ref(true)
const changeBreadName = () => {
  if (route.path === '/') {
    secondBread.value = false
  } else {
    secondBread.value = true
    // 导航switch ，也可以采用数组渲染形式，v-for,这样还能实现国际化
    // （实现国际化借助route里的name，在数组上加上对应的name  $t(`messages.${v-name}`)）
    switch (route.path) {
      case '/user/adminlist':
        secondBreadName.value = '用户管理'
        thitdBreadName.value = '管理员列表'
        break
      case '/user/userlist':
        secondBreadName.value = '用户管理'
        thitdBreadName.value = '用户列表'
        break
      case '/book/booklist':
        secondBreadName.value = '图书管理'
        thitdBreadName.value = '图书列表'
        break
      case '/book/bookcategory':
        secondBreadName.value = '图书管理'
        thitdBreadName.value = '图书分类'
        break
      case '/order/orderlist':
        secondBreadName.value = '订单管理'
        thitdBreadName.value = '订单列表'
        break
      case '/order/orderverify':
        secondBreadName.value = '订单管理'
        thitdBreadName.value = '订单审核'
        break
      case '/loginInfo/basicinfo':
        secondBreadName.value = '账号管理'
        thitdBreadName.value = '基本资料'
        break
      case '/loginInfo/modifyawator':
        secondBreadName.value = '账号管理'
        thitdBreadName.value = '修改头像'
        break
      case '/loginInfo/passwordmanagement':
        secondBreadName.value = '账号管理'
        thitdBreadName.value = '密码管理'
        break
      case '/loginInfo/cancelaccount':
        secondBreadName.value = '账号管理'
        thitdBreadName.value = '注销账号'
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

const getRmoveUse = inject('getRmove')
const clickRemove = () => {
  if (getRmoveUse) {
    getRmoveUse()
  }
}

const dialogVisible = ref(false)
const showPopoverConfirm = () => {
  dialogVisible.value = true
}
const cancelExit = () => {
  dialogVisible.value = false
  // 取消退出操作
}
const confirmExit = () => {
  // 执行退出登录操作，例如清除登录信息等
  dialogVisible.value = false
  // 确认退出操作
  LoginerStore.clearUser()
  Router.push('/login')
}

onMounted(() => {
  changeBreadName()
})
</script>


<template>
  <!-- 对话框确定栏 -->
  <el-dialog v-model="dialogVisible" :title="$t('messages.Warning')" width="350">
    <span>{{ $t('messages.Confirm_Exit') }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelExit">{{ $t('messages.Cancel') }}</el-button>
        <el-button type="primary" @click="confirmExit"> {{ $t('messages.Confirm') }} </el-button>
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
            <el-dropdown size="small" split-button type="primary" style="background-color: skyblue">
              <!-- 增加头像 -->
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span style="margin-left: 0.1875rem">
                {{ LoginerStore.userInfo.name }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/loginInfo/basicinfo')">{{
                    $t('messages.LoginerInfo')
                  }}</el-dropdown-item>

                  <el-dropdown-item @click="showPopoverConfirm">{{
                    $t('messages.Exit_Login')
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <el-divider direction="vertical" style="height: 24px" />
          <LanguageChange></LanguageChange>
        </div>
        <div class="noLogin" v-else>
          <RouterLink to="/login" style="text-decoration: none; color: white">{{
            $t('messages.pleaseLogin')
          }}</RouterLink>
          <el-divider direction="vertical" style="height: 24px" />
          <LanguageChange></LanguageChange>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-breadcrumb :separator-icon="ArrowRight" style="margin-top: 8px">
    <el-breadcrumb-item :to="{ path: '/' }" @click="clickRemove">{{
      $t('messages.home')
    }}</el-breadcrumb-item>
    <el-breadcrumb-item v-show="secondBread">{{ secondBreadName }}</el-breadcrumb-item>
    <el-breadcrumb-item v-show="secondBread">{{ thitdBreadName }}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-divider />
  <!-- router出口 -->
  <router-view></router-view>
</template>


<style scoped lang="scss">
.header {
  background-color: #409eff;
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