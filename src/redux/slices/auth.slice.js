// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    showModal: false,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { setAuthenticated, toggleModal } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
