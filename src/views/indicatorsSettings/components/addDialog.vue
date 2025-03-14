<script  setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addIndicatorAPI } from '@/apis/indicators'
// 获取t方法才可以在js代码里使用
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const emit = defineEmits(['changeDialogVisible', 'updateList'])
const addForm = ref(null)
const addform = ref({
  indicator_name: '',
  weight: null
})

const rules = {
  indicator_name: [
    {
      required: true,
      message: '请输入指标',
      trigger: 'blur'
    }
  ],
  weight: [
    {
      required: true,
      message: '请输入占比重值',
      trigger: 'blur'
    }
  ]
}
// 重置表单函数
const resetForm = () => {
  addform.value.indicator_name = ''
  addform.value.weight = null
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      addIndicatorAPI({
        indicator_name: addform.value.indicator_name,
        weight: addform.value.weight
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
    :title="title"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="指标名称" label-width="8.75rem" prop="indicator_name">
        <el-input v-model="addform.indicator_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="占比" label-width="8.75rem" prop="weight">
        <el-input v-model="addform.weight" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 添加指标 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


