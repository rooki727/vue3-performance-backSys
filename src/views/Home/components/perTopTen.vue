<template>
  <div class="songTopTen" ref="chartContainer"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref, nextTick } from 'vue'
import { findAllPerformanceNowAPI } from '@/apis/performanceAssessment'
echarts.use([GridComponent, BarChart, CanvasRenderer])

const perTopList = ref([])
const processedData = ref([])
const getPerformancesAssessmentsById = async () => {
  const res = await findAllPerformanceNowAPI({
    page: 1,
    pageSize: 10,
    real_name: ''
  })
  res.data.forEach((item) => {
    perTopList.value.push({
      name: item.real_name,
      count: item.total_score
    })
  })
  // // 找到最大值的索引
  const maxIndex = perTopList.value.reduce((maxIdx, currentItem, currentIndex, array) => {
    return currentItem.count > array[maxIdx].count ? currentIndex : maxIdx
  }, 0)
  // 处理数据，给最大值的项添加 itemStyle 属性

  perTopList.value.forEach((item) =>
    processedData.value.push({
      value: item.count
    })
  )
  if (processedData.value[maxIndex]) {
    processedData.value[maxIndex].itemStyle = {
      color: 'red'
    }
  }

  console.log(perTopList.value)
}

// 绘制柱形图
const setCharts = () => {
  const chartBox = document.querySelector('.songTopTen')

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
      text: '教师绩效前十排名'
    },
    tooltip: {},
    xAxis: {
      data: perTopList.value.map((item) => item.name),
      axisLabel: {
        // 调整标签样式
        interval: 0, // 强制显示所有的标签
        fontSize: 11, // 设置字体大小
        margin: 10 // 设置标签与轴线之间的距离
      }
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '分数',
        type: 'bar',
        data: processedData.value
      }
    ]
  })

  // 手动触发 resize，确保图表尺寸适应容器
  myChart.resize()
}

// 确保图表在页面渲染完成后正确初始化
onMounted(() => {
  getPerformancesAssessmentsById().then(() => {
    setCharts()
  })
  nextTick(() => {
    setCharts()
  })
})

// 监听窗口或容器尺寸变化，确保图表动态调整
window.addEventListener('resize', () => {
  const chartBox = document.querySelector('.songTopTen')
  if (chartBox && chartBox.echartsInstance) {
    chartBox.echartsInstance.resize()
  }
})
</script>

<style lang="scss" scoped>
.songTopTen {
  margin: 2rem 0;
  padding: 1rem;
  width: 95%; /* 或使用固定宽度 */
  height: 55%; /* 或使用固定高度 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
