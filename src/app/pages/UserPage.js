import { useSelector } from "react-redux";
import { getUserById } from "../../redux/slices/users/usersSlice";
import { Link, useParams } from "react-router-dom";
import { selectPostByUser } from "../../redux/slices/posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => getUserById(state, userId));
  // const postsForUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.userId === Number(userId));
  // });
  const postsForUser = useSelector((state) => selectPostByUser(state, userId));
  if (postsForUser.length === 0) {
    return (
      <p
        style={{
          display: "grid",
          placeContent: "center",
          minHeight: "80vh",
          color: "red",
          fontSize: 30,
        }}
      >
        This User Has No Posts
      </p>
    );
  }
  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <section>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>{user.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
