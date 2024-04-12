import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getLiteratureAPI,
  getScienceAPI,
  getHistoryAPI,
  getPopularScienceAPI,
  getArtsAPI,
  getSocialSciencesAPI,
  getLifeAPI
} from '@/apis/category'
import { getcategoryListAPI } from '@/apis/book'
//定义各类的数据数组
export const useCategoryStore = defineStore('category', () => {
  const data = ref({
    categoriesList: ref([]),
    literatureList: ref([]),
    scienceList: ref([]),
    historyList: ref([]),
    popularScienceList: ref([]),
    socialSciencesList: ref([]),
    lifeList: ref([]),
    artsList: ref([])
  })

  const getcategoriesList = async () => {
    const res = await getcategoryListAPI()
    data.value.categoriesList.value = res
  }

  const getliteratureList = async () => {
    const res = await getLiteratureAPI()
    data.value.literatureList.value = res
  }
  const getscienceList = async () => {
    const res = await getScienceAPI()
    data.value.scienceList.value = res
  }
  const gethistoryList = async () => {
    const res = await getHistoryAPI()
    data.value.historyList.value = res
  }
  const getsocialSciencesList = async () => {
    const res = await getPopularScienceAPI()
    data.value.socialSciencesList.value = res
  }
  const getpopularScienceList = async () => {
    const res = await getSocialSciencesAPI()
    data.value.popularScienceList.value = res
  }
  const getlifeList = async () => {
    const res = await getLifeAPI()
    data.value.lifeList.value = res
  }
  const getartsList = async () => {
    const res = await getArtsAPI()
    data.value.artsList.value = res
  }

  return {
    data,
    getcategoriesList,
    getliteratureList,
    getscienceList,
    gethistoryList,
    getsocialSciencesList,
    getpopularScienceList,
    getlifeList,
    getartsList
  }
})
