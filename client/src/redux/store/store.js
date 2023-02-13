import { combineReducers, configureStore } from '@reduxjs/toolkit';
import registerSlice from '../reducer/registerSlice';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { loginSlice } from '../reducer/loginSlice';
import storageSession from 'redux-persist/lib/storage/session';

const reducers = combineReducers({
  user: registerSlice.reducer,
  user: loginSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
