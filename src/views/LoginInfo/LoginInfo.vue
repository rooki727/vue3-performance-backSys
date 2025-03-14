<template>
  <div class="userheader">
    <el-icon color="skyblue" size="4.6rem"><UserFilled /></el-icon>
    <span style="color: gray">用户个人信息</span>
  </div>
  <el-divider content-position="center">以下为各项信息详情</el-divider>
  <div class="userInfoForm">
    <el-menu
      ellipsis
      class="el-menu-popper-demo"
      mode="horizontal"
      :popper-offset="16"
      style="max-width: 60rem"
      default-active="$route.path"
      router
    >
      <el-menu-item
        index="/loginInfo/basicinfo"
        :class="{ 'is-active': $route.path === '/loginInfo/basicinfo' }"
        >基本信息</el-menu-item
      >
      <el-menu-item
        index="/loginInfo/modifyawator"
        :class="{ 'is-active': $route.path === '/loginInfo/modifyawator' }"
        >修改头像</el-menu-item
      >
      <el-menu-item
        index="/loginInfo/passwordmanagement"
        :class="{ 'is-active': $route.path === '/loginInfo/passwordmanagement' }"
        >修改密码</el-menu-item
      >
    </el-menu>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.userheader {
  display: flex;
  align-items: center;
  margin-left: 2rem;

  span {
    margin-left: 0.5rem;
    font-size: 3.3rem;
  }
}

.userInfoForm {
  .el-menu-item {
    font-size: 1rem;
    width: 14rem;
  }
}
</style>