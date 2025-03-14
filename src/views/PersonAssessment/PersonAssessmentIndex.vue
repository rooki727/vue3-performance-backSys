<template>
  <div class="go-back" @click="goBack">
    <el-icon><Back /></el-icon>返回
  </div>
  <el-table style="padding: 10px" :data="assessmentList">
    <el-table-column label="评定人" width="200">
      <template #default="scope">
        <el-tag :style="[scope.row.assessment_type === 'admin' ? 'color: red' : 'color: green']">
          {{ scope.row.assessment_type === 'admin' ? '管理员' : '本人' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="indicator_name" label="指标名称" width="150"></el-table-column>
    <el-table-column prop="score" label="分数" width="120"></el-table-column>

    <el-table-column label="依据" width="300">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>依据: {{ scope.row.basis }}</div>
          </template>
          <template #reference>
            <el-tag>鼠标悬浮至此可查看详细依据</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="assessment_date" label="评定日期" width="300"></el-table-column>
    <el-table-column prop="assessment_id" label="assessment_id" width="150"></el-table-column>
    <el-table-column prop="performance_id" label="performance_id" width="150"></el-table-column>
    <el-table-column fixed="right" label="操作" width="230" v-if="role.value === 'admin'">
      <template #default="scope">
        <el-button
          v-if="scope.row.assess_type === '待评定'"
          link
          type="primary"
          size="small"
          @click="handleEdit(scope.row)"
          ><el-icon size="20px"><EditPen /></el-icon
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useLoginerStore } from '@/stores/LoginerStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginerStore = useLoginerStore()
const role = computed(() => loginerStore.userInfo.role)
const assessmentList = window.localStorage.getItem('performance_item')
  ? JSON.parse(window.localStorage.getItem('performance_item'))
  : []

const goBack = () => {
  window.localStorage.removeItem('performance_item')
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.go-back {
  width: 50px;
  cursor: pointer;
  color: rgb(5, 181, 250);
  margin: 5px;
  transition: all 0.3s;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  display: flex;
  align-items: center;
}
.go-back:hover {
  color: rgb(46, 190, 247);
  transform: scale(1.01);
}
</style>