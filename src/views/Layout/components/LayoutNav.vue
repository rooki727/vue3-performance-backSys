<script setup>
import { onMounted } from 'vue'

const props = defineProps(['isCollapse'])

//封装函数给点击首页时去除所有的is-active
const removeActive = () => {
  const removeMenus = document.querySelectorAll('#removeAcitve')
  removeMenus.forEach((item) => {
    item.classList.remove('is-active')
  })
}
onMounted(() => {
  removeActive()
})
defineExpose({ removeActive })
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
      <span>CJ音乐平台后台管理</span>
    </el-menu-item>
    <!-- 首页 -->
    <el-menu-item index="/" id="removeAcitve" :class="{ 'is-active': $route.path === '/' }">
      <el-icon><House /></el-icon>
      <template #title>
        <span>首页</span>
      </template>
    </el-menu-item>
    <!-- 用户管理 -->

    <el-menu-item index="/user" id="removeAcitve" :class="{ 'is-active': $route.path === '/user' }">
      <el-icon><User /></el-icon>
      <template #title>
        <span>用户管理</span>
      </template>
    </el-menu-item>
    <!-- <el-sub-menu
      index="/book"
      :class="{ 'is-active': $route.path.startsWith('/book') }"
      id="removeAcitve"
    >
      <template #title>
        <el-icon><Location /></el-icon>
        <span>{{ $t('messages.book_manage') }}</span>
      </template>
      <el-menu-item
        id="removeAcitve"
        index="/book/booklist"
        :class="{ 'is-active': $route.path === '/book/booklist' }"
        >{{ $t('messages.book_List') }}</el-menu-item
      >
      <el-menu-item
        index="/book/bookcategory"
        id="removeAcitve"
        :class="{ 'is-active': $route.path === '/book/bookcategory' }"
        >{{ $t('messages.book_catetory') }}</el-menu-item
      >
    </el-sub-menu> -->
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
  font-size: 19px;
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