<template>
  <div class="academy-per-container">
    <el-card class="box-card">
      <div class="clearfix">
        <span class="card-title">学院绩效统计</span>
        <el-button type="danger" @click="exportPDF" style="float: right">导出 PDF</el-button>
        <el-button type="success" @click="exportExcel" style="float: right">导出 Excel</el-button>
      </div>
      <el-table ref="pdfTable" :data="collegeStatistics" style="width: 100%">
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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ElMessage } from 'element-plus'

const collegeStatistics = ref([])
const pdfTable = ref(null)

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

const exportPDF = async () => {
  try {
    // 克隆表格DOM并设置临时样式
    const table = pdfTable.value.$el.cloneNode(true)
    table.style.width = '100%'
    table.style.overflow = 'visible'
    document.body.appendChild(table)

    // 生成canvas
    const canvas = await html2canvas(table, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY
    })

    // 创建PDF
    const pdf = new jsPDF('l', 'mm', 'a4') // 横向布局
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // 计算图片尺寸
    const imgWidth = pageWidth - 20 // 左右各留10mm边距
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // 添加水印
    pdf.setFontSize(40)
    pdf.setTextColor(200, 200, 200)
    pdf.text('学院绩效统计', pageWidth / 2, pageHeight / 2, {
      align: 'center',
      angle: 45
    })

    // 添加表格图片
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, imgWidth, imgHeight)

    // 清理临时元素
    document.body.removeChild(table)
    pdf.save('学院绩效统计.pdf')
  } catch (error) {
    ElMessage.error('PDF导出失败: ' + error.message)
  }
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

@media print {
  .box-card {
    box-shadow: none;
    border: none;
  }

  .el-card__header {
    display: none !important;
  }
}
</style>