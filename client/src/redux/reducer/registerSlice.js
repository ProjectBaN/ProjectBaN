import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const asyncRegisterUser = createAsyncThunk('user/asyncRegisterUser', async (body) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/signup', body).then((result) => result.data);
    return response;
  } catch (err) {
    console.log(err);
  }
});

// const asyncDuplciataUser = createAsyncThunk('user/asyncDuplciataUser', async (id) => {
//   try {
//     const response = await axios.get(`http://localhost:8000/auth/signup/idcheck?id=${id}`);
//     return response.data.data.duplicate;
//   } catch (err) {}
// });

export const registerSlice = createSlice({
  name: 'registers',
  initialState: {
    status: '',
    error: '',
    loading: false,
    duplicateMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncRegisterUser.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(asyncRegisterUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

// Action creators are generated for each case reducer function
export const { registerUser } = registerSlice.actions;
export { asyncRegisterUser };
export default registerSlice;
