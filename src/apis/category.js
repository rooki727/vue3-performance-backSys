import httpInstance from '@/utils/http'

// 获取Literature
export const getLiteratureAPI = () => {
  return httpInstance({
    url: '/Literature',
    method: 'GET'
  })
}

// 获取Science
export const getScienceAPI = () => {
  return httpInstance({
    url: '/Science',
    method: 'GET'
  })
}

// 获取History
export const getHistoryAPI = () => {
  return httpInstance({
    url: '/History',
    method: 'GET'
  })
}

// 获取PopularScience
export const getPopularScienceAPI = () => {
  return httpInstance({
    url: '/PopularScience',
    method: 'GET'
  })
}

// 获取Arts
export const getArtsAPI = () => {
  return httpInstance({
    url: '/Arts',
    method: 'GET'
  })
}
// 获取SocialSciences
export const getSocialSciencesAPI = () => {
  return httpInstance({
    url: '/SocialSciences',
    method: 'GET'
  })
}
// 获取Life
export const getLifeAPI = () => {
  return httpInstance({
    url: '/Life',
    method: 'GET'
  })
}

// 添加一级分类
export const addFirstCategoryAPI = (name, value, url) => {
  return httpInstance({
    url: '/categoryList',
    method: 'POST',
    data: {
      name: name,
      value: value,
      url: url
    }
  })
}

// 添加二级分类
export const addSecondCategoryAPI = (url, name, value) => {
  return httpInstance({
    url: `/${url}`,
    method: 'POST',
    data: {
      name: name,
      value: value
    }
  })
}

// 删除一级分类
export const delFirstCategoryAPI = (id) => {
  return httpInstance({
    url: '/categoryList/' + id,
    method: 'DELETE'
  })
}

// 删除二级分类
export const delSecondCategoryAPI = (url, id) => {
  return httpInstance({
    url: `/${url}/${id}`,
    method: 'DELETE'
  })
}
