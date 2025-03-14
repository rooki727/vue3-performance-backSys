<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayContent from './components/LayoutConten.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="layoutNav">
    <LayoutNav :isCollapse="isCollapse" ref="childComponent"></LayoutNav>
  </div>
  <div class="content" :class="{ isClose: isCollapse }">
    <LayContent :isCollapse="isCollapse" @changeCollapse="changeCollapse"></LayContent>
  </div>
</template>


<style lang="scss" scoped>
.layoutNav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgb(73, 104, 243),
    rgb(71, 103, 247),
    rgb(40, 58, 141),
    rgb(20, 33, 88)
  ) !important;
}
.content {
  padding-left: 12.5rem;
}
.isClose {
  padding-left: 4rem;
}
</style>