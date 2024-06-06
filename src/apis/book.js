import httpInstance from '@/utils/http'

// 获取概要books
export const getbooksAPI = () => {
  return httpInstance({
    url: '/book/getBookSum',
    method: 'GET'
  })
}

// 获取bookList
export const getbookListAPI = () => {
  return httpInstance({
    url: '/book/findAllBook',
    method: 'GET'
  })
}
// 获取bookCategoriesList
export const getcategoryListAPI = () => {
  return httpInstance({
    url: '/book/findCategory',
    method: 'GET'
  })
}

// 添加bookList
export const addBookListAPI = (book_name, author, category, price, status, buildTime) => {
  return httpInstance({
    url: '/book/addBook',
    method: 'POST',
    data: {
      book_name: book_name,
      author: author,
      category: category,
      price: price,
      status: status,
      buildTime: buildTime
    }
  })
}

// 修改bookList
export const updateBookListAPI = (book_id, book_name, author, category, price, status) => {
  return httpInstance({
    url: '/book/updateBook',
    method: 'POST',
    data: {
      book_id: book_id,
      book_name: book_name,
      author: author,
      category: category,
      price: price,
      status: status
    }
  })
}
// 删除BookList
export const deleteBookListAPI = (book_id) => {
  return httpInstance({
    url: '/book/deteleBook',
    method: 'POST',
    data: {
      book_id: book_id
    }
  })
}

// 获取MonthSaleList
export const getMonthSaleListAPI = () => {
  return httpInstance({
    url: '/book/getMonthSaleList',
    method: 'GET'
  })
}
