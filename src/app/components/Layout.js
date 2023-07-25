import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const Layout = () => {
  return (
    <main>
      <div className="navbar">
        <div className="container">
          <h3>Blog Posts</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
