import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './PostSlice'
import postSingleReducer from './singlePostSlice'
import signupRedusers from './SignUpSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    post: postSingleReducer,
    signup: signupRedusers,
  },
})
