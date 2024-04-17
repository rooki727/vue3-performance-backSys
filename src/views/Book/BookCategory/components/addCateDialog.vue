<script  setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addFirstCategoryAPI, addSecondCategoryAPI } from '@/apis/category'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title', 'dialogArray', 'orginData'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const arrayData = computed(() => props.dialogArray)
const newArrayData = ref([])
watch(
  () => arrayData.value,

  (newVal) => {
    newArrayData.value = newVal
  },
  {
    deep: true
  }
)

const emit = defineEmits(['changeDialogVisible', 'getNewData'])
const selectCategory = ref('添加一级分类')
const addForm = ref(null)
const firstForm = ref({
  firstCategoryName: '',
  firstCategoryValue: null,
  firstCategoryUrl: ''
})
const secondForm = ref({
  chooseFirstCate: '',
  secondName: '',
  secondValue: null
})

const rulesFirst = {
  firstCategoryName: [
    {
      required: true,
      message: t('messages.add_firstInputName'),
      trigger: 'blur'
    }
  ],
  firstCategoryValue: [
    {
      required: true,
      message: t('messages.add_firstInputValue'),
      trigger: 'blur'
    }
  ],
  firstCategoryUrl: [
    {
      required: true,
      message: t('messages.add_firstInputValue'),
      trigger: 'blur'
    }
  ],
  chooseFirstCate: [
    {
      required: true,
      message: t('messages.choose_First')
    }
  ],
  secondName: [
    {
      required: true,
      message: t('messages.add_firstInputName'),
      trigger: 'blur'
    }
  ],
  secondValue: [
    {
      required: true,
      message: t('messages.add_firstInputValue'),
      trigger: 'blur'
    }
  ]
}
// 重置表单函数
const resetForm = () => {
  ;(firstForm.value.firstCategoryName = ''),
    (firstForm.value.firstCategoryValue = null),
    (secondForm.value.chooseFirstCate = ''),
    (secondForm.value.secondName = ''),
    (secondForm.value.secondValue = null)
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = async (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      // 区分哪个表单
      if (selectCategory.value === '添加一级分类') {
        await addFirstCategoryAPI(
          firstForm.value.firstCategoryName,
          firstForm.value.firstCategoryValue,
          firstForm.value.firstCategoryUrl
        )
      } else if (selectCategory.value === '添加二级分类') {
        const firstUrl = ref('')
        // 由于使用json-server 接口比较粗糙，不能够使得新加的一级分类也能添加对应的二级分类
        newArrayData.value.forEach((item) => {
          if (secondForm.value.chooseFirstCate === item.name) {
            firstUrl.value = item.url
          }
        })

        await addSecondCategoryAPI(
          firstUrl.value,
          secondForm.value.secondName,
          secondForm.value.secondValue
        )
      }
      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)
      emit('getNewData')
      // 如果 addUser 没有报错，则执行成功提示
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
    <div style="margin-left: 4rem">
      <el-radio-group v-model="selectCategory">
        <el-radio value="添加一级分类">{{ $t('messages.add_FirstCate') }}</el-radio>
        <el-radio value="添加二级分类">{{ $t('messages.add_SecondCate') }}</el-radio>
      </el-radio-group>
    </div>
    <!-- 添加一级分类 -->
    <el-form
      v-if="selectCategory === '添加一级分类'"
      style="margin-top: 2rem"
      :model="firstForm"
      :rules="rulesFirst"
      ref="addForm"
    >
      <el-form-item label="一级分类" label-width="8.75rem" prop="firstCategoryName">
        <el-input
          v-model="firstForm.firstCategoryName"
          placeholder="请输入想要添加的一级分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="8.75rem" label="数量" prop="firstCategoryValue">
        <el-input
          v-model="firstForm.firstCategoryValue"
          placeholder="请输入一级分类的书本数量"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="8.75rem" label="路由" prop="firstCategoryUrl">
        <el-input
          v-model="firstForm.firstCategoryUrl"
          placeholder="请输入一级分类的路由"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 添加二级分类 -->
    <el-form v-else :model="secondForm" :rules="rulesFirst" ref="addForm">
      <el-form-item :label="$t('messages.verify')" prop="chooseFirstCate">
        <el-select v-model="secondForm.chooseFirstCate" placeholder="请选择类型">
          <el-option
            v-for="item in newArrayData"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" label-width="8.75rem" prop="secondName">
        <el-input
          v-model="secondForm.secondName"
          placeholder="请输入想要添加的二级分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="8.75rem" label="数量" prop="secondValue">
        <el-input
          v-model="secondForm.secondValue"
          placeholder="请输入二级分类的书本数量"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">{{ $t('messages.Cancel') }}</el-button>
        <el-button type="primary" @click="submitadd(addForm)">
          {{ $t('messages.addUser') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


