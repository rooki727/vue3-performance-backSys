<template>
  <div class="treeChartBox" ref="treeChartBox"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { TreeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, ref, watch } from 'vue'

echarts.use([TooltipComponent, TreeChart, CanvasRenderer])

const props = defineProps(['childrenArray'])
// 自定义的测试数据，可以根据需要替换成您想要的数据结构
// 创建根对象
const rootObject = ref({
  name: '图书分类'
})

// 树图部分
const setCharts = () => {
  const chartBox = document.querySelector('.treeChartBox')

  // 检查是否已经存在图表实例
  if (chartBox && chartBox.echartsInstance) {
    // 销毁现有的实例
    chartBox.echartsInstance.dispose()
  }

  var myChart = echarts.init(chartBox)

  myChart.showLoading()

  // 将自定义数据传递给图表
  myChart.hideLoading()
  rootObject.value.children.forEach(function (datum, index) {
    index % 2 === 0 && (datum.collapsed = true)
  })
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [rootObject.value], // 使用自定义数据
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  })

  // 将图表实例绑定到 DOM 元素上
  chartBox.echartsInstance = myChart
}

// 先写
const computedData = computed(() => props.childrenArray)
watch(
  () => computedData.value,
  (newVal) => {
    // 转换数据格式
    const treeEchartsData = ref([])
    newVal.forEach((item) => {
      treeEchartsData.value.push({
        name: item.category,
        value: item.value
      })
    })

    // 将 children 数组加入 rootObject
    rootObject.value.children = treeEchartsData.value
    setCharts()
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped>
div {
  padding-left: 3rem;
  width: 90rem;
  height: 40rem;
}
</style>
