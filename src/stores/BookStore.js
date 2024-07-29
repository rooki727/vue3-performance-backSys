import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getbooksAPI,
  getbookListAPI,
  getcategoryListAPI,
  addBookListAPI,
  updateBookListAPI,
  deleteBookListAPI,
  getCategorySaleListAPI
} from '@/apis/book'
export const useBookStore = defineStore('book', () => {
  const book = ref({})
  const bookList = ref([])
  const categoryList = ref([])
  const categorySaleList = ref([])
  // 获取book月概要
  const getbooks = async () => {
    const res = await getbooksAPI()
    book.value = res
  }
  // 获取分类销售榜
  const getCategorySaleList = async () => {
    const res = await getCategorySaleListAPI()
    categorySaleList.value = res
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
    stock,
    press
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
      stock,
      press
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
    sale_number,
    press
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
      sale_number,
      press
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
    categorySaleList,
    getbooks,
    getbookList,
    getcategoryList,
    addBookList,
    updateBookList,
    deleteBookList,
    getCategorySaleList
  }
})
