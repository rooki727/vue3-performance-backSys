<template>
  <editDialog
    :clickRow="clickRow"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
    @updateList="getSelfAssessList"
  ></editDialog>
  <span class="titleTips"
    >本季度指标及占比重值如下:（每项指标满分为100），管理员可点击按钮进行当前教师的指标评定，请管理员在开始评定后三十天内完成评定。{{
      startTime ? '本轮评定开始时间：' + startTime : ''
    }}
    {{ endTime ? '上轮评定结束时间：' + endTime : '' }}
  </span>
  <div class="indicator-list">
    <div class="indicator-item" v-for="item in indicatorList" :key="item.indicator_id">
      <div class="item-content">{{ item.indicator_name }}</div>
      <div class="item-content">{{ item.weight }}</div>
    </div>
  </div>
  <!-- 开关 -->
  <div class="openDiv">
    <span
      >是否开启本季度绩效评定？目前状态:<span
        style="color: red; font-weight: bold; margin: 0 5px"
        :style="{ color: isOpenConfig ? 'green' : 'red' }"
        >{{ isOpenConfig ? '已开启' : '关闭' }}</span
      ></span
    >
    <el-switch
      v-model="isOpenConfig"
      class="ml-2"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      @change="changeConfig"
    />
  </div>

  <!-- 搜索 -->
  <div style="margin-top: 10px">
    <el-input
      label="search"
      v-model.lazy="searchInput"
      style="width: 33rem; margin-left: 1rem"
      placeholder="根据姓名搜索"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">重置</el-button>
  </div>
  <el-table
    style="padding: 10px"
    :data="assessmentList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
  >
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
    <el-table-column label="依据" width="400">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="300px">
          <template #default>
            <div>依据: {{ scope.row.basis }}</div>
          </template>
          <template #reference>
            <el-tag>鼠标悬浮至此可查看详细依据</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="assessment_date" label="教师自评日期" width="250"></el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button
          v-if="scope.row.assess_type === '待评定'"
          link
          type="primary"
          size="small"
          @click="handleEdit(scope.row)"
          ><el-icon size="20px"><Tools /></el-icon
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
  <el-pagination
    style="margin: 20px 50px"
    background
    layout="prev, pager, next"
    :total="assessmentList.length"
    :page-size="pageSize"
    @current-change="handlePageChange"
  />
</template>

<script setup>
import { getIndicatorListAPI } from '@/apis/indicators'
import { onMounted, ref } from 'vue'
import { getSelfAssessmentListAPI, deleteSelfAssessmentAPI } from '@/apis/selfAssessment'
import editDialog from './components/editDialog.vue'
import { checkConfig } from '@/utils/checkConfig'
import { getConfigAPI, updateConfigAPI } from '@/apis/config'
import { ElMessage } from 'element-plus'
const indicatorList = ref([])
const clickRow = ref({})
const assessmentList = ref([])
const originalData = ref([])
const currentPage = ref(1)
const pageSize = ref(8)
const isOpenConfig = ref(false)
const startTime = ref('')
const endTime = ref('')
isOpenConfig.value = checkConfig(window.localStorage.getItem('check_open_assessment'))
// 获取当前季度绩效是否开启评定
const getSysConfig = async () => {
  const res = await getConfigAPI({ config_name: 'check_open_assessment' })
  window.localStorage.setItem('check_open_assessment', res.data.config_value)
  const resTime = await getConfigAPI({ config_name: 'open_date' })
  startTime.value = resTime.data.config_value
  const resEndTime = await getConfigAPI({ config_name: 'end_date' })
  endTime.value = resEndTime.data.config_value
}
const changeConfig = async (value) => {
  const date = new Date()
  const res = await updateConfigAPI({
    config_name: 'check_open_assessment',
    config_value: value ? '1' : '0'
  })
  if (value) {
    await updateConfigAPI({
      config_name: 'open_date',
      config_value: date.toLocaleDateString()
    })
    await updateConfigAPI({
      config_name: 'end_date',
      config_value: ''
    })
  } else {
    await updateConfigAPI({
      config_name: 'end_date',
      config_value: date.toLocaleDateString()
    })
    await updateConfigAPI({
      config_name: 'open_date',
      config_value: ''
    })
  }
  if (res.code == 1) {
    getSysConfig()
  }
}
const handlePageChange = (page) => {
  currentPage.value = page
}
// 添加对话框
const dialogFormVisible = ref(false)

const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
// 取消按钮时重置点击行
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}

const getIndicatorList = async () => {
  const res = await getIndicatorListAPI()
  if (res.code == 1) {
    indicatorList.value = res.data
  }
}
// 获取个人评定列表
const getSelfAssessList = async () => {
  const res = await getSelfAssessmentListAPI()
  if (res.code == 1) {
    assessmentList.value = res.data
    originalData.value = res.data
  }
}
// 编辑
const handleEdit = (row) => {
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}
// 搜索功能变量
const searchInput = ref('')
// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  assessmentList.value = [...originalData.value]
}
let debounceTimer = null // 在函数外部定义定时器变量，以保证它在多个调用之间是共享的

const handleSearch = (inputvalue) => {
  // 清除上一次的定时器
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  // 设置新的定时器
  debounceTimer = setTimeout(() => {
    // 如果输入为空，恢复原始数据
    if (inputvalue === '') {
      assessmentList.value = [...originalData.value]
    } else {
      // 根据输入值过滤数据
      const filteredData = originalData.value.filter((item) =>
        item?.real_name?.includes(inputvalue)
      )
      // 更新表格数据
      assessmentList.value = filteredData
    }
  }, 500) // 500毫秒后触发搜索，可以根据需要调整
}
const handleDelete = async (row) => {
  // 在这里使用 row 数据执行删除操作
  await deleteSelfAssessmentAPI({ self_assessment_id: row.self_assessment_id })
    .then(() => {
      ElMessage({ type: 'success', message: '删除成功' })
      getSelfAssessList()
    })
    .catch((error) => {
      // 处理请求失败的情况
      ElMessage({ type: 'erro', message: error })
      // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
    })
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
.openDiv {
  border-radius: 20px;
  padding: 3px 10px;
  box-shadow: 1px 1px 5px #858484;
  width: 380px;
  margin-left: 50px;
  margin-top: 20px;
  span {
    margin-right: 20px;
  }
}
</style>