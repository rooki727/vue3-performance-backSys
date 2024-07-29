<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useBookStore } from '@/stores/BookStore'
import axios from 'axios'
const BookStore = useBookStore()
const categoryListComputed = computed(() => BookStore.categoryList)
const categoryList = ref([])
watch(
  () => categoryListComputed.value,
  (newVal) => {
    categoryList.value = newVal
  },
  {
    deep: true
  }
)
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const emit = defineEmits(['changeDialogVisible'])

const addForm = ref(null)
const addform = reactive({
  book_name: '',
  author: '',
  category: '',
  price: null,
  stock_quantity: null,
  picture: '',
  main_picture: '',
  introduce: '',
  press: ''
})
const rules = {
  book_name: [
    {
      required: true,
      message: t('messages.book_nameinput'),
      trigger: 'blur'
    }
  ],
  author: [
    {
      required: true,
      message: t('messages.book_authorinput'),
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: t('messages.book_categoryinput'), // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    }
  ],
  price: [{ required: true, message: t('messages.book_priceinput'), trigger: 'blur' }],
  stock_quantity: [
    {
      required: true,
      message: t('messages.book_stock_quantityinput'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: t('messages.base_numberdigitsonly'), // 自定义提示消息
      trigger: 'blur'
    }
  ],

  picture: [
    {
      required: true,
      message: t('messages.book_pictureinput'), // 如果未输入picture，则显示此消息
      trigger: 'blur'
    }
  ],

  main_picture: [
    {
      required: true,
      message: t('messages.book_main_pictureinput'), // 如果未输入main_picture，则显示此消息
      trigger: 'blur'
    }
  ],

  introduce: [
    {
      required: true,
      message: t('messages.book_introduceinput'), // 如果未输入introduce，则显示此消息
      trigger: 'blur'
    }
  ],

  press: [
    {
      required: true,
      message: t('messages.book_pressinput'), // 如果未输入press，则显示此消息
      trigger: 'blur'
    }
  ]
}
// 上传区

// 处理文件变化事件
const handleFileChange = (event) => {
  const file = event.target.files[0]
  console.log(file)
  const formData = new FormData()
  formData.append('image', file)
  // 调用上传头像的方法 uploadAvatar
  axios
    .post(`http://localhost:8080/library_ssm/file/uploadBookMainPicture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      // 使用后端返回的路径
      addform.main_picture = response.data.result
      console.log(addform.main_picture)
    })
    .catch((error) => {
      console.error('Error uploading file: ', error)
    })
  ElMessage({
    message: '修改成功',
    type: 'success',
    plain: true
  })
}
// 重置表单函数
const resetForm = () => {
  addform.book_name = ''
  addform.author = ''
  addform.category = ''
  addform.price = null
  addform.stock_quantity = null
  addform.picture = ''
  addform.main_picture = ''
  addform.introduce = ''
  addform.press = ''
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      const date = new Date()
      // api数据请求，添加该book
      emit('changeDialogVisible', false)
      console.log(addform)
      BookStore.addBookList(
        addform.book_name,
        addform.author,
        addform.category,
        parseInt(addform.price),
        date,
        addform.picture,
        addform.main_picture,
        addform.introduce,
        parseInt(addform.stock_quantity),
        addform.press
      )
        .then(() => {
          // 如果 addBookList 没有报错，则执行成功提示
          ElMessage({ type: 'success', message: '添加成功' })
          resetForm()
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'erro', message: '添加失败！请检查输入信息' })
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
    width="500"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item :label="$t('messages.book_name')" label-width="8.75rem" prop="book_name">
        <el-input v-model="addform.book_name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('messages.author')" label-width="8.75rem" prop="author">
        <el-input v-model="addform.author" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('messages.press')" label-width="8.75rem" prop="press">
        <el-input
          v-model="addform.press"
          :placeholder="$t('messages.book_pressinput')"
          autocomplete="off"
        />
      </el-form-item>
      <!-- 使用下拉框选择分类 -->
      <el-form-item :label="$t('messages.category')" label-width="8.75rem" prop="category">
        <el-select v-model="addform.category" :placeholder="$t('messages.please_Choose')">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.category"
            :value="item.category"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('messages.price')" label-width="8.75rem" prop="price">
        <el-input v-model="addform.price" autocomplete="off" />
      </el-form-item>

      <el-form-item :label="$t('messages.picture')" label-width="8.75rem" prop="picture">
        <el-input
          v-model="addform.picture"
          :placeholder="$t('messages.book_pictureinput')"
          autocomplete="off"
        />
      </el-form-item>
      <!-- 图片上传区 -->
      <el-form-item :label="$t('messages.main_picture')" label-width="8.75rem" prop="main_picture">
        <div class="uploadDiv" v-if="!addform.main_picture">
          <button id="upload-btn">
            <input type="file" @change="handleFileChange" accept="image/*" />
          </button>
        </div>
        <div v-else class="mainPictureDiv">
          <el-image
            class="mainPicture"
            :src="addform.main_picture"
            @error="handleError('填写后端传来的图片加载失败messages')"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </el-form-item>
      <el-form-item :label="$t('messages.introduce')" label-width="8.75rem" prop="introduce">
        <el-input
          v-model="addform.introduce"
          :placeholder="$t('messages.book_introduceinput')"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        :label="$t('messages.stock_quantity')"
        label-width="8.75rem"
        prop="stock_quantity"
      >
        <el-input
          v-model="addform.stock_quantity"
          :placeholder="$t('messages.stock_quantity')"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">{{ $t('messages.Cancel') }}</el-button>
        <el-button type="primary" @click="submitadd(addForm)">
          {{ $t('messages.addBook') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style lang="scss" scoped>
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
.mainPictureDiv {
  width: 100px;
  height: 100px;
  .mainPicture {
    display: block;
    width: 100px;
    height: 100px;
  }
}
</style>


