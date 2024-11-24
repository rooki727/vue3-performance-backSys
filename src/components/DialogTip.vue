<script setup>
import { computed } from 'vue'

const props = defineProps(['TipMessage', 'centerDialogVisible'])
const centerDialogVisible = computed(() => props.centerDialogVisible)
const emit = defineEmits(['changeDialogVisible'])
const changeDialogVisible = () => {
  emit('changeDialogVisible', false)
}
</script>


<template>
  <el-dialog
    :model-value="centerDialogVisible"
    title="提醒"
    width="500"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <span>{{ props.TipMessage }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="changeDialogVisible">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
