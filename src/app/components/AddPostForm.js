import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../redux/slices/posts/postsSlice";
import { selectAllUsers } from "../../redux/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";
const AddPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(0);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const canSave =
    [title, body, userId].every(Boolean) && addRequestStatus === "idle";
  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setUserId(+e.target.value);

  const onSavePostClicked = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(addNewPost({ title, body, userId })).unwrap();
      setTitle("");
      setBody("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed To Save The Post", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={body}
          onChange={onBodyChanged}
        />
        <div>
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Add Post
          </button>
        </div>
      </form>
    </section>
  );
};
export default AddPostForm;
