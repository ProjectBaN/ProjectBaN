import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/registerSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
