<template>
  <el-alert
    v-if="!isTeacher(role)"
    title="请管理员仔细检查各项数据和附件的真实性，点击红色待审核按钮完成审核。"
    type="warning"
    show-icon
    :closable="false"
  ></el-alert>
  <editDialog
    :cannotInpId="cannotInpId"
    :clickRow="clickRow"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
    @updateList="updateList"
  ></editDialog>
  <div>
    <el-table :data="currentPageData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column width="40" type="selection" />
      <el-table-column fixed prop="research_id" label="research_id" width="110" />
      <el-table-column prop="real_name" label="真实姓名" width="120" />
      <el-table-column prop="title" label="标题" width="100" />
      <el-table-column prop="category" label="科研类别" width="120" />
      <el-table-column prop="sub_type" label="专利类别/成果类别" width="150" />
      <el-table-column prop="level" label="级别" width="100" />
      <el-table-column prop="start_date" label="开始时间" width="200" />
      <el-table-column prop="end_date" label="结束时间" width="200" />
      <el-table-column prop="funding" label="经费" width="100" />
      <el-table-column prop="publisher" label="出版社" width="100" />
      <el-table-column prop="ranking" label="排名" width="100" />
      <el-table-column prop="is_authorized" label="是否授权" width="100" />
      <el-table-column label="描述" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>依据: {{ scope.row.description }}</div>
            </template>
            <template #reference>
              <el-tag>鼠标移至此可查看描述</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="created_date" label="上报时间" width="200" />
      <el-table-column label="审核状态" width="100">
        <template #default="scope">
          <el-tag
            v-if="isTeacher(role)"
            :style="[scope.row.check_status === '待审核' ? 'color: red' : 'color: green']"
            >{{ scope.row.check_status }}</el-tag
          >
          <el-popconfirm
            title="你确认检查完毕并完成审核?"
            v-else-if="scope.row.check_status === '待审核'"
            @confirm="checkTask(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">{{ scope.row.check_status }}</el-button>
            </template>
          </el-popconfirm>
          <el-button v-else size="small" type="success">{{ scope.row.check_status }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="附件链接" width="500">
        <template #default="scope">
          <el-link type="primary" :underline="false" :href="scope.row.file_link" download>
            {{ scope.row.file_link }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
            :disabled="isTeacher(role) && scope.row.check_status === '已审核'"
            ><el-icon size="20px"><EditPen /></el-icon
          ></el-button>

          <el-popconfirm title="确认删除本行数据吗" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button link type="primary" size="small"
                ><el-icon style="color: red" size="20px"><Delete /></el-icon
              ></el-button>
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
import { computed, ref, inject } from 'vue'
import { deleteResearchAPI, checkStatusAPI } from '@/apis/research'
import { ElMessage } from 'element-plus'
import { isTeacher } from '@/utils/checkRole'
import { useLoginerStore } from '@/stores/LoginerStore'
const loginerStore = useLoginerStore()
loginerStore.getUserInfo()
const role = computed(() => loginerStore.userInfo.role)

// 添加对话框
const dialogTitle = ref('')
const dialogFormVisible = ref(false)
const clickRow = ref({})
const cannotInpId = ref(true)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
const getTableForm = inject('getTableForm')
const updateList = () => {
  getTableForm()
}
// 取消按钮时重置点击行
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}
const props = defineProps({
  researchTable: {
    type: Array
  }
})

// 分页功能
const pageSize = ref(6)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentPage = ref(1)
// 将代码table监听获值
const computedtable = computed(() => props.researchTable)

const totalRowSize = computed(() => computedtable.value?.length)
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return computedtable.value.slice(startIndex, endIndex)
})
// 获取选择框的内容
const multipleSelection = ref([])
const emit = defineEmits(['getDelTable'])

// 获取多选框的数据
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  if (multipleSelection.value.length > 0) {
    // 使用map方法遍历multipleSelection.value数组，并将每个选中项的id存储到一个新的数组中
    const selectedIds = multipleSelection.value.map((item) => item.research_id)
    // 将所选数据提供给父组件
    emit('getDelTable', selectedIds)
  }
}

// 编辑
const handleEdit = (row) => {
  dialogTitle.value = '编辑'
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}

const handleDelete = async (row) => {
  // 在这里使用 row 数据执行删除操作
  await deleteResearchAPI(row.research_id)
    .then(() => {
      ElMessage({ type: 'success', message: '删除成功' })
      getTableForm()
    })
    .catch((error) => {
      // 处理请求失败的情况
      ElMessage({ type: 'erro', message: error })
    })
}
// 审核
const checkTask = async (row) => {
  if (row.check_status === '待审核') {
    // 在这里使用 row 数据执行审核操作
    await checkStatusAPI({ research_id: row.research_id, check_status: '已审核' }).then(() => {
      ElMessage({ type: 'success', message: '审核成功' })
      getTableForm()
    })
  }
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
