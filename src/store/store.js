import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './slices/loggedIn';

export default configureStore({
  reducer: {
    loggedIn: loggedInReducer,
  },
});
