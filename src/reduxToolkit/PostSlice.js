import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../plugins/axios'

export const getPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (skip) => {
    const response = await axios.get(`/posts?&skip=${skip}`)
    return response.data
  }
)

export const addNewPost = createAsyncThunk(
  '/posts',
  async (initialPost, thunkAPI) => {
    try {
      const response = await axios.post(`/posts`, initialPost)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.error,
      })
    }
  }
)

export const deletePost = createAsyncThunk(
  '/posts/del',
  async (id, thunkAPI) => {
    const response = await axios.delete(`/posts/${id}`)
    return response.data
  }
)

export const updatePost = createAsyncThunk(
  '/posts/update',
  async ({ postId, updatepoststate }, thunkAPI) => {
    const response = await axios.patch(`/posts/${postId}`, updatepoststate)
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
    addPostError: null,
  },
  reducers: {
    deletePostState: (state, action) => {
      state.posts = state.posts.filter((posts) => posts._id !== action.payload)
    },
    updatePostState: (state, action) => {
      // state.posts.findIndex
      // if index != 0
      // state.posts[index]['title']

      const updatepost = state.posts.find(
        (post) => post._id === action.payload.postId
      )
      if (updatepost) {
        updatepost.title = action.payload.updatepoststate.title
        updatepost.fullText = action.payload.updatepoststate.fullText
        updatepost.description = action.payload.updatepoststate.description
      }
      state.posts = state.posts.filter(
        (posts) => posts._id !== action.payload.postId
      )
    },
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
    [updatePost.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload)
    },
  },
})
export const { deletePostState, updatePostState } = postSlice.actions
export default postSlice.reducer
