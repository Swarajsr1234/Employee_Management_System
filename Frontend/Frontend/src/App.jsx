
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Admin_DashBoard from './Pages/Admin_DashBoard'
import Employee_DashBoard from './Pages/Employee_DashBoard'

function App() {

  return (
    <>
      {/* <Login/> */}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path= "/register" element={<Register/>}/>
        <Route path="/admin-dashboard" element={<Admin_DashBoard/>}/>
        <Route path="/employee-dashboard" element={<Employee_DashBoard/>}/>
      </Routes>
    </>
  )
}

export default App
