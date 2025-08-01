import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setSignupData} from "../slice/authSlice"
import axios from 'axios'
import "../static/signup.css";
import { setIsloading } from "../slice/loderSlice";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const formRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    dispatch(setIsloading(true));
    try {
      const res = await axios.post("https://edtech-l9b9.onrender.com/api/getotp", {
        email: data.email,
      });
      
      if (res.data.success) {
        dispatch(setSignupData({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          password: data.password,
          conformpassword: data.confirmPassword,
          accounttype: data.role,
        }));
        
        navigate('/verifymail');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Error sending OTP: " + err.response?.data?.message);
    }finally{
      dispatch(setIsloading(false));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form" >
      <h2>Join the millions learning to code with EdTech for free</h2>
      <p>Build skills for today, tomorrow, and beyond.<br />
        <em>Education to future-proof your career.</em>
      </p>

      <div className="role-toggle">
        <label>
          <input type="radio" name="role" value="student" defaultChecked />
          Student
        </label>
        <label>
          <input type="radio" name="role" value="instructor" />
          Instructor
        </label>
      </div>

      <div className="input-group">
        <div>
          <label>First Name *</label>
          <input type="text" name="firstName" required placeholder="Enter first name" />
        </div>
        <div>
          <label>Last Name *</label>
          <input type="text" name="lastName" required placeholder="Enter last name" />
        </div>
      </div>

      <label>Email Address *</label>
      <input type="email" name="email" required placeholder="Enter email address" />

      <div className="input-group">
        <div>
          <label>Create Password *</label>
          <input type={showPassword ? "text" : "password"} name="password" required placeholder="Enter password" />
        </div>
        <div>
          <label>Confirm Password *</label>
          <input type={showPassword ? "text" : "password"} name="confirmPassword" required placeholder="Confirm password" />
        </div>
      </div>

      <div className="show-hide">
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button type="submit" className="submit-btn">Create Account</button>
    </form>
  );
}
