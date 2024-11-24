<template>
  <div>
    <el-table :data="currentPageData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column width="40" type="selection" />
      <el-table-column fixed prop="comment_id" label="comment_id" width="150" />
      <el-table-column prop="user_id" label="用户id" width="200" />
      <el-table-column prop="content" label="内容" width="860" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-popconfirm title="确认删除该评论吗" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button link type="primary" size="default"
                ><el-icon style="color: red" size="20px"><Delete /></el-icon
              ></el-button>
            </template>
          </el-popconfirm>
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
import { computed, ref } from 'vue'

const props = defineProps({
  commentList: {
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
const computedtable = computed(() => props.commentList)
const totalRowSize = computed(() => computedtable.value?.length)
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return computedtable.value?.slice(startIndex, endIndex)
})
// watch(
//   () => computedtable.value,
//   (newVal) => {
//     totalUser.value = newVal
//     console.log(totalUser.value)
//   },
//   {
//     deep: true
//   }
// )
// 获取选择框的内容
const multipleSelection = ref([])
const emit = defineEmits(['getDelTable'])

// 获取多选框的数据
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  if (multipleSelection.value.length > 0) {
    // 使用map方法遍历multipleSelection.value数组，并将每个选中项的id存储到一个新的数组中
    const selectedIds = multipleSelection.value.map((item) => item.comment_id)
    // 将所选数据提供给父组件
    emit('getDelTable', selectedIds)
  }
}

const handleDelete = async (row) => {
  console.log(row.comment_id)

  // 在这里使用 row 数据执行删除操作
  // api服务器删除后重新获取列表
  // deleteCommonUser(row.comment_id)
  //   .then(() => {
  //     ElMessage({ type: 'success', message: '删除成功' })
  //   })
  //   .catch((error) => {
  //     // 处理请求失败的情况
  //     ElMessage({ type: 'erro', message: error })
  //     // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
  //   })
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
