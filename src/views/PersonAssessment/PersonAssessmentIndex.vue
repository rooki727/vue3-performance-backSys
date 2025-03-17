<template>
  <div class="go-back" @click="goBack">
    <el-icon><Back /></el-icon>返回
  </div>
  <el-table style="padding: 10px" :data="assessmentList">
    <el-table-column label="评定人" width="200">
      <template #default="scope">
        <el-tag :style="[scope.row.assessment_type === 'admin' ? 'color: red' : 'color: green']">
          {{ scope.row.assessment_type === 'admin' ? '管理员' : '本人' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="indicator_name" label="指标名称" width="150"></el-table-column>
    <el-table-column prop="score" label="分数" width="120"></el-table-column>

    <el-table-column label="依据" width="300">
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
    <el-table-column prop="assessment_date" label="评定日期" width="300"></el-table-column>
    <el-table-column prop="assessment_id" label="assessment_id" width="150"></el-table-column>
    <el-table-column prop="performance_id" label="performance_id" width="150"></el-table-column>
    <el-table-column fixed="right" label="操作" width="230" v-if="role.value === 'admin'">
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
import { useLoginerStore } from '@/stores/LoginerStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()
const loginerStore = useLoginerStore()
const role = computed(() => loginerStore.userInfo.role)
const assessmentList = window.localStorage.getItem('performance_item')
  ? JSON.parse(window.localStorage.getItem('performance_item'))
  : []
// 处理数据，计算每个指标的平均分数并升序排序
const processedAssessmentList = computed(() => {
  const indicatorMap = new Map()

  assessmentList.forEach((item) => {
    if (!indicatorMap.has(item.indicator_name)) {
      indicatorMap.set(item.indicator_name, { totalScore: 0, count: 0, basis: item.basis })
    }
    const indicator = indicatorMap.get(item.indicator_name)
    indicator.totalScore += item.score
    indicator.count += 1
  })

  const result = Array.from(indicatorMap.entries())
    .map(([indicator_name, { totalScore, count, basis }]) => ({
      indicator_name,
      average_score: (totalScore / count).toFixed(2),
      basis
    }))
    // 新增过滤条件
    .filter((item) => parseFloat(item.average_score) < 80)
    // 保留原有排序
    .sort((a, b) => a.average_score - b.average_score)

  return result
})
const openTip = (value) => {
  ElNotification({
    title: 'Warning',
    message: `尊敬的${loginerStore.userInfo.real_name}老师，您该季度的【${value}】低于80分，有待提高~`,
    type: 'warning',
    duration: 0,
    offset: 60
  })
}

const goBack = () => {
  window.localStorage.removeItem('performance_item')
  router.go(-1)
}
onMounted(() => {
  console.log(processedAssessmentList.value)

  if (processedAssessmentList.value.length > 0) {
    // 将processedAssessmentList的indicater_name字段提取出来转换为string
    const indicatorNames = processedAssessmentList.value
      .map((item) => item.indicator_name)
      .join(',')
    openTip(indicatorNames)
  }
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