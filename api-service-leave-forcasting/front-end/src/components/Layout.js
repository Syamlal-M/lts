import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <>
      
      <Navbar />

      <Outlet />
    </>
  )
};

export default Layout;