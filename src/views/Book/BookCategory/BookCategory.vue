<template>
  <div class="opCategory"></div>
  <TreeEcharts :childrenArray="childrenArray"></TreeEcharts>
</template>

<script setup>
import TreeEcharts from './components/TreeEcharts.vue'
import { onMounted, ref } from 'vue'
import { getcategoryListAPI } from '@/apis/book'
// import { useI18n } from 'vue-i18n'

// // 获取t方法才可以在js代码里使用
// const { t } = useI18n()
//定义各类的数据数组
const childrenArray = ref([])
// 获取categoryList
const getcategoryList = async () => {
  const res = await getcategoryListAPI()
  childrenArray.value = res
}

onMounted(() => getcategoryList())
</script>

<style lang="scss" scoped>
.opCategory {
  margin-left: 2vw;
}
</style>
