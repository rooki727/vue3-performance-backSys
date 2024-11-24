<script  setup>
import { useLoginerStore } from '@/stores/LoginerStore'
import { ref, reactive, onMounted } from 'vue'
import DialogTip from '@/components/DialogTip.vue'
// 获取t方法才可以在js代码里使用
const LoginerStore = useLoginerStore()
const userForm = reactive({
  name: '',
  gender: '',
  phone: null,
  email: ''
})

const ruleFormRef = ref()
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    { min: 5, message: '用户名长度不能小于5个字符', trigger: 'blur' }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    { min: 11, max: 11, message: '手机号码长度不能小于11个字符', trigger: 'blur' },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: '手机号码只能包含数字', // 自定义提示消息
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入电子邮件地址', // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入有效的电子邮件地址', // 如果输入的电子邮件地址格式不正确，则显示此消息
      trigger: ['blur', 'change']
    }
  ]
}
// 提醒框确认
const centerDialogVisible = ref(false)
// userForm.value = LoginerStore.userInfo
const submitForm = (formRef) => {
  // 调用表单的 validate 方法进行验证
  formRef.validate((valid) => {
    if (valid) {
      // 如果表单验证通过，可以继续执行提交逻辑
      // updateupdateBase(
      //   userForm.id,
      //   userForm.name,
      //   userForm.gender,
      //   parseInt(userForm.phone),
      //   userForm.email
      // )
    } else {
      // 如果表单验证不通过，出现dialog并且提醒
      centerDialogVisible.value = true
    }
  })
}

// 子组件修改后发送给父组件修改centerDialogVisible
const changeDialogVisible = (value) => {
  centerDialogVisible.value = value
}

// 重置按钮
const resetForm = () => {
  userForm.name = ''
  userForm.phone = null
  userForm.email = ''
  userForm.gender = ''
}
onMounted(() => {
  // Object.assign() 或扩展运算符来创建一个新的对象，从而确保不会直接修改 store 中的值
  Object.assign(userForm, LoginerStore.userInfo)
})
</script>

<template>
  <DialogTip
    TipMessage="输入完整的信息才能提交"
    :centerDialogVisible="centerDialogVisible"
    @changeDialogVisible="changeDialogVisible"
  ></DialogTip>
  <div class="basicInfo">
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="userForm"
      style="max-width: 600px; font-size: 1rem"
      label-width="auto"
    >
      <el-form-item label="id"
        ><el-text>{{ LoginerStore.userInfo?.id }}</el-text></el-form-item
      >
      <el-form-item label="账号"
        ><el-text>{{ LoginerStore.userInfo?.account }}</el-text></el-form-item
      >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name" placeholder="请输入用户名"
      /></el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="userForm.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="phone" prop="phone">
        <el-input v-model="userForm.phone" placeholder="请输入手机号码"
      /></el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入电子邮件地址"
      /></el-form-item>
      <el-form-item>
        <el-button
          @click="submitForm(ruleFormRef)"
          style="margin-left: 0.5rem; background-color: rgba(200, 83, 83, 0.504); color: white"
        >
          更新
        </el-button>
        <el-button @click="resetForm" style="margin-left: 28rem"> 重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<style scoped lang="scss">
.basicInfo {
  margin-top: 2.6rem;
  margin-left: 3rem;
}
</style>