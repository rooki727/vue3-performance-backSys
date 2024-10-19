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
    active-text-color="orange"
    background-color="rgb(25, 25, 130)"
    class="el-menu-vertical-demo"
    default-active="$route.path"
    router
    :collapse="props.isCollapse"
    text-color="#fff"
  >
    <el-menu-item>
      <span>{{ $t('messages.title') }}</span>
    </el-menu-item>
    <el-menu-item index="/" :class="{ 'is-active': $route.path === '/' }">
      <el-icon><House /></el-icon>
      <template #title>
        <span>{{ $t('messages.home') }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      index="/user"
      :class="{ 'is-active': $route.path.startsWith('/user') }"
      id="removeAcitve"
    >
      <template #title>
        <el-icon><Location /></el-icon>
        <span>{{ $t('messages.user_manage') }}</span>
      </template>
      <el-menu-item
        index="/user/adminlist"
        id="removeAcitve"
        :class="{ 'is-active': $route.path === '/user/adminlist' }"
        >{{ $t('messages.admin_list') }}</el-menu-item
      >
      <el-menu-item
        id="removeAcitve"
        index="/user/userlist"
        :class="{ 'is-active': $route.path === '/user/userlist' }"
        >{{ $t('messages.user_list') }}</el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu
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
    </el-sub-menu>
    <el-sub-menu
      index="/order"
      :class="{ 'is-active': $route.path.startsWith('/order') }"
      id="removeAcitve"
    >
      <template #title>
        <el-icon><Location /></el-icon>
        <span>{{ $t('messages.order_manage') }}</span>
      </template>
      <el-menu-item
        id="removeAcitve"
        index="/order/orderlist"
        :class="{ 'is-active': $route.path === '/order/orderlist' }"
        >{{ $t('messages.order_list') }}</el-menu-item
      >
      <el-menu-item
        id="removeAcitve"
        index="/order/orderverify"
        :class="{ 'is-active': $route.path === '/order/orderverify' }"
        >{{ $t('messages.order_check') }}</el-menu-item
      >
      <el-menu-item
        id="removeAcitve"
        index="/order/orderLogistics"
        :class="{ 'is-active': $route.path === '/order/orderLogistics' }"
        >{{ $t('messages.orderLogistics') }}</el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu
      index="/chat"
      :class="{ 'is-active': $route.path.startsWith('/chat') }"
      id="removeAcitve"
    >
      <template #title>
        <el-icon><Location /></el-icon>
        <span>{{ $t('messages.chatManager') }}</span>
      </template>
      <el-menu-item
        id="removeAcitve"
        index="/chat/chatservice"
        :class="{ 'is-active': $route.path === '/chat/chatservice' }"
        >{{ $t('messages.chatService') }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>



<style scoped lang="scss">
.el-menu {
  border-right: none;
  .is-active {
    background-color: rgb(112, 202, 238);
    color: white;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12.5rem;
  min-height: 25rem;
}
</style>