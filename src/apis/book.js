import httpInstance from '@/utils/http'

// 获取概要books
export const getbooksAPI = () => {
  return httpInstance({
    url: '/books',
    method: 'GET'
  })
}

// 获取bookList
export const getbookListAPI = () => {
  return httpInstance({
    url: '/bookList',
    method: 'GET'
  })
}
// 获取bookCategoriesList
export const getcategoryListAPI = () => {
  return httpInstance({
    url: '/categoryList',
    method: 'GET'
  })
}

// 添加bookList
export const addBookListAPI = (book_name, author, category, price, stock_quantity) => {
  return httpInstance({
    url: '/bookList',
    method: 'POST',
    data: {
      book_name: book_name,
      author: author,
      category: category,
      price: price,
      stock_quantity: stock_quantity
    }
  })
}

// 修改bookList
export const updateBookListAPI = (id, book_name, author, category, price, stock_quantity) => {
  return httpInstance({
    url: '/bookList/' + id,
    method: 'PATCH',
    data: {
      id: id,
      book_name: book_name,
      author: author,
      category: category,
      price: price,
      stock_quantity: stock_quantity
    }
  })
}
// 删除BookList
export const deleteBookListAPI = (id) => {
  return httpInstance({
    url: `/bookList/${id}`,
    method: 'DELETE'
  })
}
