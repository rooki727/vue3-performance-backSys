<template>
  <addCateDialog
    :orginData="orginData"
    :dialogArray="dialogArray"
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @changeDialogVisible="changeDialogVisible"
    @getNewData="getNewData"
  ></addCateDialog>

  <delCateDialog
    :childrenArray="childrenArray"
    :dialogArray="dialogArray"
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible2"
    @changeDialogVisible="changeDialogVisible2"
    @getNewData="getNewData"
  ></delCateDialog>
  <div class="opCategory">
    <el-button type="primary" round @click="openAddDialog"
      ><el-icon><Plus /></el-icon>{{ $t('messages.addcategoryTitle') }}</el-button
    >
    <el-button type="danger" round @click="openDelDialog"
      ><el-icon><DeleteFilled /></el-icon>{{ $t('messages.delcategoryTitle') }}</el-button
    >
  </div>
  <TreeEcharts :childrenArray="childrenArray"></TreeEcharts>
</template>

<script setup>
import TreeEcharts from './components/TreeEcharts.vue'
import { computed, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import addCateDialog from './components/addCateDialog.vue'
import delCateDialog from './components/delCateDialog.vue'
import { useI18n } from 'vue-i18n'
// import { ElMessage } from 'element-plus'

// 获取t方法才可以在js代码里使用
const { t } = useI18n()
//定义各类的数据数组
const CategoryStore = useCategoryStore()
const data = computed(() => CategoryStore.data)
const orginData = ref({})
orginData.value = data.value
const dialogArray = ref([])
const childrenArray = ref([])
// 添加对话框
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
const changeDialogVisible2 = (value) => {
  dialogFormVisible2.value = value
}
const dialogTitle = ref('')
// 点击打开添加表单
const openAddDialog = () => {
  dialogTitle.value = t('messages.addcategoryTitle')
  changeDialogVisible(true)
}

// 点击打开删除表单
const openDelDialog = () => {
  dialogTitle.value = t('messages.delcategoryTitle')
  changeDialogVisible2(true)
}

// 转换数组函数
const exChangeArray = () => {
  // 创建 Root 的 children 数组
  dialogArray.value = orginData.value.categoriesList.value
  orginData.value.categoriesList.value.forEach((item) => {
    childrenArray.value.push({
      name: item.name,
      value: item.value
    })
  })

  childrenArray.value[0].children = orginData.value.literatureList.value
  childrenArray.value[1].children = orginData.value.scienceList.value
  childrenArray.value[2].children = orginData.value.historyList.value
  childrenArray.value[3].children = orginData.value.popularScienceList.value
  childrenArray.value[4].children = orginData.value.artsList.value
  childrenArray.value[5].children = orginData.value.socialSciencesList.value
  childrenArray.value[6].children = orginData.value.lifeList.value
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
const getNewData = async () => {
  orginData.value = {}
  dialogArray.value = []
  childrenArray.value = []
  Promise.all([getData()]).then(async () => {
    const newData = computed(() => CategoryStore.data)
    orginData.value = newData.value
    // 执行后续代码
    exChangeArray()
  })
}
onMounted(() => {
  Promise.all([getData()]).then(() => {
    // 执行后续代码
    exChangeArray()
  })
})
</script>

<style lang="scss" scoped>
.opCategory {
  margin-left: 2vw;
}
</style>
