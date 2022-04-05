import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './slices/loggedIn';
import jwtTokenReducer from './slices/jwtToken';

export default configureStore({
  reducer: {
    loggedIn: loggedInReducer,
    jwtToken: jwtTokenReducer,
  },
});
