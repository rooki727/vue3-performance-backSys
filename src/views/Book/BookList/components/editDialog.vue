<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useBookStore } from '@/stores/BookStore'
const BookStore = useBookStore()
const categoryListComputed = computed(() => BookStore.categoryList)
const categoryList = ref([])
const statusList = [
  { id: 1, status: '未出库' },
  { id: 2, status: '已出库' },
  { id: 3, status: '待出库' }
]
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
const props = defineProps(['dialogFormVisible', 'title', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const clickRow = computed(() => props.clickRow)

const addForm = ref(null)
const addform = reactive({
  book_id: null,
  book_name: '',
  author: '',
  category: '',
  price: null,
  status: ''
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
      message: t('messages.book_categoryinput'),
      trigger: 'blur'
    }
  ],
  price: [{ required: true, message: t('messages.book_priceinput'), trigger: 'blur' }],
  status: [
    {
      required: true,
      message: t('messages.book_categoryinput'), // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    }
  ]
}

const emit = defineEmits(['changeDialogVisible', 'updateClickRow'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}

const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)
      BookStore.updateBookList(
        addform.book_id,
        addform.book_name,
        addform.author,
        addform.category,
        parseInt(addform.price),
        addform.status
      )
        .then(() => {
          // 如果 addUser 没有报错，则执行成功提示
          ElMessage({ type: 'success', message: '修改成功' })
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '修改失败！请检查输入信息' })
    }
  })
}

watch(
  () => clickRow.value,
  (newVal) => {
    Object.assign(addform, newVal)
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
      <el-form-item label="id" label-width="8.75rem" prop="id">
        <el-input v-model="addform.book_id" autocomplete="off" :disabled="props.cannotInpId" />
      </el-form-item>
      <el-form-item :label="$t('messages.book_name')" label-width="8.75rem" prop="book_name">
        <el-input v-model="addform.book_name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('messages.author')" label-width="8.75rem" prop="author">
        <el-input v-model="addform.author" autocomplete="off" />
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
      <el-form-item :label="$t('messages.book_status')" label-width="8.75rem" prop="status">
        <el-select v-model="addform.status" :placeholder="$t('messages.please_Choose')">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.status"
            :value="item.status"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">{{ $t('messages.Cancel') }}</el-button>
        <el-button type="primary" @click="submitadd(addForm)">
          {{ $t('messages.update') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


