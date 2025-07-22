import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../static/login.css'
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import { setIsloading } from "../slice/loderSlice";
import {setToken} from '../slice/authSlice'
import {useNavigate} from 'react-router-dom'
import Loader from "./Loader";

export default function LoginForm() {
  const dispatch=useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);
  const isloading=useSelector((state)=>state.loader.isloading)
  const navigate=useNavigate(); 

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    dispatch(setIsloading(false));
    try{
      const res = await axios.post("http://localhost:4000/api/login", {
                  email: data.email,
                  password: data.password,
                },{
                  withCredentials: true
                });
      if (res.data.success) {
        dispatch(setToken(res.data.token));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/dashboard");
      }
    }catch(err)
    {
      alert("Error in login: " + err.response?.data?.message);
    }finally
    {
      dispatch(setIsloading(false));
    }

    console.log("Login Data:", data);
    formRef.current.reset();
  }

  return (
    <div>
      {isloading?<Loader/>:
      <form onSubmit={handleLoginSubmit} className="login-form" ref={formRef}>
        <h2>Welcome back to StudyNotion</h2>
        <p>Enter your credentials to access your account.</p>

        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter email address"
        />

        <label>Password *</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          required
          placeholder="Enter password"
        />

        <div className="login-options">
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <a href="https://google.com" className="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
      }
    </div>
  );
}
