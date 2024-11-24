<template>
  <div class="baseCount">
    <span class="baseCountCount">{{ count }}</span>
    <span class="baseCountName">{{ name }}</span>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String
  },
  count: {
    type: Number
  }
})
</script>

<style lang="scss" scoped>
.baseCount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 22%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  color: #878686;
  .baseCountCount {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .baseCountName {
    font-size: 1rem;
    font-weight: 400;
  }
}
</style>