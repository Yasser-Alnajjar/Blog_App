import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostById,
  updatePost,
  deletePost,
} from "../../redux/slices/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { selectAllUsers } from "../../redux/slices/users/usersSlice";
import { useState } from "react";

const EditPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const post = useSelector((state) => getPostById(state, postId));
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);
  const [requestStatus, setRequestStatus] = useState("idle");
  const canSave =
    [title, body, userId].every(Boolean) && requestStatus === "idle";
  if (!post) {
    return <div>Post Not Found</div>;
  }
  const onTitleChange = ({ target }) => {
    setTitle(target.value);
  };
  const onBodyChange = ({ target }) => setBody(target.value);
  const onUserChange = ({ target }) => setUserId(+target.value);
  const updatedData = {
    id: post.id,
    title,
    body,
    userId,
    reactions: post.reactions,
  };
  const onSaveClick = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(updatePost(updatedData)).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
        navigation(`/post/${post.id}`);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const onDeletePost = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setBody("");
      setUserId("");
      navigation("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRequestStatus("idle");
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.full_name}
    </option>
  ));
  return (
    <section>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onUserChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postBody">Author:</label>
        <textarea
          type="text"
          id="postBody"
          name="postBody"
          value={body}
          onChange={onBodyChange}
        ></textarea>
        <div className="form-edit__buttons">
          <button type="button" onClick={onSaveClick} disabled={!canSave}>
            Save Post
          </button>
          <button type="button" onClick={onDeletePost} disabled={!canSave}>
            Delete
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPost;
