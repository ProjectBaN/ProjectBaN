import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const asyncLoginUser = createAsyncThunk('login/asyncLoginUser', async (body) => {
  try {
    const response = await axios
      .post('http://localhost:8000/auth/signin', body, { withCredentials: true })
      .then((result) => result);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    status: '',
    isLogin: false,
    error: '',
    loading: false,
  },
  reducers: {
    logout: (state, action) => {
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoginUser.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
        state.isLogin = false;
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.isLogin = true;
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;
export { asyncLoginUser };
export default loginSlice.reducer;
