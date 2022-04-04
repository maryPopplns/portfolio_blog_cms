import { configureStore } from '@reduxjs/toolkit';
import loggedinReducer from './slices/loggedin';

export default configureStore({
  reducer: {
    loggedin: loggedinReducer,
  },
});
