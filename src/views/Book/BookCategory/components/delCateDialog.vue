<script  setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { delFirstCategoryAPI, delSecondCategoryAPI } from '@/apis/category'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title', 'dialogArray', 'childrenArray'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)

const childrenData = ref([])
const newArrayData = ref([])
const arrayData = computed(() => props.dialogArray)
const computedData = computed(() => props.childrenArray)
const secondArrayData = ref([])
watch(
  () => computedData.value,
  (newVal) => {
    // 将 children 数组加入 rootObject
    childrenData.value = newVal
  },
  {
    deep: true
  }
)

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
const selectCategory = ref(t('messages.del_FirstCate'))
const delForm = ref(null)
const firstForm = ref({
  chooseFirstCate: ''
})
const secondForm = ref({
  chooseFirstCate: '',
  chooseSecondCate: '',
  chooseSecondId: null
})
// 监听一级选择变化，同时给二级赋值
watch(
  () => secondForm.value.chooseFirstCate,
  (newVal) => {
    secondArrayData.value = []
    secondForm.value.chooseSecondCate = ''
    childrenData.value.forEach((item) => {
      if (newVal === item.name) {
        secondArrayData.value = item.children
      }
    })
  },
  {
    deep: true
  }
)

const rulesFirst = {
  chooseFirstCate: [
    {
      required: true,
      message: t('messages.choose_First')
    }
  ],
  chooseSecondCate: [
    {
      required: true,
      message: t('messages.choose_Second')
    }
  ]
}
// 重置表单函数
const resetForm = () => {
  firstForm.value.chooseFirstCate = ''
  secondForm.value.chooseFirstCate = ''
  secondForm.value.chooseSecondCate = ''
}
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
  resetForm()
}
const submitadd = async (delForm) => {
  delForm.validate(async (valid) => {
    if (valid) {
      // 区分哪个表单
      if (selectCategory.value === '删除一级分类') {
        const firstId = ref(null)
        // 由于使用json-server 接口比较粗糙，不能够使得新加的一级分类也能添加对应的二级分类
        newArrayData.value.forEach((item) => {
          if (firstForm.value.chooseFirstCate === item.name) {
            firstId.value = item.id
          }
        })
        await delFirstCategoryAPI(firstId.value)
      } else if (selectCategory.value === '删除二级分类') {
        const firstUrl = ref('')
        // 由于使用json-server 接口比较粗糙，不能够使得新加的一级分类也能添加对应的二级分类
        newArrayData.value.forEach((item) => {
          if (secondForm.value.chooseFirstCate === item.name) {
            firstUrl.value = item.url
          }
        })
        secondArrayData.value.forEach((item) => {
          if (secondForm.value.chooseSecondCate === item.name) {
            secondForm.value.chooseSecondId = item.id
          }
        })
        await delSecondCategoryAPI(firstUrl.value, secondForm.value.chooseSecondId)
      }
      // api数据请求，删除该用户的信息
      emit('changeDialogVisible', false)
      emit('getNewData')
      // 如果  没有报错，则执行成功提示
      ElMessage({ type: 'success', message: '删除成功' })
      resetForm()
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '删除失败！请检查输入信息' })
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
        <el-radio :value="$t('messages.del_FirstCate')">{{
          $t('messages.del_FirstCate')
        }}</el-radio>
        <el-radio :value="$t('messages.del_SecondCate')">{{
          $t('messages.del_SecondCate')
        }}</el-radio>
      </el-radio-group>
    </div>
    <!-- 删除一级分类 -->
    <el-form
      v-if="selectCategory === '删除一级分类'"
      style="margin-top: 2rem"
      :model="firstForm"
      :rules="rulesFirst"
      ref="delForm"
    >
      <el-form-item :label="$t('messages.verify')" prop="chooseFirstCate">
        <el-select v-model="firstForm.chooseFirstCate" placeholder="请选择一级分类">
          <el-option
            v-for="item in newArrayData"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 删除二级分类 -->
    <el-form v-else :model="secondForm" :rules="rulesFirst" ref="delForm" style="margin-top: 2rem">
      <el-form-item :label="$t('messages.verify')" prop="chooseFirstCate">
        <el-select v-model="secondForm.chooseFirstCate" placeholder="请选择一级分类">
          <el-option
            v-for="item in newArrayData"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('messages.verify')" prop="chooseSecondCate">
        <el-select v-model="secondForm.chooseSecondCate" placeholder="请选择二级分类">
          <el-option
            v-for="item in secondArrayData"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">{{ $t('messages.Cancel') }}</el-button>
        <el-button type="primary" @click="submitadd(delForm)">
          {{ $t('messages.delcategoryTitle') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


