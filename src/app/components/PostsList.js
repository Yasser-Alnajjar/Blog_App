import { useSelector } from "react-redux";
import {
  selectPostIds,
  getPostsError,
  getPostsStatus,
} from "../../redux/slices/posts/postsSlice";
import PostExcerpt from "./postExcerpt";

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  let content;
  if (postsStatus === "loading") {
    content = <p>loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "falied") {
    content = <p>{error}</p>;
  }
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Posts</h2>
      <div className="posts">{content}</div>
    </>
  );
};
export default PostsList;
