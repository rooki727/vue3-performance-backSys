import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore(
  'order',
  () => {
    const order = ref({
      totalCount: 1002,
      todayAdd: 2,
      monthOrderCount: 100,
      monthMoney: 1200,
      orderList: [
        {
          id: 1,
          account: 123456,
          state: '申请退款中',
          money: 141,
          books: [
            {
              id: 12321312312,
              name: 'aaa',
              catetory: '科学类',
              price: 123,
              count: 1
            },
            {
              id: 12321312222,
              name: 'aaacc',
              catetory: '科学类',
              price: 19,
              count: 1
            }
          ]
        },
        {
          id: 2,
          account: 1234567,
          state: '已完成',
          money: 211,
          books: [
            {
              id: 12321312302,
              name: 'aaa',
              catetory: '文学类',
              price: 123,
              count: 1
            },
            {
              id: 1232131202,
              name: 'aaabc',
              catetory: '科学类',
              price: 88,
              count: 1
            }
          ]
        },
        {
          id: 3,
          account: 134567,
          state: '已退款',
          money: 211,
          books: [
            {
              id: 12321312302,
              name: 'aaa',
              catetory: '文学类',
              price: 123,
              count: 1
            },
            {
              id: 1232131202,
              name: 'aaabc',
              catetory: '科学类',
              price: 88,
              count: 1
            }
          ]
        }
      ],
      MonthSaleList: [
        {
          catetory: '文学类',
          count: 60
        },
        {
          catetory: '科学类',
          count: 12
        },
        {
          catetory: '历史类',
          count: 22
        },
        {
          catetory: '科普类',
          count: 10
        },
        {
          catetory: '艺术类',
          count: 40
        },
        {
          catetory: '社科类',
          count: 90
        },
        {
          catetory: '生活类',
          count: 8
        }
      ]
    })
    const monthSale = computed(() =>
      order.value.MonthSaleList.reduce((total, item) => total + parseInt(item.count), 0)
    )
    return {
      order,
      monthSale
    }
  },

  // 写api请求数据然后得到表里去
  {
    persist: true
  }
)
