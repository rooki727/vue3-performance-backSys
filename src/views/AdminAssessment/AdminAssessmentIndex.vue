<template>
  <editDialog
    :clickRow="clickRow"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
    @updateList="getAssessmentById"
  ></editDialog>
  <div class="go-back" @click="goBack">
    <el-icon><Back /></el-icon>返回
  </div>
  <el-table style="padding: 10px" :data="assessmentList">
    <el-table-column label="评定人" width="150">
      <template #default="scope">
        <el-tag :style="[scope.row.assessment_type === 'admin' ? 'color: red' : 'color: green']">
          {{ scope.row.assessment_type === 'admin' ? '管理员' : '老师' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="indicator_name" label="指标名称" width="200"></el-table-column>
    <el-table-column prop="score" label="分数" width="120"></el-table-column>

    <el-table-column label="依据" width="200">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>依据: {{ scope.row.basis }}</div>
          </template>
          <template #reference>
            <el-tag>鼠标悬浮至此可查看详细依据</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="assessment_date" label="评定日期" width="270"></el-table-column>
    <el-table-column prop="assessment_id" label="assessment_id" width="150"></el-table-column>
    <el-table-column prop="performance_id" label="performance_id" width="150"></el-table-column>
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)"
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
</template>

<script setup>
import { useRouter } from 'vue-router'
import editDialog from './components/editDialog.vue'
import { getAssessmentByIdAPI, deleteAssessmentAPI } from '@/apis/managerAssessment'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
const clickRow = ref({})
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
// 取消按钮时重置点击行
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}

// 编辑
const handleEdit = (row) => {
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}
// 删除
const handleDelete = async (row) => {
  // 在这里使用 row 数据执行删除操作
  await deleteAssessmentAPI({
    assessment_id: row.assessment_id,
    performance_id: row.performance_id
  })
    .then(() => {
      ElMessage({ type: 'success', message: '删除成功' })
      getAssessmentById()
    })
    .catch((error) => {
      // 处理请求失败的情况
      ElMessage({ type: 'erro', message: error })
      // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
    })
}
const router = useRouter()
const assessmentList = ref([])

// 获取列表
const getAssessmentById = async () => {
  const res = await getAssessmentByIdAPI({
    performance_id: assessmentList.value[0].performance_id
  })
  assessmentList.value = res.data
  window.localStorage.setItem('performance_item', JSON.stringify(res.data))
}
const goBack = () => {
  window.localStorage.removeItem('performance_item')
  router.back()
}
onMounted(() => {
  assessmentList.value = window.localStorage.getItem('performance_item')
    ? JSON.parse(window.localStorage.getItem('performance_item'))
    : []
})
</script>

<style lang="scss" scoped>
.go-back {
  width: 50px;
  cursor: pointer;
  color: rgb(5, 181, 250);
  margin: 5px;
  transition: all 0.3s;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  display: flex;
  align-items: center;
}
.go-back:hover {
  color: rgb(46, 190, 247);
  transform: scale(1.01);
}
</style>