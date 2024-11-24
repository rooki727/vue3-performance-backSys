<template>
  <div class="songTopTen"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref, nextTick } from 'vue'

echarts.use([GridComponent, BarChart, CanvasRenderer])

const songTopTenList = ref([
  { name: '歌曲1', count: 111 },
  { name: '歌曲2', count: 121 },
  { name: '歌曲3', count: 131 },
  { name: '歌曲4', count: 141 },
  { name: '歌曲5', count: 151 },
  { name: '歌曲6', count: 161 },
  { name: '歌曲7', count: 191 },
  { name: '歌曲8', count: 171 },
  { name: '歌曲9', count: 181 },
  { name: '歌曲10', count: 101 }
])
// 找到最大值的索引
const maxIndex = songTopTenList.value.reduce((maxIdx, currentItem, currentIndex, array) => {
  return currentItem.count > array[maxIdx].count ? currentIndex : maxIdx
}, 0)
// 处理数据，给最大值的项添加 itemStyle 属性
const processedData = ref([])
songTopTenList.value.forEach((item) =>
  processedData.value.push({
    value: item.count
  })
)
processedData.value[maxIndex].itemStyle = {
  color: 'red'
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
      text: '歌曲热播Top10'
    },
    tooltip: {},
    xAxis: {
      data: songTopTenList.value.map((item) => item.name)
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '播放量',
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
