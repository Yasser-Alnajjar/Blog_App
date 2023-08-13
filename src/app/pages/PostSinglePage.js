import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostById } from "../../redux/slices/posts/postsSlice";
import PostAuthor from "../components/PostAuthor";
import TimeAgo from "../components/TimeAgo";
import ReactionButtons from "../components/ReactionButtons";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const PostSinglePage = () => {
  const { postId } = useParams();
  const navigatate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => getPostById(state, postId));
  if (!post) return <section>Post Is Not Found </section>;
  const onDeletePost = () => {
    try {
      dispatch(deletePost({ id: post.id })).unwrap();
      navigatate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userid} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post}>
        <Link className="link" to={`/post/edit/${post.id}`}>
          Edit
        </Link>
        <button className="delete__btn" onClick={onDeletePost}>
          Delete
        </button>
      </ReactionButtons>
    </article>
  );
};

export default PostSinglePage;
