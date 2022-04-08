import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './slices/loggedIn';
import jwtTokenReducer from './slices/jwtToken';
import postsReducer from './slices/posts';

export default configureStore({
  reducer: {
    loggedIn: loggedInReducer,
    jwtToken: jwtTokenReducer,
    posts: postsReducer,
  },
});
