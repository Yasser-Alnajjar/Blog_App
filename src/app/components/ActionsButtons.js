import { Link } from "react-router-dom";

const ActionsButtons = ({ post }) => {
  return (
    <div className="actions">
      <Link className="link" to={`/post/${post.id}`}>
        View
      </Link>
      <Link className="link" to={`/post/edit/${post.id}`}>
        Edit
      </Link>
    </div>
  );
};

export default ActionsButtons;
