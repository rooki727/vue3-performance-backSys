
<script setup>
import { computed, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { useBookStore } from '@/stores/BookStore'
import { useI18n } from 'vue-i18n'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const BookStore = useBookStore()
// store来的数据，如果需要在script使用，需要使用计算书写拿过来再用
const monthList = ref([])
const computedMonthList = computed(() => BookStore.monthSaleList)
watch(
  () => computedMonthList.value,
  (newVal) => {
    monthList.value = newVal
    setCharts()
  },
  {
    deep: true
  }
)
const setCharts = () => {
  const chartBox = document.querySelector('.baseChartBox')

  // 检查是否已经存在图表实例
  if (chartBox && chartBox.echartsInstance) {
    // 销毁现有的实例
    chartBox.echartsInstance.dispose()
  }

  var myChart = echarts.init(chartBox)
  // 绘制图表
  myChart.setOption({
    title: {
      text: t('messages.seven_major_book_categories')
    },
    tooltip: {},
    xAxis: {
      data: monthList.value.map((item) => item.category)
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: monthList.value.map((item) => item.value)
      }
    ]
  })
}
</script>

<template>
  <div class="baseChartBox" ref="baseChartBox"></div>
</template>


<style scoped lang="scss">
div {
  padding-left: 50px;
  width: 880px;
  height: 420px;
}
</style>