<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateUserByAdminAPI } from '@/apis/user'
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)

const clickRow = computed(() => props.clickRow)
const emit = defineEmits(['changeDialogVisible', 'updateClickRow', 'updateList'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}
const addForm = ref(null)
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
const addform = reactive({
  user_id: null,
  real_name: '',
  password: '',
  verify: '',
  gender: '',
  phone_number: null,
  email: '',
  role: '',
  academy: ''
})
const rules = {
  real_name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
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
    { type: Number, min: 11, message: '手机号必须为11位数字', trigger: 'blur' },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: '手机号必须为数字', // 自定义提示消息
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
const submitadd = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      await updateUserByAdminAPI({
        user_id: addform.user_id,
        real_name: addform.real_name,
        password: addform.password,
        role: addform.role,
        gender: addform.gender,
        phone_number: parseInt(addform.phone_number),
        email: addform.email,
        academy: addform.academy
      })
        .then(() => {
          // 如果 addUser 没有报错，则执行成功提示
          ElMessage({ type: 'success', message: '修改成功' })
          emit('changeDialogVisible', false)
          emit('updateList')
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
          // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '修改失败！请检查输入信息' })
    }
  })
}

watch(
  () => clickRow.value,
  (oldVal) => {
    Object.assign(addform, oldVal)
  }
)
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    title="修改教师信息"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="user_id" label-width="8.75rem" prop="user_id">
        <el-input v-model="addform.user_id" autocomplete="off" :disabled="cannotInpId" />
      </el-form-item>
      <el-form-item label="真实姓名" label-width="8.75rem" prop="real_name">
        <el-input v-model="addform.real_name" autocomplete="off" />
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
        <el-button type="primary" @click="submitadd(addForm)"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


