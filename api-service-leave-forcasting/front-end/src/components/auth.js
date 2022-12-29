import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null);
    const login = (userDetails) =>{
        console.log(JSON.stringify(userDetails))
        console.log("hi " + userDetails.empId)
        //Backend communication - login
        setUser(userDetails);
    }

    const logout = () =>{

        setUser(null);
    }

    return (
    <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )}

    export const useAuth = () =>{
        return useContext(AuthContext);
    }



