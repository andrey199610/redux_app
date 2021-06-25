import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './PostSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
})
