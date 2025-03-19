<script  setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addTaskAPI } from '@/apis/teachingTask'
import { isTeacher } from '@/utils/checkRole'
import { useLoginerStore } from '@/stores/LoginerStore'
import axios from 'axios'
const loginerStore = useLoginerStore()
loginerStore.getUserInfo()
const user_id = computed(() => loginerStore.userInfo.user_id)
const role = computed(() => loginerStore.userInfo.role)
// 获取t方法才可以在js代码里使用
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const emit = defineEmits(['changeDialogVisible', 'updateList'])
const addForm = ref(null)
const addform = ref({
  user_id: null,
  semester: '',
  course_name: '',
  class_type: '',
  class_name: '',
  file_link: '',
  credit_hours: null
})

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
// 重置表单函数
const resetForm = () => {
  addForm.value.resetFields()
  addform.value = {
    user_id: null,
    semester: '',
    course_name: '',
    class_type: '',
    class_name: '',
    file_link: '',
    credit_hours: null
  }
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}

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
  addForm.validate((valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      addTaskAPI({
        user_id: addform.value.user_id ? addform.value.user_id : user_id.value,
        semester: addform.value.semester,
        course_name: addform.value.course_name,
        class_type: addform.value.class_type,
        class_name: addform.value.class_name,
        credit_hours: parseInt(addform.value.credit_hours),
        file_link: addform.value.file_link
      })
        .then((res) => {
          // 如果 addUser 没有报错，则执行成功提示
          if (res.data) {
            ElMessage({ type: 'success', message: '上传成功' })
            emit('changeDialogVisible', false)
            emit('updateList')
            resetForm()
          } else {
            ElMessage({ type: 'error', message: res.msg })
          }
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'error', message: '上传失败！请检查输入信息' })
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '添加失败！请检查输入信息' })
    }
  })
}
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    :title="title"
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
      <el-form-item v-if="!isTeacher(role)" label="user_id" label-width="8.75rem" prop="user_id">
        <el-input v-model="addform.user_id" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 上传 </el-button>
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
