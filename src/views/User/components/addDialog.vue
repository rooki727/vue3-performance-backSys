<script  setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
// 获取t方法才可以在js代码里使用
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const emit = defineEmits(['changeDialogVisible'])

const addForm = ref(null)
const addform = ref({
  name: '',
  account: null,
  password: '',
  verify: '',
  gender: '',
  phone: null,
  email: ''
})

// 判断账号存在是否
const accountExists = ref(true)
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 10,
      message: '最少6位阿拉伯数字,最大10位',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: '账号必须为纯数字', // 自定义提示消息
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: '密码为至少8位，包含字母和数字',
      trigger: 'blur'
    }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    { min: 11, max: 11, message: '手机号必须为11位数字', trigger: 'blur' },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: '手机号必须为纯数字', // 自定义提示消息
      trigger: ['blur', 'change']
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
// 重置表单函数
const resetForm = () => {
  addform.value.name = ''
  addform.value.account = null
  addform.value.password = ''
  addform.value.verify = ''
  addform.value.gender = ''
  addform.value.phone = null
  addform.value.email = ''
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid && accountExists.value === false) {
      // const date = new Date()
      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)

      // addCommonUser(
      //   addform.value.name,
      //   parseInt(addform.value.account),
      //   addform.value.password,
      //   addform.value.verify,
      //   addform.value.gender,
      //   parseInt(addform.value.phone),
      //   addform.value.email,
      //   date
      // )
      // .then(() => {
      //   // 如果 addUser 没有报错，则执行成功提示
      //   ElMessage({ type: 'success', message: '添加成功' })
      //   resetForm()
      // })
      // .catch(() => {
      //   // 处理请求失败的情况
      //   ElMessage({ type: 'erro', message: '添加失败！请检查输入信息' })
      //   // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
      // })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '添加失败！请检查输入信息' })
    }
  })
}

// 检查是否存在account

const checkAccountExist = async () => {
  // 判断单个检验
  addForm.value.validateField(['account'], async (valid) => {
    if (valid) {
      // const res = await checkUserAccountAPI(parseInt(addform.value.account))
      // if (res.result == 'account存在') {
      //   accountExists.value = true
      //   ElMessage({ type: 'error', message: '该账号已存在' })
      // } else {
      //   accountExists.value = false
      //   ElMessage({ type: 'success', message: '该账号可用' })
      // }
    }
  })
}
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    :title="title"
    width="500"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="用户名" label-width="8.75rem" prop="name">
        <el-input v-model="addform.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号" label-width="8.75rem" prop="account">
        <el-input v-model="addform.account" autocomplete="off" @blur="checkAccountExist" />
      </el-form-item>
      <el-form-item label="密码" label-width="8.75rem" prop="password">
        <el-input v-model="addform.password" autocomplete="off" type="password" />
      </el-form-item>

      <el-form-item label="性别" label-width="8.75rem" prop="gender">
        <el-radio-group v-model="addform.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" label-width="8.75rem" prop="phone">
        <el-input v-model="addform.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="8.75rem" prop="email">
        <el-input type="email" v-model="addform.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 添加用户 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


