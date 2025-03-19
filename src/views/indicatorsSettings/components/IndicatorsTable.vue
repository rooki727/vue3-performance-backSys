<template>
  <editDialog
    :cannotInpId="cannotInpId"
    :clickRow="clickRow"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
    @updateList="updateList"
  ></editDialog>
  <div>
    <el-table :data="currentPageData" style="width: 100%">
      <el-table-column width="40" type="selection" />
      <el-table-column fixed prop="indicator_id" label="指标id" width="200" />
      <el-table-column prop="indicator_name" label="指标名称" width="320" />
      <el-table-column prop="weight" label="占比" width="160" />
      <el-table-column prop="created_at" label="创建时间" show-overflow-tooltip width="400" />
      <el-table-column fixed="right" label="操作" width="230">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)"
            ><el-icon size="20px"><EditPen /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageDiv">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[6, 8, 10, 12]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRowSize"
      />
    </div>
  </div>
</template>

<script setup>
import editDialog from './editDialog.vue'
import { computed, ref, inject } from 'vue'
// 获取t方法才可以在js代码里使用

// 添加对话框
const dialogFormVisible = ref(false)
const clickRow = ref({})
const cannotInpId = ref(true)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
const getTableForm = inject('getTableForm')
const updateList = () => {
  getTableForm()
}
// 取消按钮时重置点击行
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}
const props = defineProps({
  indicatorsList: {
    type: Array
  }
})

// 分页功能
const pageSize = ref(6)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentPage = ref(1)
// 将代码table监听获值
const computedtable = computed(() => props.indicatorsList)

const totalRowSize = computed(() => computedtable.value?.length)
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return computedtable.value.slice(startIndex, endIndex)
})

// 编辑
const handleEdit = (row) => {
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}
</script>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.pageDiv {
  margin-top: 2rem;
  margin-left: 28rem;
}
</style>
