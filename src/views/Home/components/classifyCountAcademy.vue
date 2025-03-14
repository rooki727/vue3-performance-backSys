<template>
  <div class="classifyCountSeven"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, onMounted, nextTick } from 'vue'
import { getAcademyCountAPI } from '@/apis/home'
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

const academyCountList = ref([])
const getAcademyCount = async () => {
  const res = await getAcademyCountAPI()
  res.data.forEach((item) => {
    academyCountList.value.push({
      value: item.home_count,
      name: item.home_name
    })
  })
}
// 绘制图
const setCharts = () => {
  const chartBox = document.querySelector('.classifyCountSeven')

  // 检查是否已经存在图表实例
  if (chartBox && chartBox.echartsInstance) {
    // 销毁现有的实例
    chartBox.echartsInstance.dispose()
  }

  var myChart = echarts.init(chartBox)
  chartBox.echartsInstance = myChart // 将实例保存到容器中
  // 绘制图表
  myChart.setOption({
    title: {
      text: '歌曲类别数量Top7',
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
        name: '',
        type: 'pie',
        radius: '80%',
        data: academyCountList.value,
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

  // 手动触发 resize，确保图表尺寸适应容器
  myChart.resize()
}

// 确保图表在页面渲染完成后正确初始化
onMounted(() => {
  getAcademyCount().then(() => {
    setCharts()
  })
  nextTick(() => {
    setCharts()
  })
})

// 监听窗口或容器尺寸变化，确保图表动态调整
window.addEventListener('resize', () => {
  const chartBox = document.querySelector('.classifyCountSeven')
  if (chartBox && chartBox.echartsInstance) {
    chartBox.echartsInstance.resize()
  }
})
</script>

<style lang="scss" scoped>
.classifyCountSeven {
  padding: 1rem;
  width: 95%; /* 或使用固定宽度 */
  height: 55%; /* 或使用固定高度 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>