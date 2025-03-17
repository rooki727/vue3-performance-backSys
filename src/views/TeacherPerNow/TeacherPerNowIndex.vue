<template>
  <el-alert
    title="本季度绩效公布如下，排名由分数高至低，需要查找指定教师，请使用输入框搜索名字，希望各位教师再接再厉！"
    type="warning"
  />
  <div>
    <el-input
      v-model.lazy="searchQuery"
      placeholder="根据姓名搜索"
      @input="throttledHandleSearch"
      clearable
      style="margin-bottom: 20px; margin-left: 20px; width: 400px"
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 2rem; margin-top: -1.1rem"
      >重置</el-button
    >
    <el-button type="success" style="margin-left: 4rem; margin-top: -1.1rem" @click="exportExcel"
      >导出Excel</el-button
    >
    <el-button type="danger" style="margin-left: 1.5rem; margin-top: -1.1rem" @click="exportPDF"
      >导出PDF</el-button
    >
    <el-table ref="pdfTable" style="padding: 10px; width: 100%" :data="perList">
      <el-table-column prop="performance_id" label="绩效编号" width="200"></el-table-column>
      <el-table-column prop="performance_date" label="评定时间" width="400"></el-table-column>
      <el-table-column prop="real_name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="total_score" label="总分数" width="200"></el-table-column>
      <el-table-column fixed="right" label="查看详情" width="280">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="goTodeatil(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" v-if="role === 'admin'">
        <template #default="scope">
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
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handlePageChange"
      style="margin-top: 20px"
    />
  </div>
</template>

<script setup>
import { findAllPerformanceNowAPI, deletePerformanceAPI } from '@/apis/performanceAssessment'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { throttle } from 'lodash'
import { ElMessage } from 'element-plus'
import { useLoginerStore } from '@/stores/LoginerStore'
import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const loginerStore = useLoginerStore()
const role = computed(() => loginerStore.userInfo.role)
const router = useRouter()
const perList = ref([])
const searchQuery = ref('')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const pdfTable = ref(null)

const getPerformancesAssessmentsById = async () => {
  const res = await findAllPerformanceNowAPI({
    page: page.value,
    pageSize: pageSize.value,
    real_name: searchQuery.value
  })
  perList.value = res.data
  total.value = res.totalCount
}

const handleSearch = async () => {
  page.value = 1
  getPerformancesAssessmentsById()
}

const throttledHandleSearch = throttle(handleSearch, 800)

const resetSearch = () => {
  searchQuery.value = ''
  page.value = 1
  getPerformancesAssessmentsById()
}

const handlePageChange = (newPage) => {
  page.value = newPage
  getPerformancesAssessmentsById()
}

const goTodeatil = (item) => {
  window.localStorage.setItem('performance_item', JSON.stringify(item.assessmentList))
  if (role.value === 'admin') {
    router.push('/adminAssessment')
  } else {
    router.push('/personAssessment')
  }
}

const exportExcel = () => {
  const data = perList.value.map((item) => {
    const assessments = item.assessmentList
      .map(
        (assess) =>
          `指标名称: ${assess.indicator_name}, 分数: ${assess.score}, 评定类型: ${assess.assessment_type}, 依据: ${assess.basis}`
      )
      .join('; ')
    return {
      绩效编号: item.performance_id,
      评定时间: item.performance_date,
      姓名: item.real_name,
      总分数: item.total_score,
      评估详情: assessments
    }
  })

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '绩效数据')
  XLSX.writeFile(workbook, '当前季度绩效数据.xlsx')
}

const exportPDF = async () => {
  try {
    const table = pdfTable.value.$el.cloneNode(true)
    // 移除操作列
    const actionColumns = table.querySelectorAll('.el-table__fixed-right')
    actionColumns.forEach((col) => col.remove())

    // 设置临时样式
    table.style.width = '100%'
    table.style.overflow = 'visible'
    document.body.appendChild(table)

    const canvas = await html2canvas(table, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('l', 'mm', 'a4') // 横向布局
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // 计算图片比例
    const imgWidth = pageWidth - 20 // 左右边距各10mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // 添加水印
    pdf.setFontSize(40)
    pdf.setTextColor(200, 200, 200)
    pdf.text('绩效数据', pageWidth / 2, pageHeight / 2, {
      align: 'center',
      angle: 45
    })

    // 添加表格图片
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)

    // 清理临时元素
    document.body.removeChild(table)
    pdf.save('当前季度绩效数据.pdf')
  } catch (error) {
    ElMessage.error('PDF导出失败: ' + error.message)
  }
}

const handleDelete = async (row) => {
  await deletePerformanceAPI({
    performance_id: row.performance_id
  })
    .then(() => {
      ElMessage({ type: 'success', message: '删除成功' })
      getPerformancesAssessmentsById()
    })
    .catch((error) => {
      ElMessage({ type: 'error', message: error.message })
    })
}

onMounted(() => {
  getPerformancesAssessmentsById()
})
</script>

<style lang="scss" scoped>
@media print {
  .el-table {
    width: 100% !important;
    max-width: 100% !important;

    &__header-wrapper,
    &__body-wrapper {
      width: 100% !important;
    }

    td,
    th {
      padding: 5px !important;
      font-size: 12px !important;
      white-space: normal !important;
    }

    .cell {
      white-space: normal !important;
      line-height: 1.5 !important;
    }
  }
}

.pdf-export-table {
  .el-table {
    width: max-content !important;

    &__body {
      width: 100% !important;
    }
  }
}

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

@media print {
  .el-pagination,
  .el-button,
  .el-alert {
    display: none !important;
  }

  .el-table__fixed-right {
    display: none !important;
  }
}
</style>