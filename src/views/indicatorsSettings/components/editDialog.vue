<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateIndicatorAPI } from '@/apis/indicators'
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
  indicator_id: null,
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
const submitadd = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      await updateIndicatorAPI({
        indicator_id: addform.indicator_id,
        indicator_name: addform.indicator_name,
        weight: addform.weight
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
    title="修改指标信息"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="指标id" label-width="8.75rem" prop="indicator_id">
        <el-input v-model="addform.indicator_id" autocomplete="off" :disabled="cannotInpId" />
      </el-form-item>
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
        <el-button type="primary" @click="submitadd(addForm)"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


