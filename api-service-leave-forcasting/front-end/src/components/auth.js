import { createContext, useContext, useMemo, useState } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = async (userDetails) => {
        console.log(JSON.stringify(userDetails))
        console.log("hi " + userDetails.empId)
        //Backend communication - login
        var requestOptions = {
            method: 'GET'

        };
        var roleName = null;
        await fetch("api/user/login?userid=" + userDetails.empId + "&password=" + userDetails.password, requestOptions)
            .then(async (result) => {
                const names = await result.json();

                console.log(names.role);

                if (!result.ok) {
                    console.log("Login Failure");
                    alert("Login failure");
                }
                else {

                    setLoggedIn(true);
                    Object.keys(names.role).map((type) => {
                        console.log("type id .. " + type)
                        roleName = type;

                    })
                    const userdeta = {
                        "empId": names.userId,
                        "password": "",
                        "role": roleName,
                        "name": names.username
                    };
                    cookies.set('role', userdeta.role);
                    setUser(userdeta);

                }
            })
            .catch(error => console.log(error));

    }

    const logout = () => {

        setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}



