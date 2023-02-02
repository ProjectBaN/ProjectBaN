import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
};

export const registerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadings: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadings } = registerSlice.actions;

export default registerSlice.reducer;
