
<script setup>
import { onMounted, computed } from 'vue'
import * as echarts from 'echarts'
import { useOrderStore } from '@/stores/OrderStore'
import { useI18n } from 'vue-i18n'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
const orderStore = useOrderStore()
// store来的数据，如果需要在script使用，需要使用计算书写拿过来再用
const sixListValue = computed(() => orderStore.order.MonthSaleList)
const setCharts = () => {
  var myChart = echarts.init(document.querySelector('.baseChartBox'))
  // 绘制图表
  myChart.setOption({
    title: {
      text: t('messages.seven_major_book_categories')
    },
    tooltip: {},
    xAxis: {
      data: sixListValue.value?.map((item) => item.catetory)
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: sixListValue.value?.map((item) => item.count)
      }
    ]
  })
}

onMounted(() => {
  setCharts()
})
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