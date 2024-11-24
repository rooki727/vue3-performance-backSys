<script setup>
const props = defineProps(['isCollapse'])
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
        ><el-icon><Menu /></el-icon>音乐平台后台管理</span
      >
    </el-menu-item>
    <!-- 首页 -->
    <el-menu-item index="/" :class="{ 'is-active': $route.path === '/' }">
      <el-icon><House /></el-icon>
      <template #title>
        <span>首页</span>
      </template>
    </el-menu-item>
    <!-- 用户管理 -->

    <el-menu-item index="/user" :class="{ 'is-active': $route.path === '/user' }">
      <el-icon><User /></el-icon>
      <template #title>
        <span>用户管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/singer" :class="{ 'is-active': $route.path === '/singer' }">
      <el-icon><Star /></el-icon>
      <template #title>
        <span>歌手管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/playlists" :class="{ 'is-active': $route.path === '/playlists' }">
      <el-icon><Service /></el-icon>
      <template #title>
        <span>歌单管理</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>



<style scoped lang="scss">
.el-menu {
  border-right: none;
  background-color: transparent;

  .is-active {
    background-color: rgb(203, 228, 241);
    color: rgb(43, 133, 207);
  }
}
.logo {
  font-weight: 700;
  height: 100px;
  font-size: 18px;
  cursor: default;
}
.logo:hover {
  background-color: transparent;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12.5rem;
  min-height: 25rem;
}
</style>