import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  anniversaryDate: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  anniversaryDate: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ day: number; month: number; year: number }>,
    ) => {
      const { day, month, year } = action.payload;

      // Ngày kỷ niệm cố định (ví dụ 1-1-2025)
      const validDay = 9;
      const validMonth = 1;
      const validYear = 2025;

      if (day === validDay && month === validMonth && year === validYear) {
        state.isAuthenticated = true;
        state.anniversaryDate = `${year}-${String(month).padStart(
          2,
          '0',
        )}-${String(day).padStart(2, '0')}`;
      } else {
        throw new Error('Invalid anniversary date');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.anniversaryDate = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

