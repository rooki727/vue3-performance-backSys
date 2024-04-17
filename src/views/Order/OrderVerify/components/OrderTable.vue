<template>
  <el-table :data="currentPageData" style="width: 100%">
    <el-table-column label="Id" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.name')" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.account')" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.summaryTime')" width="280">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.totalMoney')" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.totalMoney }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.totalCount')" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.totalCount }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('messages.operations')">
      <template #default="scope">
        <el-popconfirm :title="$t('messages.confirmToDetele')" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button size="small" type="danger">{{ $t('messages.delete') }}</el-button>
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

const OrderStore = useOrderStore()

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
  await OrderStore.deleteSummaryList(row.id)
  ElMessage({ type: 'success', message: `成功删除订单：${row.id} !` })
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