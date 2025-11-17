import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  showError: boolean;
  errorMessage: string;
  showSuccess: boolean;
  successMessage: string;
}

const initialState: UiState = {
  showError: false,
  errorMessage: '',
  showSuccess: false,
  successMessage: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.showError = true;
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.showError = false;
      state.errorMessage = '';
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.showSuccess = true;
      state.successMessage = action.payload;
    },
    clearSuccess: (state) => {
      state.showSuccess = false;
      state.successMessage = '';
    },
  },
});

export const { setError, clearError, setSuccess, clearSuccess } = uiSlice.actions;
export default uiSlice.reducer;

