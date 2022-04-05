import { createSlice } from '@reduxjs/toolkit';

export const jwtTokenSlice = createSlice({
  name: 'jwtToken',
  initialState: {
    value: '',
  },
  reducers: {
    setJwtToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setJwtToken } = jwtTokenSlice.actions;

export default jwtTokenSlice.reducer;
