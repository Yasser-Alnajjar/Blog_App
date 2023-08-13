import { Link } from "react-router-dom";
const Navbar = () => {
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
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
