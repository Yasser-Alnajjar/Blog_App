import { useDispatch } from "react-redux";
import { reactionAdded } from "../../redux/slices/posts/postsSlice";
import Actions from "./ActionsButtons";
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return (
    <section className="reactions">
      <div>{reactionButtons}</div>
      <Actions post={post} />
    </section>
  );
};
export default ReactionButtons;
