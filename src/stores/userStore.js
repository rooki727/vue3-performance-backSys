import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      totalCount: 3000,
      todayAdd: 10,
      adminCount: 10,
      commonUserCount: 2990,
      monthVisit: 1000,
      perPurchase: 30,
      adminList: [
        {
          id: 1,
          name: 'rooki',
          sex: '男',
          account: 1668943468,
          password: 12312312,
          phone: 1231231231,
          verify: 'first'
        },
        {
          id: 2,
          name: 'rooki2',
          sex: '男',
          account: 1668943466,
          password: 12312312,
          phone: 1231231231,
          verify: 'second'
        }
      ],
      commonUserList: [
        {
          id: 1,
          name: 'zs',
          sex: '男',
          account: 1668943468,
          password: 12312312,
          phone: 1231231231,
          address: '广东药科大学'
        },
        {
          id: 2,
          name: 'ls',
          sex: '男',
          account: 1668943468,
          password: 12312312,
          phone: 1231231231,
          address: '广东药科大学'
        },
        {
          id: 3,
          name: 'ww',
          sex: '男',
          account: 1668943468,
          password: 12312312,
          phone: 1231231231,
          address: '广东药科大学'
        },
        {
          id: 4,
          name: 'll',
          sex: '男',
          account: 1668943468,
          password: 12312312,
          phone: 1231231231,
          address: '广东药科大学'
        }
      ]
    })

    return {
      user
    }
  },
  {
    persist: true
  }
)
