
<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { useBookStore } from '@/stores/BookStore'
import { useI18n } from 'vue-i18n'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const bookStore = useBookStore()
const getcategoryList = ref([])
// store来的数据，如果需要在script使用，需要使用计算书写拿过来再用
const ListValue = computed(() => bookStore.categoryList)
watch(
  () => ListValue.value,
  (newVal) => {
    getcategoryList.value = newVal.map((item) => {
      return { value: item.count, name: item.catetory }
    })
    // 数据更新后重新渲染图表
    setCharts()
  },
  {
    deep: true
  }
)

const setCharts = () => {
  var myChart = echarts.init(document.querySelector('.vertical-chart-box'))
  // 绘制图表
  myChart.setOption({
    title: {
      text: t('messages.Number_of_book_categories'),
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: getcategoryList.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}

onMounted(() => {
  setCharts()
})
</script>

<template>
  <div class="vertical-chart-box" ref="baseChartBox"></div>
</template>


<style scoped lang="scss">
div {
  width: 450px;
  height: 500px;
}
</style>