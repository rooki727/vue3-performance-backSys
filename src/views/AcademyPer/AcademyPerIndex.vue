<template>
  <div class="academy-per-container">
    <el-card class="box-card">
      <div class="clearfix">
        <span class="card-title">学院绩效统计</span>
        <el-button type="success" @click="exportExcel" style="float: right">导出 Excel</el-button>
      </div>
      <el-table :data="collegeStatistics" style="width: 100%">
        <el-table-column prop="academy" label="学院" width="280"></el-table-column>
        <el-table-column prop="user_count" label="参与本次教师人数" width="280"></el-table-column>
        <el-table-column prop="academy_total" label="总绩效分数" width="280"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { getCollegeStatisticsAPI } from '@/apis/performanceAssessment.js'
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'
const collegeStatistics = ref([])
const getCollegeStatistics = async () => {
  const res = await getCollegeStatisticsAPI()
  if (res.code === '1') {
    collegeStatistics.value = res.data
  } else {
    console.error('查询失败', res.msg)
  }
}
const exportExcel = () => {
  const data = collegeStatistics.value.map((item) => ({
    学院: item.academy,
    教师人数: item.user_count,
    总绩效分数: item.academy_total
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '学院绩效统计')
  XLSX.writeFile(workbook, '学院绩效统计.xlsx')
}
onMounted(() => {
  getCollegeStatistics()
})
</script>

<style lang="scss" scoped>
.academy-per-container {
  padding: 20px;
  background-color: #f5f5f5;
}

.box-card {
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.el-table {
  margin-top: 20px;
}

.el-button {
  margin-left: 10px;
}
</style>