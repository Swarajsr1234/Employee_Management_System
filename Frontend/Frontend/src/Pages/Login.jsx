
import axios from 'axios';
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = ()=>{

    const navigate = useNavigate();
    const[formData , setFormData] = useState({
        email : "",
        password : ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData , 
            [e.target.id]:e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:5000/api/auth/login" , formData);
            const token = response.data.token;
            const decodetoken = jwtDecode(token);
            const role = decodetoken.role;
            console.log("decoded role" , role);
            console.log(response);
            console.log("Login Success..");
            localStorage.setItem("token" , token);
            localStorage.setItem("role" , role);

            if(role === "admin")
            {
                navigate("/admin-dashboard")
            } else if(role === "employee")
            {
                navigate("/employee-dashboard")
            }else{
                navigate("/");
            }

        } catch (error) {
            console.log(error);
        }
    }



    return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="shadow login-card p-4 p-md-5"
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.95))',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.4s ease-in-out',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
        }}
      >
        <h2 className="text-center fw-bold mb-4" style={{ color: '#3f72af' }}>
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={{
                borderRadius: '12px',
                backgroundColor: '#ffffffcc',
                border: '1px solid #ddd',
              }}
            />
            <label htmlFor="email">
              <FaEnvelope className="me-2" /> Email
            </label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={{
                borderRadius: '12px',
                backgroundColor: '#ffffffcc',
                border: '1px solid #ddd',
              }}
            />
            <label htmlFor="password">
              <FaLock className="me-2" /> Password
            </label>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{
              padding: '10px 0',
              background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
              color: '#fff',
              borderRadius: '50px',
              border: 'none',
              fontSize: '16px',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.03)';
              e.target.style.boxShadow = '0 4px 20px rgba(74, 0, 224, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Log In
          </button>

          <p className="text-center mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="text-decoration-underline fw-semibold" style={{ color: '#112d4e' }}>
              Register
            </Link>
          </p>
        </form>
      </div>

      <style>
        {`
          .login-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 40px rgba(74, 0, 224, 0.2);
          }

          .form-control:focus {
            border-color: #8e2de2;
            box-shadow: 0 0 0 0.2rem rgba(142, 45, 226, 0.25);
          }

          .form-control::placeholder {
            color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
      {/* <ToastContainer position="top-right" /> */}
    </div>
  );
}

export default Login;