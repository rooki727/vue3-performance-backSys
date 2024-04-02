<template>
  <el-table
    :data="props.tableformAdmin"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="45" />
    <el-table-column fixed prop="id" label="id" width="100" />
    <el-table-column fixed prop="name" :label="$t('messages.name')" width="150" />
    <el-table-column prop="account" :label="$t('messages.account')" width="200" />
    <el-table-column prop="gender" :label="$t('messages.gender')" width="120" />
    <el-table-column prop="verify" :label="$t('messages.verify')" width="120" />
    <el-table-column prop="phone" :label="$t('messages.phone')" width="210" />
    <el-table-column prop="email" :label="$t('messages.email')" show-overflow-tooltip width="250" />
    <el-table-column fixed="right" :label="$t('messages.operations')" width="280">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">{{
          $t('messages.edit')
        }}</el-button>
        <el-button link type="primary" size="small" @click="handleDelete(scope.row)">{{
          $t('messages.delete')
        }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['tableformAdmin'])
// 获取选择框的内容
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  console.log(multipleSelection.value.id)
}

const handleEdit = (row) => {
  // 在这里使用 row 数据执行编辑操作
  console.log('Clicked row data:', row)
}
const handleDelete = (row) => {
  // 在这里使用 row 数据执行删除操作
  console.log('Clicked row data:', row)
  // api服务器删除后重新获取列表
}
</script>

<style>
</style>