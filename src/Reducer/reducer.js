import {
  LOAD_POSTS,
  LOAD_POSTS_PUBLIC,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
} from '../Action/action'
import { images } from '../DummyAPI/images'


const initialState = {
  data: images,
  isLoading: false,
  isLoggedIn: false,
  error: '',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POSTS:
      return { ...state, isLoggedIn: true }
    case ADD_POST:
      return { ...state }
    case DELETE_POST:
      return { ...state }
    case EDIT_POST:
      return { ...state }
    case LOAD_POSTS_PUBLIC:
      return { ...state, IsLoggedIn: false }
    default:
      return state
  }
}


