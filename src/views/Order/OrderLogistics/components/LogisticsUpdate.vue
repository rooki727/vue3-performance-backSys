<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { findLogisticsByIdAPI, addLogisticsAPI } from '@/apis/logistics'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
// 获取t方法才可以在js代码里使用
const { t } = useI18n()
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const clickRow = computed(() => props.clickRow)
const defaultTime = new Date()
const addForm = ref(null)
const addform = reactive({
  order_id: null,
  logistics_number: '',
  newText: '',
  newTime: ''
})
const rules = {
  newText: [
    {
      required: true,
      message: t('messages.inputNewLogistics'),
      trigger: 'blur'
    }
  ],
  newTime: [
    {
      required: true,
      message: t('messages.chooseTimeForNewLogistics'),
      trigger: 'blur'
    }
  ]
}
const arrTextList = ref([])
const findLogisticsById = async () => {
  const res = await findLogisticsByIdAPI(addform.order_id)
  arrTextList.value = res.result
}
const emit = defineEmits(['changeDialogVisible', 'updateClickRow', 'successAdd'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}
// 重置表单
const resetForm = () => {
  addform.newText = ''
  addform.newTime = ''
}
// 提交
const submitadd = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      console.log(addform)
      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)
      const formattedDateTime = dayjs(addform.newTime).format('YYYY-MM-DD HH:mm:ss')
      await addLogisticsAPI(
        parseInt(addform.order_id),
        addform.company_name,
        addform.company_tel,
        addform.logistics_number,
        addform.newText,
        formattedDateTime
      ).then(() => {
        // 如果 addLogistics 没有报错，则执行成功提示
        ElMessage({ type: 'success', message: '更新成功！' })
        resetForm()
        emit('successAdd', true)
      })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '修改失败！请检查输入信息' })
    }
  })
}

watch(
  () => clickRow.value,
  async (newVal) => {
    await Object.assign(addform, newVal)
    findLogisticsById()
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
    <el-form :model="addform" ref="addForm" :rules="rules">
      <el-form-item label="order_id" label-width="8.75rem" prop="order_id">
        <el-input v-model="addform.order_id" autocomplete="off" :disabled="true" />
      </el-form-item>
      <el-form-item
        :label="$t('messages.logistics_number')"
        label-width="8.75rem"
        prop="logistics_number"
      >
        <el-input :disabled="true" v-model="addform.logistics_number" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('messages.text')" label-width="8.75rem">
        <div v-for="item in arrTextList" :key="item.logistics_id">
          <span>{{ item.time }} </span> <span>{{ item.text }}</span>
        </div>
      </el-form-item>
      <el-form-item :label="$t('messages.newLogisticsDetail')" label-width="8.75rem" prop="newText">
        <el-input
          v-model="addform.newText"
          autocomplete="off"
          :placeholder="$t('messages.inputNewLogistics')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('messages.TimeForNewLogistics')"
        label-width="8.75rem"
        prop="newTime"
      >
        <el-date-picker
          v-model="addform.newTime"
          type="datetime"
          :placeholder="$t('messages.chooseTimeForNewLogistics')"
          :default-time="defaultTime"
        />
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


<style lang="scss" scoped>
/* 上传 */
#upload-btn {
  margin-left: 10px;
  margin-top: 8px;
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
  cursor: pointer;
  .mainPicture {
    display: block;
    width: 100px;
    height: 100px;
  }
}
.mainPicturePart {
  display: flex;
}
</style>