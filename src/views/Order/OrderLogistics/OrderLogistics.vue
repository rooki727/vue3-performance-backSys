<template>
  <div>
    <el-input
      v-model="searchInput"
      style="width: 16rem; margin-left: 1rem"
      :placeholder="$t('messages.order_idInput')"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" round style="margin-left: 3rem" @click="handleReset">{{
      $t('messages.reset')
    }}</el-button>
  </div>
  <el-divider content-position="center">{{ $t('messages.following_Logistics') }}</el-divider>
  <div>
    <el-table :data="logisticsList" style="width: 100%">
      <el-table-column label="logistics_id" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.logistics_id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="order_id" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.order_id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messages.company_name')" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.company_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messages.company_tel')" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.company_tel }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messages.logistics_number')" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.logistics_number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messages.text')" width="350">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.text }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messages.time')" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
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
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">{{
            $t('messages.upadateLogisticsDetail')
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageDiv">
      <el-pagination
        @change="getLogisticsList"
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
  </div>

  <LogisticsUpdate
    :cannotInpId="cannotInpId"
    :clickRow="clickRow"
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
    @successAdd="onSuccessAdd"
  ></LogisticsUpdate>
</template>

<script setup>
import { findAllLogisticsAPI, findLogisticsByIdAPI, deleteLogisticsAPI } from '@/apis/logistics'
import debounce from 'lodash/debounce'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LogisticsUpdate from './components/LogisticsUpdate.vue'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const logisticsList = ref([])
const searchInput = ref('')
// 分页功能
const pageSize = ref(6)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentPage = ref(1)
const totalRowSize = ref(0)
// 防抖搜索的实现
const handleSearch = debounce(async (searchInput) => {
  if (searchInput === '') {
    getLogisticsList()
  } else {
    const res = await findLogisticsByIdAPI(searchInput)

    logisticsList.value = res.result
    totalRowSize.value = res.result.length
  }
}, 500)
// 重置搜索
const handleReset = () => {
  searchInput.value = ''
  getLogisticsList()
}
// 分页获取数据
const getLogisticsList = async () => {
  const res = await findAllLogisticsAPI(currentPage.value, pageSize.value)
  totalRowSize.value = res.result.totalPage
  logisticsList.value = res.result.logisticsList
}
// 删除
const handleDelete = async (row) => {
  await deleteLogisticsAPI(row.logistics_id).then(() => {
    ElMessage({ type: 'success', message: '删除成功' })
    getLogisticsList()
  })
}

// 弹出
const dialogTitle = ref('')
const dialogFormVisible = ref(false)
const clickRow = ref({})
const cannotInpId = ref(true)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}
// 打开物流更新
const handleUpdate = (row) => {
  dialogTitle.value = t('messages.upadateLogisticsDetail')
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}
// 添加物流
const onSuccessAdd = (val) => {
  if (val) {
    getLogisticsList()
  }
}
onMounted(() => getLogisticsList())
</script>

<style lang="scss" scoped>
.pageDiv {
  margin-top: 2rem;
  margin-left: 28rem;
}
</style>