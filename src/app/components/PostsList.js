import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "../../redux/slices/posts/postsSlice";
import PostExcerpt from "./postExcerpt";
import { useEffect } from "react";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  console.log(posts);
  useEffect(() => {
    if (postsStatus == "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);
  let content;
  if (postsStatus === "loading") {
    content = <p>loading...</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "falied") {
    content = <p>{error}</p>;
  }
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostsList;
