<script setup>
import CommentTable from './components/CommentTable.vue'
import { ref, onMounted } from 'vue'

import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
// 取消按钮时重置点击行
const song_id = route.query.song_id
// 获取t方法才可以在js代码里使用

// 搜索功能变量
const searchInput = ref('')
// 表格内容
const commentList = ref([
  {
    comment_id: 1,
    user_id: 1,
    content: '评论1'
  },
  {
    comment_id: 2,
    user_id: 2,
    content: '评论2'
  }
])

// 获取table数据
const getTableForm = async () => {
  // 请求接口
}

// 搜索功能
// 备份原始数据
const originalData = [...commentList.value]
const resetSearch = () => {
  searchInput.value = ''
  commentList.value = [...originalData]
}
let debounceTimer = null // 在函数外部定义定时器变量，以保证它在多个调用之间是共享的

const handleSearch = (inputvalue) => {
  // 清除上一次的定时器
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  // 设置新的定时器
  debounceTimer = setTimeout(() => {
    // 如果输入为空，恢复原始数据
    if (inputvalue === '') {
      commentList.value = [...originalData]
    } else {
      // 根据输入值过滤数据
      const filteredData = originalData.filter((item) => item?.user_id == inputvalue)
      // 更新表格数据
      commentList.value = filteredData
    }
  }, 300) // 300毫秒后触发搜索，可以根据需要调整
}

// 批量删除功能
const delTableId = ref([])
const getDelTable = (value) => {
  delTableId.value = value
  console.log(delTableId.value)
}
const blukDel = () => {
  if (delTableId.value.length > 0) {
    // 执行请求操作
    // delTableId.value.forEach((item) => deleteCommonUser(item))
    ElMessage({ type: 'success', message: '批量删除成功' })
    // 删除完后清空数据
    delTableId.value = []
  } else {
    ElMessage({
      type: 'error',
      message: '请勾选需要删除的数据'
    })
  }
}
// 返回
const goBack = () => {
  router.back()
}
// 加载网页加载数据
onMounted(() => {
  getTableForm()
})
</script>

<template>
  <div class="commentHeader">
    <button @click="goBack" class="backBtn">
      <el-icon><DArrowLeft /></el-icon>返回
    </button>
    <span class="commentTitle">歌曲song_id为：{{ song_id }}的评论信息</span>
  </div>
  <div class="search">
    <el-input
      label="search"
      v-model="searchInput"
      style="width: 33rem; margin-left: 1rem"
      placeholder="根据用户id搜索"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">重置</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button type="danger" @click="blukDel" style="margin-left: 1rem"
      ><el-icon><DeleteFilled /></el-icon>批量删除</el-button
    >
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <CommentTable :commentList="commentList" @getDelTable="getDelTable"></CommentTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
.commentHeader {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  .backBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 1rem;
    background-color: transparent;
    border: none;
    color: rgb(3, 178, 247);
    font-size: 14px;
  }
  .backBtn:hover {
    color: rgb(167, 219, 239);
  }
  .commentTitle {
    display: inline-block;
    margin-left: 2rem;
    font-size: 17px;
    font-weight: 600;
    color: rgb(130, 126, 126);
  }
}
</style>