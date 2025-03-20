<script  setup>
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateResearchAPI } from '@/apis/research'
import axios from 'axios'
import dayjs from 'dayjs'
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const clickRow = computed(() => props.clickRow)
const emit = defineEmits(['changeDialogVisible', 'updateClickRow', 'updateList'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}
const categoryList = ref([
  { category_id: 1, category_name: '项目' },
  { category_id: 2, category_name: '成果' },
  { category_id: 3, category_name: '著作' },
  { category_id: 4, category_name: '论文' },
  { category_id: 4, category_name: '专利' },
  { category_id: 5, category_name: '其他' }
])
const addForm = ref(null)
const addform = ref({
  research_id: null,
  title: '',
  category: '',
  sub_type: '',
  level: '',
  start_date: '',
  end_date: '',
  funding: null,
  publisher: '',
  ranking: '',
  is_authorized: '',
  description: '',
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
      const formattedStart = addform.value.start_date
        ? dayjs(addform.value.start_date).format('YYYY-MM-DD HH:mm:ss')
        : null
      const formattedEnd = addform.value.end_date
        ? dayjs(addform.value.end_date).format('YYYY-MM-DD HH:mm:ss')
        : null
      // api数据请求，添加该用户的信息
      await updateResearchAPI({
        research_id: addform.value.research_id,
        title: addform.value.title,
        category: addform.value.category,
        sub_type: addform.value.sub_type,
        level: addform.value.level,
        start_date: formattedStart,
        end_date: formattedEnd,
        funding: addform.value.funding,
        publisher: addform.value.publisher,
        ranking: addform.value.ranking,
        is_authorized: addform.value.is_authorized,
        description: addform.value.description,
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
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: '请选择科研类型',
      trigger: 'blur'
    }
  ],
  user_id: [
    {
      required: true,
      message: '请输入user_id',
      trigger: 'blur'
    }
  ],
  funding: [
    {
      pattern: /^\d+(\.\d+)?$/, // 正则表达式，验证输入为整数或者小数
      message: '经费必须是有效的数字（整数或浮动小数）',
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
    title="修改科研信息"
    width="1000"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="标题" label-width="8.75rem" prop="title">
        <el-input v-model="addform.title" autocomplete="off" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="科研类别" label-width="8.75rem" prop="category">
        <el-select v-model="addform.category" placeholder="请选择科研类别">
          <el-option
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
            :value="item.category_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专利类别/成果类别" label-width="8.75rem" prop="sub_type">
        <el-input
          v-model="addform.sub_type"
          autocomplete="off"
          placeholder="若为专利类别/成果类别，请注明专利类别/成果类别"
        />
      </el-form-item>
      <el-form-item label="级别" label-width="8.75rem" prop="level">
        <el-input v-model="addform.level" autocomplete="off" placeholder="若有级别，请输入级别" />
      </el-form-item>
      <el-form-item label="开始时间" label-width="8.75rem">
        <el-date-picker
          v-model="addform.start_date"
          type="datetime"
          placeholder="若有协议，请输入开始时间"
          size="default"
        />
      </el-form-item>
      <el-form-item label="结束时间" label-width="8.75rem">
        <el-date-picker
          v-model="addform.end_date"
          type="datetime"
          placeholder="若为报告类别请输入结束时间"
          size="default"
        />
      </el-form-item>
      <el-form-item label="经费" label-width="8.75rem" prop="funding">
        <el-input
          v-model="addform.funding"
          autocomplete="off"
          placeholder="若为有经费，请输入经费"
        />
      </el-form-item>
      <el-form-item label="出版社" label-width="8.75rem" prop="publisher">
        <el-input
          v-model="addform.publisher"
          autocomplete="off"
          placeholder="若为有出版社，请输入出版社"
        />
      </el-form-item>
      <el-form-item label="排名" label-width="8.75rem" prop="ranking">
        <el-input
          v-model="addform.ranking"
          autocomplete="off"
          placeholder="若为有排名，请输入排名"
        />
      </el-form-item>
      <el-form-item label="是否授权" label-width="8.75rem" prop="is_authorized">
        <el-input
          v-model="addform.is_authorized"
          autocomplete="off"
          placeholder="若为专利，请注明是否授权"
        />
      </el-form-item>
      <el-form-item label="描述" label-width="8.75rem" prop="description">
        <el-input v-model="addform.description" autocomplete="off" placeholder="描述" />
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
