<script  setup>
import { reactive, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useBookStore } from '@/stores/BookStore'
const BookStore = useBookStore()
const categoryList = computed(() => BookStore.categoryList)
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
  stock_quantity: null
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
      message: t('messages.base_digitsonly'), // 自定义提示消息
      trigger: 'blur'
    }
  ]
}

// 重置表单函数
const resetForm = () => {
  addform.book_name = ''
  addform.author = ''
  addform.category = ''
  addform.price = null
  addform.stock_quantity = null
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      // api数据请求，添加该book
      emit('changeDialogVisible', false)
      BookStore.addBookList(
        addform.book_name,
        addform.author,
        addform.category,
        parseInt(addform.price),
        parseInt(addform.stock_quantity)
      )
      // 如果 addBookList 没有报错，则执行成功提示
      ElMessage({ type: 'success', message: '添加成功' })
      resetForm()
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

      <!-- 使用下拉框选择分类 -->
      <el-form-item :label="$t('messages.category')" label-width="8.75rem" prop="category">
        <el-select v-model="addform.category" placeholder="请选择类型">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.catetory"
            :value="item.catetory"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('messages.price')" label-width="8.75rem" prop="price">
        <el-input v-model="addform.price" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('messages.count')" label-width="8.75rem" prop="stock_quantity">
        <el-input v-model="addform.stock_quantity" autocomplete="off" />
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


