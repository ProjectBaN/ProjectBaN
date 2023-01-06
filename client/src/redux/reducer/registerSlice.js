import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  test: '',
};

export const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.test = action.payload.test;
    },
  },
});

// Action creators are generated for each case reducer function
export const { register } = registerSlice.actions;

export default registerSlice.reducer;
