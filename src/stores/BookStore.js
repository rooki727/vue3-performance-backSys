import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getbooksAPI,
  getbookListAPI,
  getcategoryListAPI,
  addBookListAPI,
  updateBookListAPI,
  deleteBookListAPI
} from '@/apis/book'
export const useBookStore = defineStore('book', () => {
  const book = ref({})
  const bookList = ref([])
  const categoryList = ref([])

  // 获取book月概要
  const getbooks = async () => {
    const res = await getbooksAPI()
    book.value = res
  }

  // 获取bookList
  const getbookList = async () => {
    const res = await getbookListAPI()
    bookList.value = res
  }

  // 获取categoryList
  const getcategoryList = async () => {
    const res = await getcategoryListAPI()
    categoryList.value = res
  }

  // 添加bookList
  const addBookList = async (book_name, author, category, price, stock_quantity) => {
    await addBookListAPI(book_name, author, category, price, stock_quantity)
    getbookList()
  }
  // 修改bookList信息
  const updateBookList = async (id, book_name, author, category, price, stock_quantity) => {
    await updateBookListAPI(id, book_name, author, category, price, stock_quantity)
    getbookList()
  }
  // 删除bookList
  const deleteBookList = async (id) => {
    await deleteBookListAPI(id)
    getbookList()
  }

  return {
    book,
    bookList,
    categoryList,
    getbooks,
    getbookList,
    getcategoryList,
    addBookList,
    updateBookList,
    deleteBookList
  }
})
