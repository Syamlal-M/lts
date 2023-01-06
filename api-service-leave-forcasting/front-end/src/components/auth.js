import { createContext, useContext, useMemo, useState } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    // const navigate = useNavigate();
    const [userData, setUserData] =useState(null);
    const [user, setUser] = useState(null);
    
    
    const login = (userDetails) =>{
        console.log(JSON.stringify(userDetails))
        console.log("hi " + userDetails.empId)
        //Backend communication - login
        var requestOptions = {
            method: 'GET'

        };
        var roleName = null;
        fetch("api/user/login?userid="+userDetails.empId+"&password="+userDetails.password, requestOptions)
            .then(async result => {
             const names=   await result.json();
            
             console.log(names.role);
            
                if(!result.ok)
                {
                    
                    
                    console.log("Login Failure");
                    alert("Login failure");
                }
                else
                {
                    console.log("username "+names.username); 
                    console.log("userid" +names.userId );
                    
                    Object.keys(names.role).map((type) => {
                        console.log("type id .. "+type)
                         roleName = type;
                       
                    })
                    const userdeta = {
                        "empId": names.userId,
                        "password": "",
                        "role": roleName,
                        "name": names.username
                    };
                    cookies.set('role', userdeta.role);
                    
                    setUserData(userdeta);
                    // console.log("setUserData :: "+userData.role);
                    console.log("Login success")
                //    console.log("user .. "+user.empId + " role .. "+user.role);
                    // setUser(user);
                    // navigate("/home");  
                    //alert("Login success");
                    // localStorage.setItem("authenticated", true);
                    
                    
                    
                }
            })
            .catch(error => console.log(error));
            // console.log("user .. "+user.empId + " role .. "+user.role);
            // setUser(userdeta);
            // console.log("userData  "+userData.empId);
            // console.log("userdata :: "+setUser.role);
        setUser(userData);
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
        console.log("useAuth"); 
        return useContext(AuthContext);
    }



