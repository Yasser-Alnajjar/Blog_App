import { useDispatch } from "react-redux";
import { reactionAdded } from "../../redux/slices/posts/postsSlice";
import Actions from "./ActionsButtons";
import { useState } from "react";
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  sad: "😭",
  executed: "🥰",
};

const ReactionButtons = ({ post, children }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
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
      <button className="like" onMouseEnter={() => setShow(!show)}>
        Like
      </button>
      <div
        onMouseLeave={() => setShow(!show)}
        className={`${show ? "show" : "hide"} reactions-content`}
      >
        {reactionButtons}
      </div>
      <Actions post={post}>{children}</Actions>
    </section>
  );
};
export default ReactionButtons;
