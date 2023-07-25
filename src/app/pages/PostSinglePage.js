import { useSelector } from "react-redux";
import { getPostById } from "../../redux/slices/posts/postsSlice";
import PostAuthor from "../components/PostAuthor";
import TimeAgo from "../components/TimeAgo";
import ReactionButtons from "../components/ReactionButtons";
import { useParams } from "react-router-dom";
const PostSinglePage = () => {
  const { postId } = useParams();
  console.log(+postId);
  const post = useSelector((state) => getPostById(state, postId));
  if (!post) return <section>Post Is Not Found </section>;
  console.log(post);
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userid} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostSinglePage;
