import { configureStore } from '@reduxjs/toolkit';
import testcounterReducer from '../reducer/testSlice';

export const store = configureStore({
  reducer: {
    counter: testcounterReducer,
  },
});
