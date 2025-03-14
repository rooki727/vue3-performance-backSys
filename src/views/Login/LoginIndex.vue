<template>
  <div class="loginIndex">
    <div class="loginBox">
      <span class="title">Linyinlu-ManageMent-System</span>
      <div class="inputDiv">
        <el-icon class="inputIcon"><User /></el-icon>
        <el-input
          class="inputAccount"
          v-model="inputAccount"
          style="width: 280px"
          placeholder="Account"
          minlength="6"
          maxlength="10"
          clearable
        />
      </div>
      <div class="inputDiv">
        <el-icon class="inputIcon"><Lock /></el-icon>
        <el-input
          class="inputPassword"
          v-model="inputPassword"
          style="width: 280px"
          placeholder="Password"
          type="password"
          clearable
          show-password
        />
      </div>
      <div class="inputDiv">
        <el-icon class="inputIcon"><Avatar /></el-icon>
        <el-dropdown @command="chooseRole" style="width: 280px">
          <span
            aria-expanded="false"
            class="el-dropdown-link"
            style="
              background-color: #fff;
              width: 280px;
              margin-bottom: 25px;
              padding-left: 10px;
              border: none;
              height: 30px;
              line-height: 30px;
              color: gray;
              border-radius: 3px;
            "
          >
            {{ choosedRole ? choosedRole : 'role' }}
            <el-icon class="el-icon--right" style="position: absolute; right: 0; font-size: 22px">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu style="width: 280px">
              <el-dropdown-item command="admin">管理员</el-dropdown-item>
              <el-dropdown-item command="teacher">教师</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-button class="loginBtn" @click="onClickLogin">Login</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { ElMessage } from 'element-plus'
import { loginAPI } from '@/apis/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginerStore = useLoginerStore()
const inputAccount = ref('')
const inputPassword = ref('')
const choosedRole = ref('')
const choosedRoleKey = ref('')
const chooseRole = (val) => {
  choosedRoleKey.value = val
  if (val === 'admin') {
    choosedRole.value = '管理员'
  } else if (val === 'teacher') {
    choosedRole.value = '教师'
  }
}
const onClickLogin = async () => {
  if (!choosedRole.value) {
    ElMessage.error('请选择角色')
    return
  }
  if (inputAccount.value && inputPassword.value) {
    // 发送请求校验
    const res = await loginAPI(
      parseInt(inputAccount.value),
      inputPassword.value,
      choosedRoleKey.value
    )
    console.log(res)

    if (res.code == '1') {
      loginerStore.setUserInfo(res.data)
      router.replace({ path: '/' })
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    ElMessage.error('请输入完成的账号密码')
    return
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
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(248, 247, 247, 0.5);
    width: 480px;
    height: 45%;
    background-color: rgba(25, 25, 25, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 1.5rem;
      color: #fff;
      margin: 2.5rem 0;
    }
    .inputDiv {
      display: flex;
      .inputIcon {
        color: #ffffff;
        font-size: 20px;
        margin-top: 3px;
        margin-right: 5px;
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
    }

    .loginBtn {
      width: 280px;
      color: rgb(100, 99, 99);
      font-size: 16px;
      font-weight: bold;
      margin-left: 24px;
    }
  }
}
</style>