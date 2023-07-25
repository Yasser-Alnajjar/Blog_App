import { useParams } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";
const EditPost = () => {
  const { postId } = useParams();
  return (
    <section>
      <h2>Edit Post</h2>
      <EditPostForm postId={postId} />
    </section>
  );
};

export default EditPost;
