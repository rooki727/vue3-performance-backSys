<script setup>
import totalItem from './components/totalItem.vue'
import LineCharts from './components/LineCharts.vue'
import { useOrderStore } from '@/stores/OrderStore'
import { useUserStore } from '@/stores/userStore'
import { useBookStore } from '@/stores/BookStore'
import VerticalCharts from './components/VerticalCharts.vue'
import MonthItem from './components/MonthItem.vue'
import { computed, onMounted } from 'vue'
const OrderStore = useOrderStore()
const userStore = useUserStore()
const BookStore = useBookStore()
const getTableForm = () => {
  userStore.getUser()
  userStore.getAdminList()
  userStore.getCommonUser()
  BookStore.getbooks()
  BookStore.getbookList()
  BookStore.getcategoryList()
  OrderStore.getMonthSaleList()
  OrderStore.getOrder()
  OrderStore.getOrderList()
}
const adminCount = computed(() => userStore.adminList.length)
const commonUserCount = computed(() => userStore.commonUserList.length)
const bookMonthAdd = computed(() => BookStore.book.monthAdd)
const bookMonthOut = computed(() => BookStore.book.monthOut)

// 计算属性：计算 stock_quantity 的总量
const totalStockQuantity = computed(() => {
  return BookStore.bookList.reduce((total, book) => {
    return total + book.stock_quantity
  }, 0)
})
onMounted(() => getTableForm())
</script>

<template>
  <div class="common-layout" style="border: 1px solid gray; border-top: none; border-radius: 5px">
    <div class="header">
      <totalItem
        :title="$t('messages.admin')"
        :count="adminCount"
        style="background-image: linear-gradient(to right, rgb(242, 49, 49), rgb(204, 153, 102))"
      ></totalItem>
      <totalItem
        :title="$t('messages.common_User')"
        :count="commonUserCount"
        :message="$t('messages.commonUserMessage')"
        :todayCount="userStore.user?.todayAdd"
        style="background-image: linear-gradient(to right, rgb(204, 153, 102), rgb(220, 220, 35))"
      ></totalItem>
      <totalItem
        :title="$t('messages.book')"
        :count="totalStockQuantity"
        :message="$t('messages.bookMessage')"
        :todayCount="BookStore.book?.todayAdd"
        style="background-image: linear-gradient(to right, rgb(220, 220, 35), rgb(36, 224, 39))"
      ></totalItem>
      <totalItem
        :title="$t('messages.order')"
        :count="OrderStore.totalCount"
        :todayCount="OrderStore.order?.todayAdd"
        :message="$t('messages.orderMessage')"
        style="background-image: linear-gradient(to right, rgb(36, 224, 39), rgb(36, 224, 214))"
      ></totalItem>
    </div>
    <el-divider />
    <div class="main">
      <div class="mainLeft">
        <div class="leftTop">
          <div class="linechart">
            <LineCharts></LineCharts>
          </div>
        </div>
        <el-divider />
        <div class="leftBottom">
          <MonthItem
            :title="$t('messages.MonthUserTitle')"
            :message="$t('messages.MonthUserMessage1')"
            :message2="$t('messages.MonthUserMessage2')"
            :data="userStore.user.monthVisit"
            :data2="userStore.user.perPurchase"
          ></MonthItem>
          <MonthItem
            :title="$t('messages.MonthBookTitle')"
            :message="$t('messages.MonthBookMessage1')"
            :message2="$t('messages.MonthBookMessage2')"
            :data="bookMonthAdd"
            :data2="bookMonthOut"
          ></MonthItem>
          <MonthItem
            :title="$t('messages.MonthOrderTitle')"
            :message="$t('messages.MonthOrderMessage1')"
            :message2="$t('messages.MonthOrderMessage2')"
            :data="OrderStore.monthSale"
            :data2="OrderStore.monthMoney"
          ></MonthItem>
        </div>
      </div>
      <div class="mainRight">
        <VerticalCharts></VerticalCharts>
        <div class="qucikTo" style="text-align: center">
          <span>{{ $t('messages.Click_toNav') }}</span>
          <table width="100%">
            <thead>
              <tr>
                <th colspan="2">{{ $t('messages.user_manage') }}</th>
                <th colspan="2">{{ $t('messages.book_manage') }}</th>
                <th colspan="2">{{ $t('messages.order_manage') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td @click="$router.push('/user/adminlist')">{{ $t('messages.admin_list') }}</td>
                <td @click="$router.push('/user/userlist')">{{ $t('messages.user_list') }}</td>
                <td @click="$router.push('/book/booklist')">{{ $t('messages.book_List') }}</td>
                <td @click="$router.push('/book/bookcategory')">
                  {{ $t('messages.book_catetory') }}
                </td>
                <td @click="$router.push('/order/orderlist')">{{ $t('messages.order_list') }}</td>
                <td @click="$router.push('/order/orderverify')">
                  {{ $t('messages.order_check') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.header {
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-self: center;
}
.main {
  display: flex;
  .mainLeft {
    width: 70%;
    border-right: 1px solid orange;
    .leftBottom {
      display: flex;
      justify-content: space-around;
    }
  }
  .mainRight {
    width: 30%;
    justify-content: space-between;
    padding-right: 15px;
    th {
      background-color: skyblue;
      color: white;
    }
    td {
      background-color: rgb(249, 246, 246);
      color: rgb(116, 112, 112);
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: rgb(185, 182, 182);
      }
    }
  }
}
</style>