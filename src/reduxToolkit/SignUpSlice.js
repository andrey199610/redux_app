import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../plugins/axios'

export const getSignUpSlice = createAsyncThunk(
  'user/signup',
  async (obj, thunkAPI) => {
    try {
      const response = await axios.post(`/users`, {
        email: obj.email,
        password: obj.password,
        name: obj.name,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.error })
    }
  }
)

const signupSlice = createSlice({
  name: 'token',
  initialState: {
    user: null,
    loading: true,
    error: null,
    success: false,
    auth: !!localStorage.getItem('token'),
  },
  extraReducers: {
    [getSignUpSlice.pending]: (state, action) => {
      state.success = false
      state.loading = false
    },
    [getSignUpSlice.fulfilled]: (state, action) => {
      state.error = null
      state.loading = true
      state.user = action.payload
      state.success = true
    },
    [getSignUpSlice.rejected]: (state, action) => {
      state.success = false
      state.loading = true
      state.error = action.payload.error
    },
  },
  reducers: {
    reset: (state, action) => {
      state.success = false
    },
    signin: (state, action) => {
      state.auth = action.payload
    },
  },
})
export const { reset, signin } = signupSlice.actions
export default signupSlice.reducer
