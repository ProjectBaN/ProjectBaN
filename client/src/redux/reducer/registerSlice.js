import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerState: '',
};

export const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.registerState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { register } = registerSlice.actions;

export default registerSlice.reducer;
