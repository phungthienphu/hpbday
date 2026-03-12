import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  showError: boolean;
  errorMessage: string;
  showSuccess: boolean;
  successMessage: string;
  globalLoading: boolean;
}

const initialState: UiState = {
  showError: false,
  errorMessage: "",
  showSuccess: false,
  successMessage: "",
  globalLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.showError = true;
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.showError = false;
      state.errorMessage = "";
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.showSuccess = true;
      state.successMessage = action.payload;
    },
    clearSuccess: (state) => {
      state.showSuccess = false;
      state.successMessage = "";
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setError, clearError, setSuccess, clearSuccess, setGlobalLoading } =
  uiSlice.actions;
export default uiSlice.reducer;
