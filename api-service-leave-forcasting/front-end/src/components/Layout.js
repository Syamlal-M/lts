import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar";

export const Layout = () => {
  return (
    <>
      
      <Navbar />

      <Outlet />
    </>
  )
};


export const LoginLayout = () => {
    return (
      <>
        <Outlet />
      </>
    )
  };
export default Layout;