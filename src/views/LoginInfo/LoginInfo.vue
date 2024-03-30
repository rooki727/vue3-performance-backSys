<template>
  <div class="userheader">
    <el-icon color="blue" size="4.6rem"><UserFilled /></el-icon>
    <span>{{ $t('messages.LoginerInfo') }}</span>
  </div>
  <el-divider content-position="left">{{ $t('messages.FollowTips') }}</el-divider>
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
        >{{ $t('messages.Basic_information') }}</el-menu-item
      >
      <el-menu-item
        index="/loginInfo/modifyawator"
        :class="{ 'is-active': $route.path === '/loginInfo/modifyawator' }"
        >{{ $t('messages.Modify_Awator') }}</el-menu-item
      >
      <el-menu-item
        index="/loginInfo/passwordmanagement"
        :class="{ 'is-active': $route.path === '/loginInfo/passwordmanagement' }"
        >{{ $t('messages.Password_management') }}</el-menu-item
      >
      <el-menu-item
        index="/loginInfo/cancelaccount"
        :class="{ 'is-active': $route.path === '/loginInfo/cancelaccount' }"
        >{{ $t('messages.Cancel_account') }}</el-menu-item
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