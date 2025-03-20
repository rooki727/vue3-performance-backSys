<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { manageAssessmentAPI } from '@/apis/managerAssessment'
import { useRouter } from 'vue-router'
const router = useRouter()
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
const selfForm = reactive({
  self_assessment_id: null,
  score: null,
  basis: ''
})
const addform = reactive({
  score: null,
  basis: ''
})
const rules = {
  score: [
    {
      required: true,
      message: '请输入该指标分数',
      trigger: 'blur'
    }
  ],
  basis: [
    {
      required: true,
      message: '请输入依据',
      trigger: 'blur'
    }
  ]
}
const submitadd = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      await manageAssessmentAPI({
        user_id: selfForm.user_id,
        assessmentList: [
          {
            score: selfForm.score,
            basis: selfForm.basis,
            indicator_id: selfForm.indicator_id,
            assessment_type: 'teacher'
          },
          {
            score: parseInt(addform.score),
            basis: addform.basis,
            indicator_id: selfForm.indicator_id,
            assessment_type: 'admin'
          }
        ]
      })
        .then(() => {
          // 如果 addUser 没有报错，则执行成功提示
          ElMessage({ type: 'success', message: '评定成功' })
          emit('changeDialogVisible', false)
          emit('updateList')
          resetForm()
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'erro', message: '评定失败！请检查输入信息' })
          // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '评定失败！请检查输入信息' })
    }
  })
}
const resetForm = () => {
  addform.score = ''
  addform.basis = ''
}
// 去管理中心
const goToManage = (name, real_name) => {
  if (name === '教学任务') {
    router.replace(`/teachingTask?real_name=${real_name}`)
    return
  }
  if (name === '科研项目') {
    router.replace(`/research?real_name=${real_name}`)
    return
  }
  if (name === '社会服务') {
    router.replace(`/socialService?real_name=${real_name}`)
    return
  }
}
watch(
  () => clickRow.value,
  (oldVal) => {
    Object.assign(selfForm, oldVal)
  }
)
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    title="评定教师当前指标"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-alert
      :title="`请管理员评定分数前，务必前往 '${selfForm.indicator_name}' 管理中心搜索 '${selfForm.real_name}' 教师的各项数据是否审核完成后，根据实际情况给予分数！`"
      type="warning"
      show-icon
      :closable="false"
    ></el-alert>
    <el-link
      type="primary"
      @click="goToManage(selfForm.indicator_name, selfForm.real_name)"
      style="margin-left: 11rem"
      >点击前往{{ selfForm.indicator_name }}管理查看</el-link
    >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="教师：" label-width="8.75rem">
        <template #default>{{ selfForm.real_name }}</template>
      </el-form-item>
      <el-form-item label="指标：" label-width="8.75rem">
        <template #default>{{ selfForm.indicator_name }}</template>
      </el-form-item>
      <el-form-item label="自评依据：" label-width="8.75rem">
        <template #default>{{ selfForm.basis }}</template>
      </el-form-item>
      <el-form-item label="自评分数：" label-width="8.75rem">
        <template #default>{{ selfForm.score }}</template>
      </el-form-item>
      <el-form-item label="分数：" label-width="8.75rem" prop="score">
        <el-input v-model="addform.score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="评定依据：" label-width="8.75rem" prop="basis">
        <el-input
          v-model="addform.basis"
          autocomplete="off"
          type="textarea"
          :rows="4"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 评定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


