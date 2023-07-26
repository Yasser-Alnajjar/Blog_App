import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
