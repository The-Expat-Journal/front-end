import axios from 'axios'
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'
export const EDIT_POST = 'EDIT_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const LOAD_POSTS_PUBLIC = 'LOAD_POSTS_PUBLIC'
export const LOAD_POSTS = 'LOAD_POSTS'
export const PHOTO_SPOTLIGHT = 'PHOTO_SPOTLIGHT'

export const loadPosts = () => dispatch => {
  // dispatch({ type: LOAD_POSTS })
  axiosWithAuth().get('/posts')
    .then(res => {
      dispatch({ type: LOAD_POSTS, payload: res.data })
    })
    .catch(err => {
      console.log('Error while fetching data --> ', err)
    })
}

export const spotLight = (id) => dispatch => {
  dispatch({ type: PHOTO_SPOTLIGHT, payload: id })
}