<script  setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addSelfAssessmentAPI } from '@/apis/selfAssessment'
import { useLoginerStore } from '@/stores/LoginerStore'
const loginerStore = useLoginerStore()
// 获取t方法才可以在js代码里使用
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'filterIndicatorList'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const filterIndicatorList = computed(() => props.filterIndicatorList)
const emit = defineEmits(['changeDialogVisible', 'updateList'])
const user_id = computed(() => loginerStore.userInfo.user_id)
const addForm = ref(null)
const addform = ref({
  basis: '',
  score: null,
  indicator_id: null
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
// 重置表单函数
const resetForm = () => {
  addform.value.basis = ''
  addform.value.score = null
  addform.value.indicator_id = null
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      addSelfAssessmentAPI({
        user_id: user_id.value,
        indicator_id: addform.value.indicator_id,
        score: addform.value.score,
        basis: addform.value.basis
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
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    title="进行自评"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <!-- 使用下拉框选择指标 -->
    <el-form-item label="指标" label-width="8.75rem" prop="academy">
      <el-select v-model="addform.indicator_id" placeholder="请选择指标">
        <el-option
          v-for="item in filterIndicatorList"
          :key="item.indicator_id"
          :label="item.indicator_name"
          :value="item.indicator_id"
        />
      </el-select>
    </el-form-item>
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="分数" label-width="8.75rem" prop="score">
        <el-input v-model="addform.score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="依据" label-width="8.75rem" prop="basis">
        <el-input v-model="addform.basis" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 进行自评 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


