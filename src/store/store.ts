import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import memoryReducer from '../features/memorySlice';
import uiReducer from '../features/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    memory: memoryReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

