import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

const asyncLoginUser = createAsyncThunk('login/asyncLoginUser', async (body) => {
  try {
    const response = await axios
      .post('http://localhost:8000/auth/signin', body, { withCredentials: true })
      .then((result) => result);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const asyncLogoutUser = createAsyncThunk('login/asyncLogoutUser', async () => {
  try {
    const response = await axios
      .post('http://localhost:8000/auth/signout', '', { withCredentials: true })
      .then((result) => result);
    return response.data;
  } catch (err) {
    return err.payload;
  }
});
const initialState = { status: '', isLogin: false, error: '', loading: false };
export const loginSlice = createSlice({
  name: 'login',
  initialState: { initialState },
  reducers: {},
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
        state.status = 'fail';
        state.loading = false;
        state.isLogin = false;
      })

      .addCase(asyncLogoutUser.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
        state.isLogin = true;
      })
      .addCase(asyncLogoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.isLogin = false;
      })
      .addCase(PURGE, () => '');
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;
export { asyncLoginUser, asyncLogoutUser };
export default loginSlice.reducer;
