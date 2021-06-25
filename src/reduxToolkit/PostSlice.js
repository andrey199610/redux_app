import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (skip) => {
    const response = await axios.get(
      `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts?&skip=${skip}`
    )
    return response.data
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    prevPostLength: 0,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loading = false
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = true
      state.prevPostLength = state.posts.length
      state.posts = [...state.posts, ...action.payload]
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = true
      state.error = action.error.message
    },
  },
})

export default postSlice.reducer
