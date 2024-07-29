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
export const addBookListAPI = (
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
  return httpInstance({
    url: '/book/addBook',
    method: 'POST',
    data: {
      book_name: book_name,
      author: author,
      category: category,
      price: price,
      buildTime: buildTime,
      picture: picture,
      main_picture: main_picture,
      introduce: introduce,
      stock: stock,
      press: press
    }
  })
}

// 修改bookList
export const updateBookListAPI = (
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
  return httpInstance({
    url: '/book/updateBook',
    method: 'POST',
    data: {
      book_id: book_id,
      book_name: book_name,
      author: author,
      category: category,
      price: price,
      picture: picture,
      main_picture: main_picture,
      introduce: introduce,
      stock: stock,
      sale_number: sale_number,
      press: press
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
export const getCategorySaleListAPI = () => {
  return httpInstance({
    url: '/book/getCategorySaleList',
    method: 'GET'
  })
}
