import App from "../App";
import Layout from "../app/components/Layout";
import EditPost from "../app/pages/EditPost";
import PostSinglePage from "../app/pages/PostSinglePage";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <App /> },
      { path: "post/:postId", element: <PostSinglePage /> },
      { path: "post/edit/:postId", element: <EditPost /> },
    ],
  },
];
