<script setup>
import { watch, ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import LanguageChange from '@/components/languageChange.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
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
onMounted(() => {
  changeBreadName()
})
</script>


<template>
  <!-- 顶部栏 -->
  <el-row class="header">
    <el-col :span="4">
      <el-icon @click="changeOpen" v-show="!props.isCollapse"><Fold /></el-icon>
      <el-icon @click="changeOpen" v-show="props.isCollapse"><Expand /></el-icon>
    </el-col>

    <el-col :span="20">
      <div class="right">
        <div class="isLogin" v-if="LoginerStore.userInfo.token">
          <span>rooki</span>
          <LanguageChange></LanguageChange>
        </div>
        <div class="noLogin" v-else>
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
  background-color: skyblue;
  position: relative;
  .right {
    position: absolute;
    top: 0.6rem;
    right: 3rem;
    .isLogin {
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
</style>