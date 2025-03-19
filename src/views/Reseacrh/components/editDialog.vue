<script  setup>
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateTaskAPI } from '@/apis/teachingTask'
import axios from 'axios'
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const clickRow = computed(() => props.clickRow)
const emit = defineEmits(['changeDialogVisible', 'updateClickRow', 'updateList'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}
const addForm = ref(null)
const addform = ref({
  task_id: null,
  semester: '',
  course_name: '',
  class_type: '',
  class_name: '',
  credit_hours: null,
  file_link: ''
})
// 上传区
const openFilePicker = () => {
  const fileInput = document.getElementById('fileInput')
  fileInput.click()
}
// 处理文件变化事件
const handleFileChange = (event) => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('file', file)
  // 调用上传文件
  axios
    .post(`http://119.29.168.176:8080/linyinlu/file/uploadZip`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response.data.data)
      addform.value.file_link = response.data.data
      ElMessage.success({
        message: '上传附件成功',
        type: 'success'
      })
    })
    .catch((error) => {
      console.error('Error uploading file: ', error)
    })
}
const submitadd = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      await updateTaskAPI({
        task_id: addform.value.task_id,
        semester: addform.value.semester,
        course_name: addform.value.course_name,
        class_type: addform.value.class_type,
        class_name: addform.value.class_name,
        credit_hours: addform.value.credit_hours,
        file_link: addform.value.file_link
      })
        .then(() => {
          // 如果 addUser 没有报错，则执行成功提示
          ElMessage({ type: 'success', message: '修改成功' })
          emit('changeDialogVisible', false)
          emit('updateList')
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
          // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '修改失败！请检查输入信息' })
    }
  })
}
const rules = {
  semester: [
    {
      required: true,
      message: '请输入姓学期',
      trigger: 'blur'
    }
  ],
  course_name: [
    {
      required: true,
      message: '请输入课程名',
      trigger: 'blur'
    }
  ],
  class_type: [
    {
      required: true,
      message: '请输入课程类型',
      trigger: 'blur'
    }
  ],
  class_name: [
    {
      required: true,
      message: '请输入班级名',
      trigger: 'blur'
    }
  ],
  credit_hours: [
    {
      required: true,
      message: '请输入学时',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]*$/, // 正则表达式，验证输入为数字
      message: '学时必须是数字',
      trigger: 'blur'
    }
  ],
  user_id: [
    {
      required: true,
      message: '请输入user_id',
      trigger: 'blur'
    }
  ]
}
watch(
  () => clickRow.value,
  (oldVal) => {
    Object.assign(addform.value, oldVal)
  }
)
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    title="修改任务信息"
    width="600"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="学期" label-width="8.75rem" prop="semester">
        <el-input v-model="addform.semester" autocomplete="off" />
      </el-form-item>
      <el-form-item label="课程名" label-width="8.75rem" prop="course_name">
        <el-input v-model="addform.course_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="课程类型" label-width="8.75rem" prop="class_type">
        <el-input v-model="addform.class_type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="班级名" label-width="8.75rem" prop="class_name">
        <el-input v-model="addform.class_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学时" label-width="8.75rem" prop="credit_hours">
        <el-input v-model="addform.credit_hours" autocomplete="off" />
      </el-form-item>
      <el-form-item label="附件" label-width="8.75rem">
        <button class="upload-btn" id="upload-btn" @click="openFilePicker">
          <input
            type="file"
            id="fileInput"
            ref="fileInput"
            @change="handleFileChange"
            accept=".zip,.rar"
            style="display: none"
          />
        </button>
        <el-alert
          title="请上传凭证附件，支持压缩包zip、rar格式，上传成功后返回链接赋值链接打开即可下载查看。若上传错误可重新点击上传。"
          type="warning"
          show-icon
          :closable="false"
        />
        <el-link
          v-if="addform.file_link"
          type="primary"
          :underline="false"
          :href="addform.file_link"
          download
          >{{ addform.file_link }}</el-link
        >
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



<style lang="scss" scoped>
/* 上传 */
.upload-btn {
  position: relative;
  width: 50px;
  height: 50px;
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
