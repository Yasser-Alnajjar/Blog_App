import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/posts/postsSlice";
import usersSlice from "./slices/users/usersSlice";
export const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
  },
});
