import http from '../utils/request'

export const queryUserList = () => {
  return http.request({
    url: '/user',
    method: 'get'
  })
}

export const addUser = data => {
  return http.request({
    url: '/user/add',
    method: 'post',
    data: data
  })
}

export const editUser = data => {
  return http.request({
    url: '/user/edit',
    method: 'put',
    data: data
  })
}

export const deleteUser = id => {
  return http.request({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
}
