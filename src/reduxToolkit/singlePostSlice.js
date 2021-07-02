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
})

export default postSlice.reducer
