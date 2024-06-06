<template>
  <editDialog
    :cannotInpId="cannotInpId"
    :clickRow="clickRow"
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
  ></editDialog>
  <div>
    <el-table :data="currentPageData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column width="40" type="selection" :selectable="checkSelectable" />
      <el-table-column fixed prop="id" label="id" width="100" />

      <el-table-column fixed prop="name" :label="$t('messages.name')" width="150" />

      <el-table-column prop="account" :label="$t('messages.account')" width="200" />

      <el-table-column prop="gender" :label="$t('messages.gender')" width="120" />
      <el-table-column property="verify" prop="verify" :label="$t('messages.verify')" width="120" />
      <el-table-column prop="phone" :label="$t('messages.phone')" width="210" />
      <el-table-column
        prop="email"
        :label="$t('messages.email')"
        show-overflow-tooltip
        width="250"
      />
      <el-table-column fixed="right" :label="$t('messages.operations')" width="280">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
            :disabled="LoginerStore.userInfo?.verify !== 'first' || scope.row?.verify === 'first'"
            >{{ $t('messages.edit') }}</el-button
          >
          <el-popconfirm :title="$t('messages.confirmToDetele')" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button
                link
                type="primary"
                size="small"
                :disabled="
                  LoginerStore.userInfo?.verify !== 'first' || scope.row.verify === 'first'
                "
                >{{ $t('messages.delete') }}</el-button
              >
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
  </div>
</template>

<script setup>
import editDialog from './editDialog.vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import { useLoginerStore } from '@/stores/LoginerStore'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
// 添加对话框
const userStore = useUserStore()
const LoginerStore = useLoginerStore()
const dialogTitle = ref('')
const dialogFormVisible = ref(false)
const clickRow = ref({})
const cannotInpId = ref(true)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
// 取消按钮时重置点击行
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}
const props = defineProps(['tableformAdmin'])
// 分页功能
const pageSize = ref(6)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentPage = ref(1)
// 将代码table监听获值
const computedtable = computed(() => props.tableformAdmin)
const totalAdmin = ref([])
const totalRowSize = computed(() => totalAdmin.value?.length)
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return totalAdmin.value.slice(startIndex, endIndex)
})
watch(
  () => computedtable.value,
  (newVal) => {
    totalAdmin.value = newVal
  },
  {
    deep: true
  }
)
// 获取选择框的内容
const multipleSelection = ref([])
const emit = defineEmits(['getDelTable'])

// 获取多选框的数据
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  if (multipleSelection.value.length > 0) {
    // 使用map方法遍历multipleSelection.value数组，并将每个选中项的id存储到一个新的数组中
    const selectedIds = multipleSelection.value.map((item) => item.id)
    // 将所选数据提供给父组件
    emit('getDelTable', selectedIds)
  }
}
const loginerVerify = computed(() => LoginerStore.userInfo?.verify)

const checkSelectable = (row) => {
  // 根据特定条件判断复选框是否可用
  if (row.verify === 'first' || loginerVerify.value !== 'first') {
    return false // 如果行的状态为'disabled'，则复选框不可用
  } else {
    return true // 其他情况下复选框可用
  }
}

// 编辑
const handleEdit = (row) => {
  dialogTitle.value = t('messages.edit')
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}

const handleDelete = async (row) => {
  // 在这里使用 row 数据执行删除操作
  // api服务器删除后重新获取列表
  userStore
    .deleteAdmin(row.id)
    .then(() => {
      ElMessage({ type: 'success', message: '删除成功' })
    })
    .catch((error) => {
      // 处理请求失败的情况
      ElMessage({ type: 'erro', message: error })
      // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
    })
}
</script>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.pageDiv {
  margin-top: 2rem;
  margin-left: 28rem;
}
</style>
