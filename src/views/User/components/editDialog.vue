<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const clickRow = computed(() => props.clickRow)
const emit = defineEmits(['changeDialogVisible', 'updateClickRow'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}
const verifyChoose = [{ id: 1, verify: 'common' }]
const addForm = ref(null)
const addform = reactive({
  user_id: null,
  name: '',
  account: null,
  password: '',
  verify: '',
  gender: '',
  phone: null,
  email: ''
})
const rules = {
  id: [
    {
      type: Number,
      required: true,
      message: '',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: '',
      trigger: 'blur'
    },
    { min: 5, message: '', trigger: 'blur' }
  ],
  account: [
    {
      required: true,
      message: '',
      trigger: 'blur'
    },
    {
      type: Number,
      min: 5,
      message: '',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: '',
      trigger: 'blur'
    }
  ],
  gender: [{ required: true }],
  verify: [{ required: true, message: '', trigger: 'blur' }],
  phone: [
    {
      required: true,
      message: '',
      trigger: 'blur'
    },
    { type: Number, min: 11, message: '', trigger: 'blur' },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: '', // 自定义提示消息
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '', // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '', // 如果输入的电子邮件地址格式不正确，则显示此消息
      trigger: ['blur', 'change']
    }
  ]
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)
      //  updateCommonUser(
      //       addform.user_id,
      //       addform.name,
      //       parseInt(addform.account),
      //       addform.password,
      //       addform.verify,
      //       addform.gender,
      //       parseInt(addform.phone),
      //       addform.email
      //     )
      //     .then(() => {
      //       // 如果 addUser 没有报错，则执行成功提示
      //       ElMessage({ type: 'success', message: '修改成功' })
      //     })
      //     .catch(() => {
      //       // 处理请求失败的情况
      //       ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
      //       // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
      //     })
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
    :title="title"
    width="500"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="user_id" label-width="8.75rem" prop="user_id">
        <el-input v-model="addform.user_id" autocomplete="off" :disabled="cannotInpId" />
      </el-form-item>
      <el-form-item label="$t('messages.name')" label-width="8.75rem" prop="name">
        <el-input v-model="addform.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="$t('messages.account')" label-width="8.75rem" prop="account">
        <el-input v-model="addform.account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="$t('messages.Password')" label-width="8.75rem" prop="password">
        <el-input v-model="addform.password" autocomplete="off" />
      </el-form-item>
      <!-- 使用下拉框选择权限 -->
      <el-form-item label="$t('messages.verify')" label-width="8.75rem" prop="verify">
        <el-select v-model="addform.verify" placeholder="请选择类型">
          <el-option
            v-for="item in verifyChoose"
            :key="item.id"
            :label="item.verify"
            :value="item.verify"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="$t('messages.gender')" label-width="8.75rem" prop="gender">
        <el-radio-group v-model="addform.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="$t('messages.phone')" label-width="8.75rem" prop="phone">
        <el-input v-model="addform.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="$t('messages.email')" label-width="8.75rem" prop="email">
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


