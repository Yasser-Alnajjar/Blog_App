import { useDispatch, useSelector } from "react-redux";
import { getPostById, updatePost } from "../../redux/slices/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../redux/slices/users/usersSlice";
import { useState } from "react";

const EditPostForm = ({ postId }) => {
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
  const onTitleChange = ({ target }) => setTitle(target.value);
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
        console.log(err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.full_name}
    </option>
  ));
  return (
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
      <button type="button" onClick={onSaveClick} disabled={!canSave}>
        Save Post
      </button>
    </form>
  );
};
export default EditPostForm;
