import axios from 'axios'
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'

export const EDIT_POST = 'EDIT_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const LOG_OUT = 'LOG_OUT'
export const LOAD_POSTS = 'LOAD_POSTS'
export const PHOTO_SPOTLIGHT = 'PHOTO_SPOTLIGHT'
export const DATA_LOADING = 'DATA_LOADING'

export const logIn = (credentials) => dispatch => {
  dispatch({ type: DATA_LOADING, payload: true })
  axiosWithAuth().post('/auth/login', credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.token)
      dispatch({ type: DATA_LOADING, payload: false })
      window.location.reload(true)
    })
    .catch(err => console.log('Error logging in -->', err))

}

export const logOut = () => dispatch => {
  localStorage.removeItem('token')
  window.location.reload(true)
}

export const loadPosts = () => dispatch => {
  axiosWithAuth().get('/posts')
    .then(res => {
      dispatch({ type: LOAD_POSTS, payload: res.data })
    })
    .catch(err => {
      console.log('Error while fetching data --> ', err.response)
    })
}

export const addPost = (post) => dispatch => {
  axiosWithAuth().post('/posts/user/1', post)
    .then(res => console.log('Post Successful --> ', res))
    .catch(err => console.log('Post error --> ', err.response))
}

export const spotLight = (id) => dispatch => {
  axiosWithAuth().get(`/posts/${id}`)
    .then(res => dispatch({ type: PHOTO_SPOTLIGHT, payload: res.data }))

}