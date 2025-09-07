import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Admin_DashBoard = ()=>{

    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if(!token || role != "admin")
        {
            navigate("/login")
        }
    } , [])


    return(
        <>
        <div>
            <h2>Welcome to Admin DashBoard...</h2>
        </div>
        </>
    )
}

export default Admin_DashBoard;