import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCount, increaseCount } from "../../redux/slices/posts/postsSlice";
const Navbar = () => {
  const count = useSelector(getCount);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <h3>Blog Posts</h3>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/addpost">Add Post</Link>
          </li>
          <li>
            <button onClick={() => dispatch(increaseCount())}>{count}</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
