import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const asyncLoginUser = createAsyncThunk('login/asyncLoginUser', async (body) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/signin', body).then((result) => result);
    return response;
  } catch (err) {
    console.log(err);
  }
});

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    status: '',
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoginUser.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

// Action creators are generated for each case reducer function
export const { loginUser } = loginSlice.actions;
export { asyncLoginUser };
export default loginSlice.reducer;
