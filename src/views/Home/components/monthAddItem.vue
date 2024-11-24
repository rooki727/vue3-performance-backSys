<template>
  <div class="monthAddItem">
    <span class="monthAddItemTitle">{{ title }}</span>
    <span class="monthAddItemCount">{{ count }}</span>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  count: Number
})
</script>

<style lang="scss" scoped>
.monthAddItem {
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  color: #928e8e;
  font-size: 1.5rem;
  font-weight: 600;

  .monthAddItemCount {
    padding-top: 5px;
    color: #5a5555;
  }
}
</style>