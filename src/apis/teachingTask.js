import httpInstance from '@/utils/http'

export function getAllTaskAPI() {
  return httpInstance({
    method: 'get',
    url: '/teachingTask/getAllTask'
  })
}

// 根据用户获取
export function getTaskByUserAPI(user_id) {
  return httpInstance({
    method: 'get',
    url: `/teachingTask/getTaskByUser?user_id=${user_id}`
  })
}
// 删除
export function deleteTaskAPI(task_id) {
  return httpInstance({
    method: 'post',
    url: `/teachingTask/deleteTask?task_id=${task_id}`
  })
}

// 添加
export function addTaskAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/teachingTask/addTask',
    data
  })
}

// 修改
export function updateTaskAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/teachingTask/updateTask',
    data
  })
}

// 审核
export function checkTaskAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/teachingTask/checkStatus',
    data
  })
}
