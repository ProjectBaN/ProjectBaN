import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/registerSlice';
import loginReducer from '../reducer/loginSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    user: loginReducer,
  },
});
