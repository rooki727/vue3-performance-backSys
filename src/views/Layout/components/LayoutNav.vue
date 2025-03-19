<script setup>
import { useLoginerStore } from '@/stores/LoginerStore'
import { computed } from 'vue'
const loginerStore = useLoginerStore()
const props = defineProps(['isCollapse'])
const isAdmin = computed(() => {
  return loginerStore.userInfo.role === 'admin'
})
</script>

<template>
  <el-menu
    class="el-menu-vertical-demo"
    default-active="$route.path"
    router
    :collapse="props.isCollapse"
    text-color="#fff"
  >
    <!-- 标题 -->
    <el-menu-item class="logo">
      <span
        ><el-icon><Menu /></el-icon>高校绩效管理系统</span
      >
    </el-menu-item>
    <!-- 首页 -->
    <router-link to="/" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/' }">
        <el-icon><House /></el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
    </router-link>
    <!-- 用户管理 -->
    <router-link to="/user" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/user' }" v-if="isAdmin">
        <el-icon><User /></el-icon>
        <template #title>
          <span>教师管理</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/indicatorsSettings" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/indicatorsSettings' }" v-if="isAdmin"
        ><el-icon><Setting /></el-icon>
        <template #title>
          <span>指标设置</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/teachingTask" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/teachingTask' }"
        ><el-icon><School /></el-icon>
        <template #title>
          <span>{{ isAdmin ? '教学任务管理' : '教学任务上传' }}</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/research" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/research' }"
        ><el-icon><Search /></el-icon>
        <template #title>
          <span>{{ isAdmin ? '科研项目管理' : '科研项目上传' }}</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/socialService" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/socialService' }"
        ><el-icon><Postcard /></el-icon>
        <template #title>
          <span>{{ isAdmin ? '社会服务管理' : '社会服务上传' }}</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/teacherPerIndicators" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/teacherPerIndicators' }" v-if="isAdmin"
        ><el-icon><Check /></el-icon>
        <template #title>
          <span>当前季度绩效评定</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/perManage" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/perManage' }" v-if="isAdmin"
        ><el-icon><SetUp /></el-icon>
        <template #title> <span>教师历史季度绩效管理</span> </template>
      </el-menu-item>
    </router-link>
    <router-link to="/academyPer" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/academyPer' }" v-if="isAdmin"
        ><el-icon><Flag /></el-icon
        ><template #title> <span>学院季度绩效统计报表</span> </template></el-menu-item
      >
    </router-link>
    <router-link to="/perSelf" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/perSelf' }" v-if="!isAdmin"
        ><el-icon><DataLine /></el-icon
        ><template #title> <span>绩效自评</span> </template></el-menu-item
      >
    </router-link>
    <router-link to="/personHisPer" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/personHisPer' }" v-if="!isAdmin"
        ><el-icon><Histogram /></el-icon
        ><template #title> <span>个人历史绩效</span> </template></el-menu-item
      >
    </router-link>
    <router-link to="/teacherPerNow" class="router-link-item">
      <el-menu-item :class="{ 'is-active': $route.path === '/teacherPerNow' }"
        ><el-icon><TrendCharts /></el-icon
        ><template #title> <span>本季度绩效报表公示</span> </template></el-menu-item
      >
    </router-link>
  </el-menu>
</template>



<style scoped lang="scss">
.router-link-item {
  text-decoration: none;
}
.el-menu {
  border-right: none;
  background-color: transparent;

  .is-active {
    background-color: rgb(203, 228, 241);
    color: rgb(43, 133, 207);
  }
}
.el-menu-item:hover {
  background-color: rgb(101, 190, 238);
  color: rgb(15, 122, 210);
}
.logo {
  font-weight: 700;
  height: 100px;
  font-size: 18px;
  cursor: default;
}
.logo:hover {
  background-color: transparent;
  color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12.5rem;
  min-height: 25rem;
}
</style>