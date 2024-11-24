<template>
  <div class="loginIndex">
    <div class="loginBox">
      <span class="title">Music-ManageMent-System</span>
      <el-input
        class="inputAccount"
        v-model="inputAccount"
        style="width: 240px"
        placeholder="Account"
        minlength="6"
        maxlength="10"
        clearable
      />
      <el-input
        class="inputPassword"
        v-model="inputPassword"
        style="width: 240px"
        placeholder="Password"
        type="password"
        clearable
        show-password
      />
      <el-button class="loginBtn" @click="onClickLogin">Login</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import router from '@/router'
const loginerStore = useLoginerStore()
const inputAccount = ref('')
const inputPassword = ref('')
const onClickLogin = () => {
  if (inputAccount.value && inputPassword.value) {
    console.log(111)

    // 发送请求校验
    loginerStore.userInfo = {
      account: inputAccount.value,
      password: inputPassword.value,
      token: '1234567890tokenText',
      avatar:
        'http://119.29.168.176:8080/library_ssm/static/b930c9ad-0c11-46c0-af8e-467b801a9469_th%20(1).jpg',
      name: 'adminText',
      gender: '男',
      phone: '1234567890',
      email: '1234567890@qq.com'
    }
    router.replace({ path: '/' })
  }
}
</script>

<style lang="scss" scoped>
.loginIndex {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../../assets/loginBackImg.jpg') no-repeat center center;
  background-size: cover;
  position: fixed; /* 确保背景图固定在视口中 */
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(248, 247, 247, 0.5);
    width: 24%;
    height: 45%;
    background-color: rgba(57, 56, 56, 0.5);
    display: flex;
    flex-direction: column;

    align-items: center;
    .title {
      font-size: 1.5rem;
      color: #fff;
      margin: 2.5rem 0;
    }
    .inputAccount {
      margin-bottom: 30px;
      .el-input__inner {
        background-color: transparent;
        border: 1px solid #ccc; /* 可选：保持边框颜色 */
      }
    }
    .inputPassword {
      margin-bottom: 30px;
      .el-input__inner {
        background-color: transparent;
        border: 1px solid #ccc; /* 可选：保持边框颜色 */
      }
    }
    .loginBtn {
      width: 240px;
      color: rgb(100, 99, 99);
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>