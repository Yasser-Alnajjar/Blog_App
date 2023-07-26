import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostById } from "../../redux/slices/posts/postsSlice";

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => getPostById(state, postId));
  return (
    <article key={post.id}>
      <h3>{post.title.substring(0, 20)}...</h3>
      <p>{post.body.substring(0, 50)}...</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post}>
        <Link className="link" to={`/post/${post.id}`}>
          View
        </Link>
      </ReactionButtons>
    </article>
  );
};
/* this selution is necessary to mimalize the rendering component
let PostExcerpt = ({ post }) => {
PostExcerpt = React.memo(PostExcerpt);
*/
export default PostExcerpt;
