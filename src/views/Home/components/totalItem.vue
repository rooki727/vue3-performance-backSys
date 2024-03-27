<script setup>
const props = defineProps(['title', 'count', 'todayCount', 'message'])
</script>


<template>
  <div class="totalItem">
    <h3>{{ props.title }}</h3>
    <!-- $t(`messages.${v.title}`)这个为数据遍历时国际化处理使用 -->
    <span class="count">{{ $t('messages.totalHome') }}：{{ props.count }}</span>
    <hr />
    <span class="todayCount">{{ props.message }}{{ props.todayCount }}</span>
  </div>
</template>

<style scoped lang="scss">
.totalItem {
  width: 20%;
  height: 120px;
  text-align: center;
  border-radius: 10px;
  color: white;
}
</style>