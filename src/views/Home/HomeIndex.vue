<template>
  <div class="homeIndex">
    <div class="homeLeft">
      <div class="leftTop">
        <baseCount name="用户总数" :count="12"></baseCount>
        <baseCount name="歌曲总数" :count="223"></baseCount>
        <baseCount name="歌手总数" :count="221"></baseCount>
        <baseCount name="歌单总数" :count="123"></baseCount>
      </div>
      <songTopTen></songTopTen>
      <classifyCountSeven></classifyCountSeven>
    </div>
    <div class="homeRight">
      <div class="userSysInfo">
        <img
          :src="loginerStore.userInfo.avatar || '/public/avatar.jpg'"
          alt="无法加载"
          class="avatar"
        />
        <span class="name">{{ loginerStore.userInfo.name || '未登录' || 'admin' }}</span>
        <div class="sysItem">
          <span>系统：{{ name }}</span>
        </div>
        <div class="sysItem">
          <span>系统版本：{{ version }}</span>
        </div>
      </div>
      <div class="monthItem">
        <monthAddItem title="本月新增用户+" :count="12"></monthAddItem>
        <monthAddItem title="本月新增歌曲+" :count="23"></monthAddItem>
      </div>
      <lineAge></lineAge>
    </div>
  </div>
</template>

<script setup>
import packageJson from '../../../package.json'
import baseCount from './components/baseCount.vue'
import songTopTen from './components/songTopTen.vue'
import classifyCountSeven from './components/classifyCountSeven.vue'
import lineAge from './components/lineAge.vue'
import monthAddItem from './components/monthAddItem.vue'
import { useLoginerStore } from '@/stores/LoginerStore'
const loginerStore = useLoginerStore()
const version = JSON.stringify(packageJson.version)
const name = JSON.stringify(packageJson.name)
</script>

<style scoped lang="scss">
.homeIndex {
  // 路由出口空隙
  height: 90vh;
  width: 85vw;
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
      height: 40%;
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
        color: white;
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