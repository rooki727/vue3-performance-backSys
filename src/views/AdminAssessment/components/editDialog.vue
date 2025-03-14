<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateAssessmentAPI } from '@/apis/managerAssessment'
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

const addform = reactive({
  self_assessment_id: null,
  basis: '',
  score: null
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
      await updateAssessmentAPI({
        assessment_id: addform.assessment_id,
        score: addform.score,
        basis: addform.basis,
        performance_id: addform.performance_id
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
    title="修改当前绩效数据"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="绩效id" label-width="8.75rem">
        <template #default>{{ addform.assessment_id }}</template>
      </el-form-item>
      <el-form-item label="指标名称" label-width="8.75rem">
        <template #default>{{ addform.indicator_name }}</template>
      </el-form-item>
      <el-form-item label="分数" label-width="8.75rem" prop="score">
        <el-input v-model="addform.score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="依据" label-width="8.75rem" prop="basis">
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
        <el-button type="primary" @click="submitadd(addForm)"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


