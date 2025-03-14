<script  setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addUserAPI, checkUserAccountAPI } from '@/apis/user'
// 获取t方法才可以在js代码里使用
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const emit = defineEmits(['changeDialogVisible', 'updateList'])
const roleChooseList = [{ id: 1, role: 'teacher' }]
const academyChooseList = [
  { id: 1, academy: '学院1' },
  { id: 2, academy: '学院2' },
  { id: 3, academy: '学院3' },
  { id: 4, academy: '学院4' },
  { id: 5, academy: '学院5' },
  { id: 6, academy: '学院6' },
  { id: 7, academy: '学院7' },
  { id: 8, academy: '学院8' },
  { id: 9, academy: '学院9' },
  { id: 10, academy: '学院10' }
]
const addForm = ref(null)
const addform = ref({
  real_name: '',
  password: '',
  verify: '',
  gender: '',
  phone_number: null,
  email: '',
  role: '',
  academy: ''
})

// 判断账号存在是否
const accountExists = ref(true)
const rules = {
  real_name: [
    {
      required: true,
      message: '请输入姓名',
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
      message: '最少6位阿拉伯数字,最大10位',
      trigger: 'blur'
    },
    {
      max: 10,
      message: '最多10位阿拉伯数字',
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
  phone_number: [
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
  ],
  role: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }
  ],
  academy: [
    {
      required: true,
      message: '请选择所属学院',
      trigger: 'blur'
    }
  ]
}
// 重置表单函数
const resetForm = () => {
  addform.value.real_name = ''
  addform.value.account = null
  addform.value.password = ''
  addform.value.role = ''
  addform.value.gender = ''
  addform.value.phone = null
  addform.value.email = ''
  addform.value.academy = ''
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid && accountExists.value === false) {
      // api数据请求，添加该用户的信息
      addUserAPI({
        real_name: addform.value.real_name,
        account: parseInt(addform.value.account),
        password: addform.value.password,
        role: addform.value.role,
        gender: addform.value.gender,
        phone_number: parseInt(addform.value.phone_number),
        email: addform.value.email,
        academy: addform.value.academy
      })
        .then((res) => {
          // 如果 addUser 没有报错，则执行成功提示
          if (res.data) {
            ElMessage({ type: 'success', message: '添加成功' })
            emit('changeDialogVisible', false)
            emit('updateList')
            resetForm()
          } else {
            ElMessage({ type: 'error', message: res.msg })
          }
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'error', message: '添加失败！请检查输入信息' })
          // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
        })
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
      const res = await checkUserAccountAPI(parseInt(addform.value.account))
      if (res.data) {
        accountExists.value = false
        ElMessage({ type: 'success', message: res.msg })
      } else {
        accountExists.value = true
        ElMessage({ type: 'error', message: res.msg })
      }
    }
  })
}
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    :title="title"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="真实姓名" label-width="8.75rem" prop="real_name">
        <el-input v-model="addform.real_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号" label-width="8.75rem" prop="account">
        <el-input v-model="addform.account" autocomplete="off" @blur="checkAccountExist" />
      </el-form-item>
      <el-form-item label="密码" label-width="8.75rem" prop="password">
        <el-input v-model="addform.password" autocomplete="off" type="password" show-password />
      </el-form-item>
      <!-- 使用下拉框选择角色 -->
      <el-form-item label="角色" label-width="8.75rem" prop="role">
        <el-select v-model="addform.role" placeholder="请选择角色">
          <el-option
            v-for="item in roleChooseList"
            :key="item.id"
            :label="item.role"
            :value="item.role"
          />
        </el-select>
      </el-form-item>
      <!-- 使用下拉框选择学院 -->
      <el-form-item label="学院" label-width="8.75rem" prop="academy">
        <el-select v-model="addform.academy" placeholder="请选择所属学院">
          <el-option
            v-for="item in academyChooseList"
            :key="item.id"
            :label="item.academy"
            :value="item.academy"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" label-width="8.75rem" prop="gender">
        <el-radio-group v-model="addform.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" label-width="8.75rem" prop="phone_number">
        <el-input v-model="addform.phone_number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="8.75rem" prop="email">
        <el-input type="email" v-model="addform.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 添加教师 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


