import { configureStore } from '@reduxjs/toolkit';
import registerSlice from '../reducer/registerSlice';

export const store = configureStore({
  reducer: {
    user: registerSlice,
  },
});
