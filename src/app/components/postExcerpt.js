import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
const PostExcerpt = ({ post }) => {
  return (
    <article key={post.id}>
      <h3>{post.title.substring(0, 20)}...</h3>
      <p>{post.body.substring(0, 50)}...</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
export default PostExcerpt;
