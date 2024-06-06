<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useOrderStore } from '@/stores/OrderStore'
const OrderStore = useOrderStore()
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title', 'originList'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const emit = defineEmits(['changeDialogVisible'])
const tableList = ref([])
const tableListComputed = computed(() => props.originList)
const userChoose = ref([])
const chooseAll = ref([])
const summaryDate = ref([])
const checkBtnUse = (row) => {
  const currentDate = new Date()
  // 将指定时间字符串转换为日期对象
  const rowTime = new Date(row.formattedBuildTime)
  // 计算两个日期对象之间的时间差（以毫秒为单位）
  const timeDiff = currentDate.getTime() - rowTime.getTime()
  // 将时间差转换为天数
  const daysDiff = timeDiff / (1000 * 3600 * 24)
  if (daysDiff > 30 && row.order_status === '已完成' && row.summary_status === '未汇总') {
    return true
  } else {
    return false
  }
}
function removeDuplicates(array) {
  const seen = new Set()
  return array.filter((item) => {
    const key = item.user_id
    if (seen.has(key)) {
      return false
    } else {
      seen.add(key)
      return true
    }
  })
}
watch(
  () => tableListComputed.value,
  (newVal) => {
    tableList.value = newVal

    chooseAll.value = tableList.value.filter((item) => {
      return checkBtnUse(item)
    })

    chooseAll.value.forEach((item) => {
      userChoose.value.push({
        user_id: item.user_id
      })
    })
    userChoose.value = removeDuplicates(userChoose.value)
  },
  {
    deep: true
  }
)
const addForm = ref(null)
const addform = reactive({
  user_id: null,
  time: '',
  totalMoney: null,
  totalCount: null
})

const rules = {
  user_id: [
    {
      required: true,
      message: t('messages.base_nameinput')
    }
  ]
}

// 根据选择获取数据表
const updateAccountOptions = () => {
  summaryDate.value = chooseAll.value.filter((item) => item.user_id === addform.user_id)
  addform.totalMoney = summaryDate.value.reduce((total, item) => total + parseInt(item.price), 0)
  addform.totalCount = summaryDate.value.length
  const date = new Date()
  addform.time = date
}
// 重置表单函数
const resetForm = () => {
  addform.user_id = null
  addform.totalMoney = null
  addform.totalCount = null
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      console.log(summaryDate.value)
      console.log(addform)

      await OrderStore.addSummaryList(
        addform.user_id,
        addform.time,
        addform.totalMoney,
        addform.totalCount
      )
        .then(() => {
          // api数据请求，添加该用户的信息
          emit('changeDialogVisible', false)
          ElMessage({ type: 'success', message: '汇总成功' })
          resetForm()
          // 更新订单汇总状态
          summaryDate.value.forEach(async (item) => {
            await OrderStore.updateOrderSummaryState(item.order_id, '已汇总')
          })
        })
        .catch(() => {
          ElMessage({ type: 'error', message: '汇总失败' })
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '汇总失败！请检查输入信息' })
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
    <el-divider content-position="center">{{ $t('messages.following_order_Choose') }}</el-divider>
    <el-form :model="addform" :rules="rules" ref="addForm">
      <!-- 使用下拉框选择符合要求的名字 -->
      <el-form-item label="user_id" label-width="8.75rem" prop="name">
        <el-select
          v-model="addform.user_id"
          :placeholder="$t('messages.base_nameinput')"
          @change="updateAccountOptions"
        >
          <el-option
            v-for="item in userChoose"
            :key="item.id"
            :label="item.user_id"
            :value="item.user_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('messages.totalMoney')" label-width="8.75rem" prop="totalMoney">
        <el-input v-model="addform.totalMoney" disabled />
      </el-form-item>
      <el-form-item :label="$t('messages.totalCount')" label-width="8.75rem" prop="totalCount">
        <el-input v-model="addform.totalCount" disabled />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">{{ $t('messages.Cancel') }}</el-button>
        <el-button type="primary" @click="submitadd(addForm)">
          {{ $t('messages.summary') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


