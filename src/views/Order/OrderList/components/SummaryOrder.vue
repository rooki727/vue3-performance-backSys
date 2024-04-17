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
const nameChoose = ref([])
const chooseAll = ref([])
const filteredAccounts = ref([])
const summaryDate = ref([])
const checkBtnUse = (row) => {
  const currentDate = new Date()
  // 将指定时间字符串转换为日期对象
  const rowTime = new Date(row.time)
  // 计算两个日期对象之间的时间差（以毫秒为单位）
  const timeDiff = currentDate.getTime() - rowTime.getTime()
  // 将时间差转换为天数
  const daysDiff = timeDiff / (1000 * 3600 * 24)
  if (daysDiff > 30 && row.state === '已完成' && row.summaryState === '未汇总') {
    return true
  } else {
    return false
  }
}
function removeDuplicates(array) {
  const seen = new Set()
  return array.filter((item) => {
    const key = item.name + item.account
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
      nameChoose.value.push({
        name: item.name,
        account: item.account
      })
    })
    nameChoose.value = removeDuplicates(nameChoose.value)
  },
  {
    deep: true
  }
)
const addForm = ref(null)
const addform = reactive({
  name: '',
  account: null,
  time: '',
  totalMoney: null,
  totalCount: null
})

const rules = {
  name: [
    {
      required: true,
      message: t('messages.base_nameinput')
    }
  ],
  account: [
    {
      required: true,
      message: t('messages.account_input')
    }
  ]
}

// 根据选择的 name 过滤对应的 account
const updateAccountOptions = () => {
  addform.account = ''
  filteredAccounts.value = nameChoose.value.filter((item) => item.name === addform.name)
}
//选择完成时触发函数，得到form的全部值
const getSummaryDate = () => {
  summaryDate.value = chooseAll.value.filter(
    (item) => item.name === addform.name && item.account === addform.account
  )

  addform.totalMoney = summaryDate.value.reduce(
    (total, item) => total + parseInt(item.perOrderMoney),
    0
  )
  addform.totalCount = summaryDate.value.reduce((total, item) => total + item.books.length, 0)
  const date = new Date()
  // 获取日期中的年、月、日、时、分、秒
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份从 0 开始，所以需要加 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  // 格式化月份和日期，确保单个数字前面有 0
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day
  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  // 构建最终的日期时间字符串
  const formattedDate = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`

  addform.time = formattedDate
}
// 重置表单函数
const resetForm = () => {
  addform.name = ''
  addform.account = null
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      await OrderStore.addSummaryList(
        addform.name,
        addform.account,
        addform.time,
        addform.totalMoney,
        addform.totalCount
      )
      summaryDate.value.forEach(async (item) => {
        await OrderStore.updateOrderSummaryState(item.id, '已汇总')
      })

      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)

      // 如果 addUser 没有报错，则执行成功提示
      ElMessage({ type: 'success', message: '汇总成功' })
      resetForm()
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
      <el-form-item> </el-form-item>
      <!-- 使用下拉框选择符合要求的名字 -->
      <el-form-item :label="$t('messages.name')" label-width="8.75rem" prop="name">
        <el-select
          v-model="addform.name"
          :placeholder="$t('messages.base_nameinput')"
          @change="updateAccountOptions"
        >
          <el-option
            v-for="item in nameChoose"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('messages.account')" label-width="8.75rem" prop="account">
        <el-select
          v-model="addform.account"
          :placeholder="$t('messages.account_input')"
          @change="getSummaryDate"
        >
          <el-option
            v-for="item in filteredAccounts"
            :key="item.id"
            :label="item.account"
            :value="item.account"
          />
        </el-select>
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


