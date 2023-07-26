import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { fetchUsers } from "./redux/slices/users/usersSlice";
import { routes } from "./utils/routes";
import { store } from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchPosts } from "./redux/slices/posts/postsSlice";
const router = createBrowserRouter(routes);
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>,
  document.getElementById("root")
);
