<template>
  <div class="treeChartBox" ref="treeChartBox"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { TreeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
echarts.use([TooltipComponent, TreeChart, CanvasRenderer])
//定义各类的数据数组
const CategoryStore = useCategoryStore()

// 自定义的测试数据，可以根据需要替换成您想要的数据结构
// 创建根对象
const rootObject = ref({
  name: '图书分类',
  children: []
})
const childrenArray = ref([])

// 树图部分
const setCharts = () => {
  var myChart = echarts.init(document.querySelector('.treeChartBox'))

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
}

// 获取各类数据
const getData = async () => {
  await CategoryStore.getcategoriesList(),
    await CategoryStore.getliteratureList(),
    await CategoryStore.getscienceList(),
    await CategoryStore.gethistoryList(),
    await CategoryStore.getsocialSciencesList(),
    await CategoryStore.getpopularScienceList(),
    await CategoryStore.getlifeList(),
    await CategoryStore.getartsList()
}

// 转换数组函数
const exChangeArray = () => {
  // 创建 Root 的 children 数组
  const data = computed(() => CategoryStore.data)
  console.log(data.value)
  data.value.categoriesList.value.forEach((item) => {
    childrenArray.value.push({
      name: item.catetory,
      value: item.count
    })
  })

  childrenArray.value[0].children = data.value.literatureList.value
  childrenArray.value[1].children = data.value.scienceList.value
  childrenArray.value[2].children = data.value.historyList.value
  childrenArray.value[3].children = data.value.popularScienceList.value
  childrenArray.value[4].children = data.value.artsList.value
  childrenArray.value[5].children = data.value.socialSciencesList.value
  childrenArray.value[6].children = data.value.lifeList.value
  // 将 children 数组加入 rootObject
  rootObject.value.children = childrenArray.value
}

onMounted(() => {
  Promise.all([getData()]).then(() => {
    // 执行后续代码
    exChangeArray()
    // 数据获取后再渲染图
    setCharts()
  })
})
</script>

<style lang="scss" scoped>
div {
  padding-left: 3rem;
  width: 90rem;
  height: 40rem;
}
</style>
