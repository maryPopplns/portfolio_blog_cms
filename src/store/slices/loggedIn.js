import { createSlice } from '@reduxjs/toolkit';

export const loggedinSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => (state.value = true),
    logout: (state) => (state.value = false),
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loggedinSlice.actions;

export default loggedinSlice.reducer;
