import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar";
import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

export const Layout = () => {

    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" />;
    }

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