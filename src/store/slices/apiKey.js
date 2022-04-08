import { createSlice } from '@reduxjs/toolkit';

export const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState: {
    value: '',
  },
  reducers: {
    setKey: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setKey } = apiKeySlice.actions;

export default apiKeySlice.reducer;
