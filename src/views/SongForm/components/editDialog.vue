<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const clickRow = computed(() => props.clickRow)
const emit = defineEmits(['changeDialogVisible', 'updateClickRow'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}

const addForm = ref(null)
const addform = reactive({
  song_id: null,
  song_img: '',
  song_file: '',
  song_name: '',
  album: ''
})
const rules = {
  song_name: [
    {
      required: true,
      message: '请输入歌曲名字',
      trigger: 'blur'
    }
  ],
  album: [
    {
      required: true,
      message: '请输入专辑名字',
      trigger: 'blur'
    }
  ]
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      console.log(addform)

      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)
      //  updateSinger(
      //     )
      //     .then(() => {
      //       // 如果 addUser 没有报错，则执行成功提示
      //       ElMessage({ type: 'success', message: '修改成功' })
      //     })
      //     .catch(() => {
      //       // 处理请求失败的情况
      //       ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
      //       // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
      //     })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '修改失败！请检查输入信息' })
    }
  })
}
// 上传图片
const handleAvatarSuccess = (response) => {
  addform.song_img = response.result
}
// 上传图片前的校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    this.$message.error('只能上传图片')
  }
  return isImage // 确保文件是图片
}

// 上传mp4
const uploadPercentage = ref(0) // 用于存储上传进度
const progressStatus = ref('') // 进度条状态，'active', 'success', 'exception'

// 上传进度事件
const handleProgress = (event) => {
  console.log('上传进度', event)

  uploadPercentage.value = event.percent // 获取上传进度
  progressStatus.value = 'warning' // 设置进度条状态为正在上传
}

// 文件上传前的钩子
const beforeUploadAudio = (file) => {
  console.log(file)

  const isAudio = file.type.startsWith('audio/')
  if (!isAudio) {
    ElMessage({
      message: '只能上传audio文件',
      type: 'error'
    })
  }
  return isAudio
}

// 上传成功
const handleSuccess = (response, file, fileList) => {
  console.log('上传成功', response, file, fileList)
  progressStatus.value = 'success' // 上传成功，设置进度条状态为成功
  addform.value.song_file = response.result
}

// 上传失败
const handleError = (err, file, fileList) => {
  console.log('上传失败', err, file, fileList)
  progressStatus.value = 'exception' // 上传失败，设置进度条状态为异常
  ElMessage({
    message: '上传失败',
    type: 'error'
  })
}

// watch
watch(
  () => clickRow.value,
  (oldVal) => {
    Object.assign(addform, oldVal)
  }
)
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    :title="title"
    width="500"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="song_id" label-width="8.75rem" prop="song_id">
        <el-input v-model="addform.song_id" autocomplete="off" :disabled="cannotInpId" />
      </el-form-item>
      <el-form-item label="歌手图片" label-width="8.75rem" prop="song_img">
        <!-- 增加修改图标 -->
        <div style="display: flex">
          <img
            style="width: 80px; height: 80px"
            v-if="addform.song_img"
            :src="addform.song_img"
            alt=""
          />
          <el-upload
            class="avatar-uploader"
            action="http://119.29.168.176:8080/library_ssm/file/uploadPicture"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            name="image"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="歌曲文件" label-width="8.75rem" prop="song_file">
        <div>
          <!-- 上传组件 -->
          <el-upload
            class="upload-demo"
            action="http://119.29.168.176:8080/library_ssm/file/uploadPicture"
            :on-progress="handleProgress"
            :before-upload="beforeUploadAudio"
            :on-success="handleSuccess"
            :on-error="handleError"
            :show-file-list="false"
            name="song"
          >
            <span class="el-upload__text" v-if="addform.song_file">{{ addform.song_file }}</span>
            <el-button>点击上传歌曲文件</el-button>
          </el-upload>

          <!-- 进度条 -->
          <el-progress
            :percentage="uploadPercentage"
            :stroke-width="16"
            :status="progressStatus"
            style="margin-top: 20px; width: 18rem"
            striped
            striped-flow
          ></el-progress>
        </div>
      </el-form-item>
      <el-form-item label="歌名" label-width="8.75rem" prop="song_name">
        <el-input v-model="addform.song_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="专辑" label-width="8.75rem" prop="album">
        <el-input v-model="addform.album" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped>
.avatar-uploader {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  border: 1px solid gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}

.avatar-uploader .el-icon {
  font-size: 50px;
  color: #8c939d;
}

.avatar-uploader .el-icon:hover {
  color: #409eff;
}
.el-upload__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80px;
  height: 16px;
  line-height: 16px;
  margin-right: 1rem;
}
</style>