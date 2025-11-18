import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import memoryReducer from '../features/memorySlice';
import uiReducer from '../features/uiSlice';

const AUTH_STORAGE_KEY = 'hppd_bb_auth';

type AppStateShape = {
  auth: ReturnType<typeof authReducer>;
  memory: ReturnType<typeof memoryReducer>;
  ui: ReturnType<typeof uiReducer>;
};

const loadPreloadedState = (): AppStateShape | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const serializedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!serializedAuth) {
      return undefined;
    }
    return {
      auth: JSON.parse(serializedAuth),
    } as AppStateShape;
  } catch (error) {
    console.warn('Failed to load auth state from localStorage', error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    memory: memoryReducer,
    ui: uiReducer,
  },
  preloadedState: loadPreloadedState(),
});

store.subscribe(() => {
  if (typeof window === 'undefined') {
    return;
  }

  const { auth } = store.getState();
  try {
    if (auth.isAuthenticated) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to persist auth state', error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

