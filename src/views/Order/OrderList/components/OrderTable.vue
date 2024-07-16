<template>
  <el-table :data="currentPageData" style="width: 100%">
    <el-table-column label="order_id" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 40px">{{ scope.row.order_id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="book_id" width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.book_id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="user_id" width="160">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.ordertime')" width="280">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.formattedBuildTime }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.perOrderMoney')" width="160">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">￥{{ scope.row.price }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- 此处修改成下拉框 -->
    <el-table-column :label="$t('messages.order_status')" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-select
            v-model="scope.row.order_status"
            placeholder="Select"
            style="width: 7.5rem"
            @change="changeSlecet(scope.row)"
          >
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.summaryState')" width="200">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.summary_status }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('messages.operations')">
      <template #default="scope">
        <el-popconfirm :title="$t('messages.confirmToDetele')" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button size="small" type="danger" :disabled="checkBtnUse(scope.row)">{{
              $t('messages.delete')
            }}</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="pageDiv">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[6, 8, 10, 12]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRowSize"
    />
  </div>
</template>

<script  setup>
import { Timer } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { useOrderStore } from '@/stores/OrderStore'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const OrderStore = useOrderStore()
const stateOptions = [
  {
    id: 1,
    value: t('messages.waitPay'),
    label: t('messages.waitPay')
  },

  {
    id: 2,
    value: t('messages.notFinish'),
    label: t('messages.notFinish')
  },
  {
    id: 3,
    value: t('messages.finish'),
    label: t('messages.finish')
  },
  {
    id: 4,
    value: t('messages.refunded'),
    label: t('messages.refunded')
  }
]
// 分页功能
const pageSize = ref(6)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentPage = ref(1)

const totalRowSize = computed(() => tableData.value.length)
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return tableData.value.slice(startIndex, endIndex)
})
const props = defineProps(['orderList'])
const computedOrderList = computed(() => props.orderList)
const tableData = ref([])

const handleDelete = async (row) => {
  await OrderStore.deleteOrder(row.order_id)
  ElMessage({ type: 'success', message: `成功删除订单：${row.order_id} !` })
}
const changeSlecet = async (row) => {
  await OrderStore.updateOrderState(row.order_id, row.order_status)
  ElMessage({
    type: 'success',
    message: `成功修改订单${row.order_id}状态为：${row.order_status} !`
  })
}

const checkBtnUse = (row) => {
  const currentDate = new Date()
  // 将指定时间字符串转换为日期对象
  const rowTime = new Date(row.formattedBuildTime)
  // 计算两个日期对象之间的时间差（以毫秒为单位）
  const timeDiff = currentDate.getTime() - rowTime.getTime()
  // 将时间差转换为天数
  const daysDiff = timeDiff / (1000 * 3600 * 24)
  if (daysDiff > 30 && row.order_status === '待评价') {
    return false
  } else {
    return true
  }
}
watch(
  () => computedOrderList.value,
  (newVal) => {
    tableData.value = newVal
  },
  {
    deep: true
  }
)
</script>


<style scoped>
.pageDiv {
  margin-top: 2rem;
  margin-left: 28rem;
}
</style>