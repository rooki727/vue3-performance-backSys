<script setup>
// import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLoginerStore } from '@/stores/LoginerStore'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { getPhoneCodeAPI } from '@/apis/login'
// import { generateQRCodeAPI, checkLoginStatusAPI } from '@/apis/login'
// import axios from 'axios'

// 二维码部分变量
const qrCodeUrl = ref('/这是一个二维码，登陆去吧.png')
// let checkInterval

// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const LoginerStore = useLoginerStore()
const router = useRouter()
const showLoginWay = ref(
  localStorage.getItem('showLoginWay') ? localStorage.getItem('showLoginWay') : 'form'
)
// 系统使用须知列表
const notices = [
  t('messages.System_Notice'),
  t('messages.System_Notice2'),
  t('messages.System_Notice3'),
  t('messages.System_Notice4'),
  t('messages.System_Notice5'),
  t('messages.System_Notice6')
]
const loginerForm = reactive({
  account: '',
  password: ''
})
const formRef = ref(null)
// 账号密码登录规则
const rules = {
  account: [
    {
      required: true,
      message: t('messages.account_input'),
      trigger: 'blur'
    },
    {
      min: 5,
      message: t('messages.account_min'),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: t('messages.input_pass'),
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: t('messages.password_inputAll'),
      trigger: 'blur'
    }
  ]
}

// 短信登陆定义变量
const formPhoneRef = ref(null)
const getphoneCaptcha = ref('')
const phoneForm = reactive({
  phone: '',
  phoneCaptcha: ''
})
const rulesPhone = {
  phone: [
    {
      required: true,
      message: t('messages.base_phoneinput'),
      trigger: 'blur'
    },
    {
      min: 11,
      message: t('messages.base_phonerule'),
      trigger: 'blur'
    }
  ],
  phoneCaptcha: [
    {
      required: true,
      message: t('messages.captcha_input'),
      trigger: 'blur'
    }
  ]
}
const waiting = ref(false)
const remainingSeconds = ref(60)

// 提醒框组件功能使用
const centerDialogVisible = ref(false)
const changeDialogVisible = (value) => {
  centerDialogVisible.value = value
}

// 切换登陆方式部分
const handleCommand = (command) => {
  localStorage.setItem('showLoginWay', command)
  showLoginWay.value = command
}

// 账号密码登录部分
// 登陆发送请求调用LoginerStores的请求api方法
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      LoginerStore.getLoginerForm(parseInt(loginerForm.account), loginerForm.password)
        .then(() => {
          // 1. 提示用户登录成功
          ElMessage({ type: 'success', message: '登录成功' })
          // 2. 跳转首页
          router.replace({ path: '/' })
        })
        .catch((error) => {
          // 处理请求失败的情况
          console.error('获取用户信息失败:', error)
          // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
        })
    } else {
      // 如果表单验证不通过，出现dialog并且提醒
      centerDialogVisible.value = true
    }
  })
}

// 短信验证功能
const getVerificationCode = async () => {
  waiting.value = true
  let intervalId = setInterval(() => {
    remainingSeconds.value--
    if (remainingSeconds.value === 0) {
      clearInterval(intervalId)
      waiting.value = false
      remainingSeconds.value = 60
    }
  }, 1000)
  // 此处应该发送获取验证码的请求
  const res = await getPhoneCodeAPI()
  getphoneCaptcha.value = res.code
}
// 登陆发送请求调用LoginerStore的请求api方法
const submitPhoneForm = (formPhoneRef) => {
  if (!formPhoneRef) return
  formPhoneRef.validate(async (valid) => {
    if (valid) {
      if (phoneForm.phoneCaptcha === getphoneCaptcha.value) {
        // 将手机号作为api数据请求，获得该用户的信息
        LoginerStore.getLoginerPhone(phoneForm.phone)
          .then(() => {
            // 1. 提示用户登录成功
            ElMessage({ type: 'success', message: '登录成功' })
            // 2. 跳转首页
            router.replace({ path: '/' })
          })
          .catch((error) => {
            // 处理请求失败的情况
            console.error('获取用户信息失败:', error)
            // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
          })
      } else {
        ElMessage({ type: 'error', message: '登录失败' })
        console.log('erro')
      }
    } else {
      // 如果表单验证不通过，出现dialog并且提醒
      centerDialogVisible.value = true
    }
  })
}

// 二维码部分
// 获取二维码
// const generateQRCode = async () => {
//   const res = await generateQRCodeAPI()
//   qrCodeUrl.value = res.value
// }

// onMounted(() => {
//   // generateQRCode()
// })
</script>

<template>
  <DialogTip
    :TipMessage="$t('messages.passSubmit_tip')"
    :centerDialogVisible="centerDialogVisible"
    @changeDialogVisible="changeDialogVisible"
  ></DialogTip>
  <div class="loginDiv">
    <div class="loginText">
      <div class="textHeader">
        <el-icon size="4rem" style="color: rgb(76, 142, 168)"><Reading /></el-icon>
        <span class="spanTitle">{{ $t('messages.title') }}</span>
      </div>
      <el-divider />
      <div class="txetContent">
        <div class="iconRemind">
          <el-icon style="color: rgb(140, 140, 140)" size="1.4rem"><Warning /></el-icon>
          <span style="color: rgb(140, 140, 140); font-size: 1.1rem">图书管理系统使用须知</span>
        </div>

        <div class="lowContent">
          <ul>
            <li v-for="(notice, index) in notices" :key="index">{{ index + 1 }}、{{ notice }}</li>
          </ul>
        </div>
      </div>
    </div>
    <el-divider direction="vertical" style="height: 70%" />
    <div class="loginForm">
      <!-- 账号密码登录 -->
      <div class="form" v-if="showLoginWay === 'form'">
        <el-form
          ref="formRef"
          :model="loginerForm"
          label-width="auto"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item :label="$t('messages.account')" prop="account">
            <el-input
              style="width: 85%"
              type="text"
              autocomplete="off"
              v-model="loginerForm.account"
              :placeholder="$t('messages.account_input')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('messages.Password')"
            prop="password"
            style="padding-top: 0.6rem"
          >
            <el-input
              style="width: 85%"
              type="password"
              autocomplete="off"
              v-model="loginerForm.password"
              :placeholder="$t('messages.input_pass')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" style="color: #409eff; cursor: pointer">
                {{ $t('messages.switch_Login_method') }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="phoneLogin">{{
                    $t('messages.phoen_login')
                  }}</el-dropdown-item>
                  <el-dropdown-item command="qrCode">{{
                    $t('messages.qrCode_login')
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- 点击忘记密码可以前往重置密码页面 -->
            <el-link type="primary" :underline="false" style="margin-left: 14.2rem">{{
              $t('messages.forget_pass')
            }}</el-link>
          </el-form-item>
          <el-form-item style="padding-left: 5.2rem; padding-top: 2rem">
            <el-button
              id="loginbtn"
              type="primary"
              @click="submitForm(formRef)"
              style="width: 70%"
              >{{ $t('messages.login') }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 二维码登录 -->
      <div class="qrCode" v-if="showLoginWay === 'qrCode'" style="text-align: center">
        <h2>请扫描以下二维码登录</h2>
        <img :src="qrCodeUrl" alt="QR Code" />
        <el-dropdown
          @command="handleCommand"
          style="display: block; margin-top: 1.6rem; cursor: pointer"
        >
          <span class="el-dropdown-link" style="color: #409eff">
            {{ $t('messages.switch_Login_method') }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="phoneLogin">{{
                $t('messages.phoen_login')
              }}</el-dropdown-item>
              <el-dropdown-item command="form">{{ $t('messages.account_login') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- 短信验证登录 -->
      <div class="phoneLogin" v-if="showLoginWay === 'phoneLogin'" style="text-align: center">
        <el-form
          ref="formPhoneRef"
          :model="phoneForm"
          label-width="auto"
          class="demo-ruleForm"
          :rules="rulesPhone"
        >
          <el-form-item :label="$t('messages.phone')" prop="phone">
            <el-input
              style="width: 85%"
              type="text"
              autocomplete="off"
              v-model="phoneForm.phone"
              :placeholder="$t('messages.base_phoneinput')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('messages.Captcha')" prop="phoneCaptcha">
            <el-input
              style="width: 35%"
              type="text"
              autocomplete="off"
              v-model="phoneForm.phoneCaptcha"
              :placeholder="$t('messages.captcha_input')"
            ></el-input>

            <el-button v-if="!waiting" @click="getVerificationCode" style="margin-left: 4rem">{{
              $t('messages.generate_captcha')
            }}</el-button>
            <el-button v-else disabled style="margin-left: 5rem">
              {{ remainingSeconds }}s</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-dropdown
              @command="handleCommand"
              style="display: block; margin-top: 1.6rem; cursor: pointer"
            >
              <span class="el-dropdown-link" style="color: #409eff">
                {{ $t('messages.switch_Login_method') }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="qrCode">{{
                    $t('messages.qrCode_login')
                  }}</el-dropdown-item>
                  <el-dropdown-item command="form">{{
                    $t('messages.account_login')
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- 点击收不到信息可以前往重置手机号页面 -->
            <el-link type="primary" :underline="false" style="margin-left: 12rem">{{
              $t('messages.cannot_messages')
            }}</el-link>
          </el-form-item>
          <el-form-item style="padding-left: 5.2rem; padding-top: 2rem">
            <el-button
              id="phoneloginbtn"
              type="primary"
              @click="submitPhoneForm(formPhoneRef)"
              style="width: 70%"
              >{{ $t('messages.login') }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.loginDiv {
  width: 100%;
  height: 100vh;
  background-color: rgb(236, 235, 235, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .loginText {
    width: 50%;
    height: 70%;
    background-color: #fff;
    border-radius: 0.9375rem;
    .textHeader {
      padding-top: 1rem;
      padding-left: 3rem;
      display: flex;
      align-items: center;
      .spanTitle {
        margin-left: 1.2rem;
        font-size: 3rem;
        font-weight: 200;
        color: rgb(76, 142, 168);
      }
    }
    .txetContent {
      padding-top: 1rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      line-height: 1.5rem;
      .iconRemind {
        display: flex;
        align-items: center;
      }
      .lowContent {
        li {
          list-style: none;
          font-size: 0.9rem;
          color: rgb(169, 168, 168);
        }
      }
    }
  }
  .loginForm {
    width: 30%;
    height: 70%;
    background-color: white;
    border-radius: 0.9375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .form {
      height: 50%;
      width: 80%;
      background-color: rgba(243, 237, 237, 0.5);
      padding-top: 3rem;
      padding-left: 2.5rem;
    }
    .phoneLogin {
      height: 50%;
      width: 80%;
      background-color: rgba(243, 237, 237, 0.5);
      padding-top: 3rem;
      padding-left: 2.5rem;
    }
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>