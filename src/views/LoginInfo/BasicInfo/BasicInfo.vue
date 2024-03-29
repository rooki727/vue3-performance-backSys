<script  setup>
import { useLoginerStore } from '@/stores/LoginerStore'
import { ref } from 'vue'
import DialogTip from '@/components/DialogTip.vue'
const LoginerStore = useLoginerStore()
const userForm = ref({
  id: null,
  account: null,
  verify: '',
  name: '',
  gender: '',
  phone: null,
  email: ''
})

// 提醒框确认
const centerDialogVisible = ref(false)
userForm.value = LoginerStore.userInfo
const submitForm = () => {
  if (userForm.value.name === '' || userForm.value.phone === null || userForm.value.email === '') {
    centerDialogVisible.value = true
  }

  // 发送请求修改服务器对应loginer数据
}
// 子组件修改后发送给父组件修改centerDialogVisible
const changeDialogVisible = (value) => {
  centerDialogVisible.value = value
}

// 重置按钮
const resetForm = () => {
  userForm.value = {}
}
</script>

<template>
  <DialogTip
    :TipMessage="$t('messages.basicinfoTip')"
    :centerDialogVisible="centerDialogVisible"
    @changeDialogVisible="changeDialogVisible"
  ></DialogTip>
  <div class="basicInfo">
    <el-form style="max-width: 600px; font-size: 1rem" label-width="auto">
      <el-form-item label="id"
        ><el-text>{{ LoginerStore.userInfo?.id }}</el-text></el-form-item
      >
      <el-form-item :label="$t('messages.account')"
        ><el-text>{{ LoginerStore.userInfo?.account }}</el-text></el-form-item
      >
      <el-form-item :label="$t('messages.verify')"
        ><el-text>{{ LoginerStore.userInfo?.verify }}</el-text></el-form-item
      >
      <el-form-item :label="$t('messages.name')">
        <el-input v-model="userForm.name"
      /></el-form-item>
      <el-form-item :label="$t('messages.gender')" prop="gender">
        <el-radio-group v-model="userForm.gender">
          <el-radio :value="$t('messages.man')">{{ $t('messages.man') }}</el-radio>
          <el-radio :value="$t('messages.woman')">{{ $t('messages.woman') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('messages.phone')">
        <el-input v-model="userForm.phone"
      /></el-form-item>
      <el-form-item :label="$t('messages.email')">
        <el-input v-model="userForm.email"
      /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="margin-left: 0.5rem">
          {{ $t('messages.update') }}
        </el-button>
        <el-button @click="resetForm" style="margin-left: 28rem">
          {{ $t('messages.reset') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>



<style scoped lang="scss">
.basicInfo {
  margin-top: 2.6rem;
  margin-left: 3rem;
}
</style>