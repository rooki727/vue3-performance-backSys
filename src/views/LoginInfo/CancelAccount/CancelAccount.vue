<template>
  <el-form style="max-width: 60rem" label-width="auto" class="demo-ruleForm">
    <el-form-item>
      <el-input
        class="reason"
        v-model="textarea"
        :rows="8"
        type="textarea"
        placeholder="请输入注销理由"
      />
    </el-form-item>

    <el-form-item class="buttonDiv"
      ><el-button @click="resetForm">重置</el-button>
      <el-button
        style="background-color: rgba(200, 83, 83, 0.504); color: white"
        @click="submitForm"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
const textarea = ref('')
const resetForm = () => {
  textarea.value = ''
}
const submitForm = () => {
  console.log(textarea.value)
  // 提交api操作后跳转到登陆页面
}
</script>

<style scoped lang="scss">
.reason {
  width: 39rem;
  margin: 4rem;
}
.buttonDiv {
  margin-left: 28rem;
}
</style>