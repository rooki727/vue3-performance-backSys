<script setup>
const props = defineProps(['title', 'message', 'data', 'message2', 'data2'])
</script>

<template>
  <div class="box">
    <table style="width: 100%; height: 100%">
      <tr>
        <th colspan="2">{{ props.title }}</th>
      </tr>
      <tr>
        <td>{{ props.message }}{{ props.data }}</td>
        <td>{{ props.message2 }}{{ props.data2 }}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped lang="scss">
.box {
  text-align: center;
  width: 28%;
  height: 80px;
  margin-bottom: 10px;
  background-color: rgb(248, 245, 245);
  color: rgb(101, 100, 100);
  th {
    border-bottom: 1px solid white;
  }
  td {
    text-align: center;
    align-self: center;
    &:first-child {
      border-right: 1px solid gray;
    }
  }
}
</style>