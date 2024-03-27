<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link" style="font-size: 16px">
        {{ currenLanguage === 'zhCn' ? '中文' : 'English' }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zhCn" :disabled="currenLanguage == 'zhCn'"
            >中文</el-dropdown-item
          >
          <el-dropdown-item command="en" :disabled="currenLanguage == 'en'"
            >English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const currenLanguage = computed(() => i18n.locale.value)
const i18n = useI18n()
const handleCommand = (command) => {
  i18n.locale.value = command
  localStorage.setItem('lang', command)
}
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
