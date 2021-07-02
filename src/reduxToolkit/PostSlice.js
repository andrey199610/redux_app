import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../plugins/axios'

export const getPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (skip) => {
    const response = await axios.get(`/posts?&skip=${skip}`)
    return response.data
  }
)
export const addNewPost = createAsyncThunk('/posts', async (initialPost) => {
  const response = await axios.post(`/posts`, initialPost, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  return response.data
})

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
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload)
    },
  },
})

export default postSlice.reducer
