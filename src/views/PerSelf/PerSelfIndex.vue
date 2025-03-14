<template>
  <editDialog
    :clickRow="clickRow"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
    @updateList="getSelfAssessList"
  ></editDialog>
  <addDialog
    :dialogFormVisible="dialogFormVisibleAdd"
    @changeDialogVisible="changeDialogVisibleAdd"
    @updateList="getSelfAssessList"
    :filterIndicatorList="filterIndicatorList"
  ></addDialog>
  <span class="titleTips"
    >本季度指标及占比重值如下:（每项指标满分为100），教师自评在管理员评定前可修改，请在自评开启十天内完成自评。{{
      startTime ? '本轮评定开始时间：' + startTime : ''
    }}
    {{ endTime ? '上轮评定结束时间：' + endTime : '' }}</span
  >
  <div class="indicator-list">
    <div class="indicator-item" v-for="item in indicatorList" :key="item.indicator_id">
      <div class="item-content">{{ item.indicator_name }}</div>
      <div class="item-content">{{ item.weight }}</div>
    </div>
  </div>
  <div style="margin-top: 15px">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem; margin-bottom: 1rem"
      ><el-icon><Plus /></el-icon>进行自评</el-button
    >
  </div>
  <el-table style="padding: 10px" :data="assessmentList">
    <el-table-column prop="real_name" label="姓名" width="150"></el-table-column>
    <el-table-column prop="indicator_name" label="指标名称" width="150"></el-table-column>
    <el-table-column prop="score" label="分数" width="120"></el-table-column>
    <el-table-column label="评定状态" width="200">
      <template #default="scope">
        <el-tag :style="[scope.row.assess_type === '待评定' ? 'color: red' : 'color: green']">{{
          scope.row.assess_type
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="依据" width="600">
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
    <el-table-column fixed="right" label="操作" width="230">
      <template #default="scope">
        <el-button
          v-if="scope.row.assess_type === '待评定'"
          link
          type="primary"
          size="small"
          @click="handleEdit(scope.row)"
          ><el-icon size="20px"><EditPen /></el-icon
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { getIndicatorListAPI } from '@/apis/indicators'
import { computed, onMounted, ref } from 'vue'
import { getSelfAssessmentByIdAPI } from '@/apis/selfAssessment'
import { useLoginerStore } from '@/stores/LoginerStore'
import addDialog from './components/addDialog.vue'
import editDialog from './components/editDialog.vue'
import { checkConfig } from '@/utils/checkConfig'
import { ElMessage } from 'element-plus'
import { getConfigAPI } from '@/apis/config'
const isOpenAssessment = computed(() => {
  return checkConfig(window.localStorage.getItem('check_open_assessment'))
})
const indicatorList = ref([])
const clickRow = ref({})
const assessmentList = ref([])
const loginerStore = useLoginerStore()
const user_id = computed(() => loginerStore.userInfo.user_id)
const startTime = ref('')
const endTime = ref('')
const filterIndicatorList = computed(() => {
  // 从 indicatorList 中筛选出那些不在 assessmentList 中的 indicator_id
  return indicatorList.value.filter((item) => {
    return (
      item.weight > 0 &&
      !assessmentList.value.some((assessment) => assessment.indicator_id === item.indicator_id)
    )
  })
})
const getSysConfig = async () => {
  const res = await getConfigAPI({ config_name: 'check_open_assessment' })
  window.localStorage.setItem('check_open_assessment', res.data.config_value)
  const resTime = await getConfigAPI({ config_name: 'open_date' })
  startTime.value = resTime.data.config_value
  const resEndTime = await getConfigAPI({ config_name: 'end_date' })
  endTime.value = resEndTime.data.config_value
}
const dialogTitle = ref('')
// 添加对话框
const dialogFormVisible = ref(false)
const dialogFormVisibleAdd = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
// 取消按钮时重置点击行
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}
const changeDialogVisibleAdd = (value) => {
  dialogFormVisibleAdd.value = value
}
// 点击打开添加表单
const openAddDialog = () => {
  if (isOpenAssessment.value) {
    dialogTitle.value = '添加教师'
    changeDialogVisibleAdd(true)
  } else {
    ElMessage.error('本季度绩效评定已关闭或未开启，请联系管理员')
  }
}
const getIndicatorList = async () => {
  const res = await getIndicatorListAPI()
  if (res.code == 1) {
    indicatorList.value = res.data
  }
}
// 获取个人评定列表
const getSelfAssessList = async () => {
  const res = await getSelfAssessmentByIdAPI({ user_id: user_id.value })
  if (res.code == 1) {
    assessmentList.value = res.data
  }
}
// 编辑
const handleEdit = (row) => {
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}
onMounted(() => {
  getIndicatorList()
  getSelfAssessList()
  getSysConfig()
})
</script>

<style lang="scss" scoped>
.titleTips {
  margin-left: 20px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  padding: 8px;
  background-color: #edc878c4;
  color: #f50808d8;
}
.indicator-list {
  margin-left: 50px;
  margin-top: 20px;
  display: flex;
  .indicator-item {
    width: 100px;
    .item-content {
      height: 50px;
      width: 100%;
      text-align: center;
      line-height: 50px;
      border: 1px solid #858484;
    }
  }
}
</style>