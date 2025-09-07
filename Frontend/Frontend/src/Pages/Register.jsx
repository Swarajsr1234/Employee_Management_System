import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from "axios";




const Register = ()=>{

    const navigate = useNavigate();

    const[formData , setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword : ""
    })

    const handleChange = (e)=>{
      setFormData({...formData , [e.target.id] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name , email , password , confirmPassword} = formData;

        if(password != confirmPassword)
        {
            console.log("Password do not match..");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register" , {name , email , password});

            console.log("Registration Successful..");
            setTimeout(()=>{
                navigate("/login");
            }, 1500);
            
        } catch (error) {
            console.log(error);
        }
    }



    return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="register-card shadow-lg p-5"
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.95))',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <h2 className="text-center fw-bold mb-4" style={{ color: '#3f72af' }}>Create Account 🚀</h2>

        <form onSubmit={handleSubmit}>
          {[
            { id: 'name', label: 'Full Name', icon: <FaUser />, type: 'text' },
            { id: 'email', label: 'Email address', icon: <FaEnvelope />, type: 'email' },
            { id: 'password', label: 'Password', icon: <FaLock />, type: 'password' },
            { id: 'confirmPassword', label: 'Confirm Password', icon: <FaLock />, type: 'password' },
          ].map(({ id, label, icon, type }) => (
            <div className="form-floating mb-4" key={id}>
              <input
                type={type}
                className="form-control input-custom"
                id={id}
                placeholder={label}
                value={formData[id]}
                onChange={handleChange}
                required
              />
              <label htmlFor={id}>
                {icon} <span className="ms-2">{label}</span>
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="btn w-100 fw-semibold register-btn"
          >
            Register
          </button>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-underline fw-semibold" style={{ color: '#112d4e' }}>
              Log In
            </Link>
          </p>
        </form>
      </div>

      {/* Custom styles */}
      <style>
        {`
          .register-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 40px rgba(63, 94, 251, 0.2);
            transition: all 0.4s ease-in-out;
          }

          .form-control.input-custom {
            border-radius: 12px;
            background-color: #ffffffcc;
            border: 1px solid #ddd;
          }

          .form-control:focus {
            border-color: #3f5efb;
            box-shadow: 0 0 0 0.2rem rgba(63, 94, 251, 0.25);
          }

          .register-btn {
            padding: 10px 0;
            background: linear-gradient(to right, #fc466b, #3f5efb);
            color: #fff;
            border-radius: 50px;
            border: none;
            font-size: 16px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .register-btn:hover {
            transform: scale(1.03);
            box-shadow: 0 4px 20px rgba(63, 94, 251, 0.4);
          }
        `}
      </style>
      {/* <ToastContainer position="top-right" /> */}
    </div>
  );

}

export default Register;