import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getbooksAPI,
  getbookListAPI,
  getcategoryListAPI,
  addBookListAPI,
  updateBookListAPI,
  deleteBookListAPI,
  getMonthSaleListAPI
} from '@/apis/book'
export const useBookStore = defineStore('book', () => {
  const book = ref({})
  const bookList = ref([])
  const categoryList = ref([])
  const monthSaleList = ref([])
  // 获取book月概要
  const getbooks = async () => {
    const res = await getbooksAPI()
    book.value = res
  }
  // 获取分类销售榜
  const getMonthSaleList = async () => {
    const res = await getMonthSaleListAPI()
    monthSaleList.value = res
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
  const addBookList = async (
    book_name,
    author,
    category,
    price,

    buildTime,
    picture,
    main_picture,
    introduce,
    stock
  ) => {
    await addBookListAPI(
      book_name,
      author,
      category,
      price,

      buildTime,
      picture,
      main_picture,
      introduce,
      stock
    )
    getbookList()
  }
  // 修改bookList信息
  const updateBookList = async (
    book_id,
    book_name,
    author,
    category,
    price,
    picture,
    main_picture,
    introduce,
    stock,
    sale_number
  ) => {
    await updateBookListAPI(
      book_id,
      book_name,
      author,
      category,
      price,
      picture,
      main_picture,
      introduce,
      stock,
      sale_number
    )
    getbookList()
  }
  // 删除bookList
  const deleteBookList = async (book_id) => {
    await deleteBookListAPI(book_id)
    getbookList()
  }

  return {
    book,
    bookList,
    categoryList,
    monthSaleList,
    getbooks,
    getbookList,
    getcategoryList,
    addBookList,
    updateBookList,
    deleteBookList,
    getMonthSaleList
  }
})
