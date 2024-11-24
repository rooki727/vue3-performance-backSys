<script setup>
import SongTable from './components/SongTable.vue'
import { ref, onMounted } from 'vue'
import addDialog from './components/addDialog.vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
// 取消按钮时重置点击行
const singer_id = route.query.singer_id
const playList_id = route.query.playList_id

// 获取t方法才可以在js代码里使用

// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const songList = ref([
  {
    song_id: 1,
    song_img:
      'http://119.29.168.176:8080/library_ssm/static/5dbdd384-b94e-4727-80ac-632a931b0eea_th.jpg',
    song_name: '歌曲1',
    song_file: '1.mp3',
    album: '专辑1'
  },
  {
    song_id: 2,
    song_img: '',
    song_name: '歌曲2',
    song_file: '2222222222222222222222222.mp3',
    album: '专辑2'
  }
])

// 获取table数据
const getTableForm = async () => {
  // 请求接口
}

// 添加对话框
const dialogFormVisible = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}

// 点击打开添加表单
const openAddDialog = () => {
  dialogTitle.value = '添加歌曲'
  changeDialogVisible(true)
}

// 搜索功能
// 备份原始数据
const originalData = [...songList.value]
const resetSearch = () => {
  searchInput.value = ''
  songList.value = [...originalData]
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
      songList.value = [...originalData]
    } else {
      // 根据输入值过滤数据
      const filteredData = originalData.filter((item) => item?.song_name?.includes(inputvalue))
      // 更新表格数据
      songList.value = filteredData
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
  <addDialog
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @changeDialogVisible="changeDialogVisible"
  ></addDialog>
  <div class="songHeader">
    <button @click="goBack" class="backBtn">
      <el-icon><DArrowLeft /></el-icon>返回
    </button>
    <span class="songTitle" v-if="singer_id">歌手song_id为：{{ singer_id }}的歌曲信息表</span>
    <span class="songTitle" v-else-if="playList_id"
      >歌单playList_id为：{{ playList_id }}的歌曲信息表</span
    >
  </div>
  <div class="search">
    <el-input
      label="search"
      v-model="searchInput"
      style="width: 33rem; margin-left: 1rem"
      placeholder="根据歌名搜索"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">重置</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem"
      ><el-icon><Plus /></el-icon>添加歌曲</el-button
    >
    <el-button type="danger" @click="blukDel"
      ><el-icon><DeleteFilled /></el-icon>批量删除</el-button
    >
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <SongTable :songList="songList" @getDelTable="getDelTable"></SongTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
.songHeader {
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
  .songTitle {
    display: inline-block;
    margin-left: 2rem;
    font-size: 17px;
    font-weight: 600;
    color: rgb(130, 126, 126);
  }
}
</style>