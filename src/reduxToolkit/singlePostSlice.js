import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../plugins/axios'

export const getSinglePost = createAsyncThunk(
  'posts/fetchSinglePost',
  async (id) => {
    const response = await axios.get(`/posts/${id}`)
    return response.data
  }
)

const postSlice = createSlice({
  name: 'singlepost',
  initialState: {
    post: {},
    loading: false,
    error: null,
  },
  extraReducers: {
    [getSinglePost.pending]: (state, action) => {
      state.loading = false
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.loading = true
      state.post = action.payload
    },
    [getSinglePost.rejected]: (state, action) => {
      state.loading = true
      state.error = action.error.message
    },
  },
  reducers: {
    likePostState: (state, action) => {
      state.post.likes.push(action.payload)
    },
    unlikePostState: (state, action) => {
      state.post.likes = state.post.likes.filter((id) => id !== action.payload)
    },
  },
})
export const { likePostState, unlikePostState } = postSlice.actions
export default postSlice.reducer
