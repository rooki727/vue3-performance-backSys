<script  setup>
import { useLoginerStore } from '@/stores/LoginerStore'
import { ref, reactive, onMounted } from 'vue'
import DialogTip from '@/components/DialogTip.vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
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
      message: t('messages.base_nameinput'),
      trigger: 'blur'
    },
    { min: 5, message: t('messages.base_namerule'), trigger: 'blur' }
  ],
  phone: [
    {
      required: true,
      message: t('messages.base_phoneinput'),
      trigger: 'blur'
    },
    { type: 'Number', min: 11, message: t('messages.base_phonerule'), trigger: 'blur' },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: t('messages.base_digitsonly'), // 自定义提示消息
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: t('messages.email_required'), // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    },
    {
      type: 'email',
      message: t('messages.email_invalid'), // 如果输入的电子邮件地址格式不正确，则显示此消息
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
      // 进行api提交修改stores 重新获取数据
      LoginerStore.updateupdateBase(
        userForm.id,
        userForm.name,
        userForm.gender,
        parseInt(userForm.phone),
        userForm.email
      ).then(() => {
        ElMessage({
          message: '修改成功',
          type: 'success',
          plain: true
        })
        Object.assign(userForm, LoginerStore.userInfo)
        resetForm()
      })
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
    :TipMessage="$t('messages.basicinfoTip')"
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
      <el-form-item :label="$t('messages.account')"
        ><el-text>{{ LoginerStore.userInfo?.account }}</el-text></el-form-item
      >
      <el-form-item :label="$t('messages.verify')"
        ><el-text>{{ LoginerStore.userInfo?.verify }}</el-text></el-form-item
      >
      <el-form-item :label="$t('messages.name')" prop="name">
        <el-input v-model="userForm.name" :placeholder="$t('messages.base_nameinput')"
      /></el-form-item>
      <el-form-item :label="$t('messages.gender')" prop="gender">
        <el-radio-group v-model="userForm.gender">
          <el-radio value="男">{{ $t('messages.man') }}</el-radio>
          <el-radio value="女">{{ $t('messages.woman') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('messages.phone')" prop="phone">
        <el-input
          v-model="userForm.phone"
          :placeholder="$t('messages.base_phoneinput')"
          type="Number"
      /></el-form-item>
      <el-form-item :label="$t('messages.email')" prop="email">
        <el-input v-model="userForm.email" :placeholder="$t('messages.email_required')"
      /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" style="margin-left: 0.5rem">
          {{ $t('messages.update') }}
        </el-button>
        <el-button @click="resetForm" style="margin-left: 28rem">
          {{ $t('messages.reset') }}</el-button
        >
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