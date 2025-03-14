<template>
  <div class="homeIndex">
    <div class="homeLeft">
      <div class="leftTop">
        <baseCount
          v-for="item in totalCountList"
          :key="item.home_name"
          :name="item.home_name"
          :count="item.home_count"
        ></baseCount>
      </div>
      <perTopTen></perTopTen>
      <classifyCountAcademy></classifyCountAcademy>
    </div>
    <div class="homeRight">
      <div class="userSysInfo">
        <img :src="loginerStore.userInfo.avatar || '/avatar.jpg'" alt="无法加载" class="avatar" />
        <span class="name">{{ loginerStore.userInfo.real_name || '未登录' || 'admin' }}</span>
        <div class="sysItem">
          <span>身份：{{ loginerStore.userInfo.role === 'teacher' ? '教师' : '管理员' }}</span>
        </div>
        <div class="sysItem">
          <span>系统：{{ name }}</span>
        </div>
        <div class="sysItem">
          <span>系统版本：{{ version }}</span>
        </div>
      </div>
      <!-- <div class="monthItem">
        <monthAddItem title="本月新增+" :count="12"></monthAddItem>
        <monthAddItem title="本月新增+" :count="23"></monthAddItem>
      </div> -->
      <lineIndicators></lineIndicators>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import packageJson from '../../../package.json'
import baseCount from './components/baseCount.vue'
import perTopTen from './components/perTopTen.vue'
import classifyCountAcademy from './components/classifyCountAcademy.vue'
import lineIndicators from './components/lineIndicators.vue'
// import monthAddItem from './components/monthAddItem.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
import { getConfigAPI } from '@/apis/config'
import { getTotalCountAPI } from '@/apis/home'
const loginerStore = useLoginerStore()
const version = JSON.stringify(packageJson.version)
const name = JSON.stringify(packageJson.name)
const totalCountList = ref([])
// 获取当前季度绩效是否开启评定
const getSysConfig = async () => {
  const res = await getConfigAPI({ config_name: 'check_open_assessment' })
  window.localStorage.setItem('check_open_assessment', res.data.config_value)
}
const getTotalCount = async () => {
  const res = await getTotalCountAPI()
  totalCountList.value = res.data
}
onMounted(() => {
  getSysConfig()
  getTotalCount()
})
</script>

<style scoped lang="scss">
.homeIndex {
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  // 路由出口空隙
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 130px);
  width: 87vw;
  display: flex;
  .homeLeft {
    margin-left: 2%;
    width: 60%;
    height: 100%;
    .leftTop {
      display: flex;
      justify-content: space-between;
    }
  }
  .homeRight {
    width: 38%;
    height: 100%;

    .userSysInfo {
      margin-left: 4rem;
      padding: 1rem;
      height: 48%;
      width: 75%;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      .avatar {
        text-align: center;
        width: 30%;
        height: 38%;
        display: inline-block;
        border-radius: 50%;
        margin: 1rem;
        border: 1px solid #ccc;
      }
      .name {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      .sysItem {
        margin-top: 0.5rem;
        background-color: #c3d6e6;
        width: 90%;
        height: 2rem;
        line-height: 2rem;
        padding-left: 1rem;
        color: #0387f4;
        border-radius: 4px;
      }
    }
    .monthItem {
      display: flex;
      height: 15%;
      justify-content: space-around;
      margin: 2rem 0;
    }
  }
}
</style>