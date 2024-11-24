<script setup >
import DialogTip from '@/components/DialogTip.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const LoginerStore = useLoginerStore()
const currentAwator = ref('')

// 捕获错误信息
const handleError = (error) => {
  let errorMessage = error.message || 'An unknown error occurred'
  // 记录错误信息到控制台
  console.error('An error occurred: ' + errorMessage)
  // 向用户提供友好的错误提示
  // alert('Oops! Something went wrong. Please try again later.')
}

// 上传区
const openFilePicker = () => {
  const fileInput = document.getElementById('fileInput')
  fileInput.click()
}

// 处理文件变化事件
const handleFileChange = (event) => {
  const file = event.target.files[0]
  // currentAwator.value = URL.createObjectURL(file)
  const formData = new FormData()
  formData.append('image', file)
  // 调用上传头像的方法 uploadAvatar
  axios
    .post(`http://119.29.168.176:8080/library_ssm/file/uploadPicture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      currentAwator.value = response.data.result
      ElMessage.success({
        message: '上传成功',
        type: 'success'
      })
    })
    .catch((error) => {
      console.error('Error uploading file: ', error)
    })
}

const centerDialogVisible = ref(false)
const uploadSave = async () => {
  if (currentAwator.value != '') {
    LoginerStore.userInfo.avatar = currentAwator.value
    // 调用修改头像的方法,保存链接
    // LoginerStore.uploadAvatar(LoginerId.value, currentAwator.value)
    currentAwator.value = ''
  } else {
    centerDialogVisible.value = true
  }
}
// 子组件回调函数
const changeDialogVisible = (value) => {
  centerDialogVisible.value = value
}
</script>

<template>
  <DialogTip
    :centerDialogVisible="centerDialogVisible"
    TipMessage="选择头像后才能保存哦~"
    @changeDialogVisible="changeDialogVisible"
  ></DialogTip>
  <div class="awtarDiv">
    <div class="demo-image">
      <div class="block">
        <span class="demonstration">头像预览</span>
        <!-- 浏览头像位置 -->
        <el-image
          :src="currentAwator ? currentAwator : LoginerStore.userInfo?.avatar"
          @error="handleError('填写后端传来的图片加载失败messages')"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <!-- 保存上传到服务器按钮 -->
        <el-button class="save-btn" @click="uploadSave">
          更新头像
          <el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </div>
    </div>
    <!-- 上传按钮 -->
    <div class="uploadDiv">
      <h4>上传一个您喜欢的头像</h4>
      <p class="tip">
        <el-icon style="font-size: 16px"><Warning /></el-icon>支持JPG、JPEG、PNG
      </p>
      <button class="upload-btn" id="upload-btn" @click="openFilePicker">
        <input
          type="file"
          id="fileInput"
          ref="fileInput"
          @change="handleFileChange"
          accept="image/*"
          style="display: none"
        />
      </button>
    </div>
  </div>
</template>


<style scoped lang="scss">
.awtarDiv {
  display: flex;
  .demo-image {
    width: 50%;
    height: 100%;
    border-right: 1px solid #ccc;
  }
  .uploadDiv {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    .tip {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #838080;
    }
  }
}

.save-btn {
  display: block;
  margin: 4rem auto;
  border-radius: 15px;
  background-color: rgba(21, 138, 233, 0.891);
  color: white;
  transition: 0.3s all;
}
.save-btn:hover {
  transform: scale(1.05);
  background-color: rgba(81, 163, 230, 0.948);
  color: white;
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
}
.demo-image .el-image {
  padding: 0 5px;
  width: 35%;
  height: 35%;
}

.demo-image .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 1.875rem;
}
.demo-image .image-slot .el-icon {
  font-size: 1.875rem;
}

/* 上传 */
.upload-btn {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  overflow: hidden;
}
.upload-btn input[type='file'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.upload-btn::before {
  content: '+';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  color: #fff;
}
</style>
