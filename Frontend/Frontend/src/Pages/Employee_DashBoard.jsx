import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Employee_DashBoard = ()=>{

    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role"); 

        if(!token || role != "employee")
        {
            navigate("/login");
        }
    } , [])
    return(
        <>
        <div>
            <h2>Welcome  to Employee DashBoard...</h2>
        </div>
        </>
    )
}

export default Employee_DashBoard;