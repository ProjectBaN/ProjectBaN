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
        state.isId = '응 안돼';
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.status = 'failed';
      });
    // .addCase(asyncDuplciataUser.pending, (state, action) => {
    //   state.status = 'loading';
    //   state.loading = true;
    // })
    // .addCase(asyncDuplciataUser.fulfilled, (state, action) => {
    //   state.status = 'sucess';
    //   if ((state.isId = action.payload === false)) {
    //     state.duplicateMessage = '사용가능 아이디입니다.';
    //   }
    //   state.loading = false;
    // })
    // .addCase(asyncDuplciataUser.rejected, (state, action) => {
    //   state.status = '중복된 이메일 입니다.';
    // });
  },
});

// Action creators are generated for each case reducer function
export const { registerUser } = registerSlice.actions;
export { asyncRegisterUser };
export default registerSlice;
