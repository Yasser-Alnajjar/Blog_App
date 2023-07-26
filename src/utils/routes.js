import App from "../App";
import AddPostForm from "../app/components/AddPostForm";
import Layout from "../app/components/Layout";
import UsersList from "../app/components/UsersList";
import EditPost from "../app/pages/EditPost";
import PostSinglePage from "../app/pages/PostSinglePage";
import UserPage from "../app/pages/UserPage";
import { Navigate } from "react-router-dom";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <App /> },
      { path: "post/:postId", element: <PostSinglePage /> },
      { path: "addpost", element: <AddPostForm /> },
      { path: "post/edit/:postId", element: <EditPost /> },
      { path: "users", element: <UsersList /> },
      { path: "users/:userId", element: <UserPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
];
