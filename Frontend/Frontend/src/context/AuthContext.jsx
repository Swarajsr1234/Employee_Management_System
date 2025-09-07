import { useState } from "react";


const AuthContext = ()=>{
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    const [role , setRole] = useState(null);
    const [token , setToken] = useState(null);

}

export default AuthContext;
