<script setup >
import DialogTip from '@/components/DialogTip.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref } from 'vue'

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
  currentAwator.value = URL.createObjectURL(file)
  // 调用上传头像的方法 uploadAvatar
}
// 上传成功后更新用户头像路径
// 错误则出现dialog提醒
const centerDialogVisible = ref(false)
const uploadSave = () => {
  if (currentAwator.value != '') {
    LoginerStore.userInfo.awatar = currentAwator.value
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
    :TipMessage="$t('messages.choose_awator')"
    @changeDialogVisible="changeDialogVisible"
  ></DialogTip>
  <div class="awtarDiv">
    <div class="demo-image__error">
      <div class="block">
        <span class="demonstration">{{ $t('messages.Avatar_preview') }}</span>
        <!-- 浏览头像位置 -->
        <el-image
          :src="currentAwator ? currentAwator : LoginerStore.userInfo.awatar"
          @error="handleError('填写后端传来的图片加载失败messages')"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <!-- 保存上传到服务器按钮 -->
        <el-button type="primary" style="display: block; margin: 4rem auto" @click="uploadSave">
          {{ $t('messages.upload') }}
          <el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </div>
    </div>
    <!-- 上传按钮 -->
    <div class="uploadDiv">
      <h3>{{ $t('messages.click_toSaveAwtar') }}</h3>
      <button id="upload-btn" @click="openFilePicker">
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
  position: relative;
  .uploadDiv {
    text-align: center;
    position: absolute;
    top: 5rem;
    right: 16rem;
  }
}
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
}
.demo-image__error .el-image {
  padding: 0 5px;
  max-width: 18.75rem;
  max-height: 18.75rem;
  width: 100%;
  height: 100%;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 1.875rem;
}
.demo-image__error .image-slot .el-icon {
  font-size: 1.875rem;
}

/* 上传 */
#upload-btn {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  overflow: hidden;
}
#upload-btn input[type='file'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
#upload-btn::before {
  content: '+';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  color: #fff;
}
</style>
