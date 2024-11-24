<template>
  <editDialog
    :cannotInpId="cannotInpId"
    :clickRow="clickRow"
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @updateClickRow="updateClickRow"
    @changeDialogVisible="changeDialogVisible"
  ></editDialog>

  <div>
    <el-table :data="currentPageData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column width="40" type="selection" />
      <el-table-column fixed prop="song_id" label="song_id" width="100" />

      <el-table-column prop="song_img" label="歌曲图片" width="113">
        <template #default="scope">
          <div style="display: flex; flex-direction: column; align-items: center">
            <img
              :src="scope.row.song_img || '/singer-default.png'"
              alt=""
              style="width: 100px; height: 100px"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="song_name" label="歌名" width="420" />
      <el-table-column prop="album" label="专辑" width="360" />

      <el-table-column label="评论管理" width="150">
        <template #default="scope">
          <router-link
            :to="`/comment?song_id=${scope.row.song_id}`"
            style="text-decoration: none; color: rgb(3, 178, 247)"
            >评论管理</router-link
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="default" @click="handleEdit(scope.row)"
            ><el-icon size="20px"><EditPen /></el-icon
          ></el-button>

          <el-popconfirm title="确认删除该歌手数据吗" @confirm="handleDelete(scope.row)">
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
import editDialog from './editDialog.vue'
import { computed, ref } from 'vue'
// import { ElMessage } from 'element-plus'
// 获取t方法才可以在js代码里使用

// 添加对话框
const dialogTitle = ref('')
const dialogFormVisible = ref(false)
const clickRow = ref({})

const cannotInpId = ref(true)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}
// 取消按钮时重置点击行
const updateClickRow = (newValue) => {
  clickRow.value = newValue
}

const props = defineProps({
  songList: {
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
const computedtable = computed(() => props.songList)
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
    const selectedIds = multipleSelection.value.map((item) => item.song_id)
    // 将所选数据提供给父组件
    emit('getDelTable', selectedIds)
  }
}

// 编辑
const handleEdit = (row) => {
  dialogTitle.value = '编辑'
  changeDialogVisible(true)
  // 在这里使用 row 数据执行编辑操作
  clickRow.value = row
}

const handleDelete = async (row) => {
  console.log(row.song_id)

  // 在这里使用 row 数据执行删除操作
  // api服务器删除后重新获取列表
  // deleteCommonUser(row.song_id)
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
