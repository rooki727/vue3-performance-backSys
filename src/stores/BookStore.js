import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStore = defineStore('book', () => {
  const book = ref({
    totalCount: 5000,
    todayAdd: 15,
    monthAdd: 500,
    monthOut: 460,
    bookList: [
      {
        book_id: 1,
        book_name: '高数',
        author: 'asd',
        category: '文学类',
        price: 55,
        stock_quantity: 22
      },
      {
        book_id: 2,
        book_name: 'xx',
        author: 'xx',
        category: '科学类',
        price: 55,
        stock_quantity: 22
      },
      {
        book_id: 1,
        book_name: 'ls',
        author: 'ls',
        category: '历史类',
        price: 55,
        stock_quantity: 22
      },
      {
        book_id: 1,
        book_name: 'kep',
        author: 'kep',
        category: '科普类',
        price: 55,
        stock_quantity: 22
      },
      {
        book_id: 1,
        book_name: 'ys',
        author: 'ys',
        category: '艺术类',
        price: 55,
        stock_quantity: 22
      },
      {
        book_id: 1,
        book_name: 'sk',
        author: 'sk',
        category: '社科类',
        price: 55,
        stock_quantity: 22
      },
      {
        book_id: 1,
        book_name: 'sh',
        author: 'sh',
        category: '生活类',
        price: 55,
        stock_quantity: 22
      }
    ],
    categoryList: [
      {
        catetory: '文学类',
        count: 660
      },
      {
        catetory: '科学类',
        count: 1200
      },
      {
        catetory: '历史类',
        count: 220
      },
      {
        catetory: '科普类',
        count: 1000
      },
      {
        catetory: '艺术类',
        count: 400
      },
      {
        catetory: '社科类',
        count: 900
      },
      {
        catetory: '生活类',
        count: 800
      }
    ]
  })

  return {
    book
  }
})
