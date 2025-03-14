<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useLoginerStore } from '@/stores/LoginerStore'
// import { updatePasswordAPI } from '@/apis/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getCaptchaAPI, checkOldPasswordAPI, updatePasswordAPI } from '@/apis/user'
// 获取t方法才可以在js代码里使用
const ruleForm = reactive({
  Oripass: '',
  pass: '',
  checkPass: '',
  captcha: ''
})
const isRightOldPassword = ref(false)
const router = useRouter()
const LoginerStore = useLoginerStore()
// 图片验证码
const getcaptcha = ref([])
const captchaString = computed(() => getcaptcha.value.map((item) => item.value).join(''))
// 对象dom
const ruleFormRef = ref()
const checkOldPassword = async () => {
  const res = await checkOldPasswordAPI(LoginerStore.userInfo.user_id, ruleForm.Oripass)
  isRightOldPassword.value = res.data
}
// 确定密码函数
const validateConfirm = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
// 提醒框组件功能使用
const centerDialogVisible = ref(false)
const changeDialogVisible = (value) => {
  centerDialogVisible.value = value
}
const submitForm = (formRef) => {
  // 调用表单的 validate 方法进行验证
  formRef.validate(async (valid) => {
    if (valid) {
      // 如果表单验证通过，可以继续执行提交逻辑
      // 进行api提交
      await checkOldPassword()
      if (isRightOldPassword.value) {
        await updatePasswordAPI(LoginerStore.userInfo.user_id, ruleForm.pass).then((res) => {
          if (res.data) {
            ElMessage({
              message: '修改密码成功',
              type: 'success',
              plain: true
            })
            router.replace('/login')
            LoginerStore.clearUser()
          }
        })
      } else {
        ElMessage({
          message: '原密码错误',
          type: 'error',
          plain: true
        })
      }
    } else {
      // 如果表单验证不通过，出现dialog并且提醒
      centerDialogVisible.value = true
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const rules = {
  Oripass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  pass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, message: '长度至少8个字符', trigger: 'blur' },
    {
      // 正则表达式
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码必须包含字母和数字',
      trigger: 'blur'
    }
  ],
  checkPass: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirm, trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== captchaString.value) {
          callback(new Error('验证码错误'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 假设一个验证功能：具体得用后端的接口提供的验证码

const generateCaptcha = async () => {
  const res = await getCaptchaAPI()
  getcaptcha.value = res
}

onMounted(() => generateCaptcha())
</script>

<template>
  <DialogTip
    TipMessage="请输入正确的信息"
    :centerDialogVisible="centerDialogVisible"
    @changeDialogVisible="changeDialogVisible"
  ></DialogTip>
  <div class="passwordDiv">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="Oripass">
        <el-input
          v-model="ruleForm.Oripass"
          type="password"
          autocomplete="off"
          placeholder="请输入原密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input
          v-model="ruleForm.pass"
          type="password"
          autocomplete="off"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          placeholder="请再次输入密码"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="ruleForm.captcha" style="width: 7rem" placeholder="请输入验证码" />
        <el-button class="captcha-box" @click="generateCaptcha">
          <el-link
            v-for="(char, index) in getcaptcha"
            :key="index"
            class="captcha-char"
            :style="{
              transform: `rotate(${char.rotation}deg) translateX(${char.position}px)`
            }"
            >{{ char.value }}</el-link
          >
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="background-color: skyblue; color: white" @click="submitForm(ruleFormRef)"
          >更新</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped lang="scss">
.passwordDiv {
  margin: 5rem;
}
.captcha-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: inline-block;
  font-family: Arial, sans-serif;
  position: relative;
  margin-left: 6rem;
  font-size: 1rem;
  height: 1.6rem;
}

.captcha-char {
  display: inline-block;
  margin: 0 5px;
  transform: rotate(-20deg);
}
</style>