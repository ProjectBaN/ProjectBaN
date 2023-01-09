import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
};

export const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { register } = registerSlice.actions;

export default registerSlice.reducer;
