<template>
  <el-alert title="以下每一个模块为一个季度的总绩效，点击查看详情" type="warning" />
  <div class="person-his-per">
    <div
      class="per-item"
      v-for="(item, index) in perList"
      :key="item.performance_id"
      @click="goTodeatil(item)"
    >
      <div style="margin-top: 20px; font-size: 24px">第{{ perList.length - index }}季度</div>
      <div style="margin-top: 10px">姓名：{{ item.real_name }}</div>
      <div style="margin-top: 10px">总分：{{ item.total_score }}</div>
      <div style="margin-top: 10px">评定日期：<br />{{ item.performance_date }}</div>
    </div>
  </div>
</template>

<script setup>
import { getPerformancesAssessmentsByIdAPI } from '@/apis/performanceAssessment'
import { computed, onMounted, ref } from 'vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginerStore = useLoginerStore()
const user_id = computed(() => loginerStore.userInfo.user_id)
const perList = ref([])
const getPerformancesAssessmentsById = async () => {
  const res = await getPerformancesAssessmentsByIdAPI({
    user_id: user_id.value
  })
  perList.value = res.data
}
const goTodeatil = (item) => {
  window.localStorage.setItem('performance_item', JSON.stringify(item.assessmentList))
  router.push('/personAssessment')
}
onMounted(() => {
  getPerformancesAssessmentsById()
})
</script>

<style lang="scss" scoped>
.person-his-per {
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  .per-item {
    cursor: pointer;
    margin-right: 50px;
    margin-bottom: 50px;
    width: 200px;
    height: 200px;
    background-color: rgb(76, 181, 247);
    border-radius: 10px;
    transition: all 0.3s;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 20px;
  }
  .per-item:hover {
    transform: scale(1.1);
    background-color: rgba(107, 193, 247, 0.8);
  }
}
</style>