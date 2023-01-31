import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerState: '',
};

export const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      console.log('레지스터실행됨');
      console.log(action.payload.data);
      state.registerState = 'naver.com';
      console.log(state.registerState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { register } = registerSlice.actions;

export default registerSlice.reducer;
