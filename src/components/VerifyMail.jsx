import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {clearSignupData} from "../slice/authSlice"

import '../static/verifymail.css';
import axios from 'axios'

import { NavLink} from 'react-router-dom'
import { setIsloading } from '../slice/loderSlice';
import Loader from './Loader';

const VerifyMail = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signupData = useSelector((state) => state.auth.signupData);
  const isloading =useSelector((state)=>state.loader.isloading)
  console.log("signup data is ",signupData);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  const handleSubmit = async() => {
    const finialotp=otp.join('')
    // alert('Verifying OTP: ' + finialotp);
    if (!signupData) {
      alert("No signup data found.");
      return;
    }
    dispatch(setIsloading(true));
    try {
      const res = await axios.post("https://edtech-l9b9.onrender.com/api/signup", {
        ...signupData,
        otp: finialotp,
      });

      if (res.data.success) {
        alert("Signup successful!");
        dispatch(clearSignupData());
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Signup error: " + err.response?.data?.message);
    }finally{
      dispatch(setIsloading(false));
    }
  };

  return (
    <div className='verifymailpage'>
      {isloading?<Loader/>:
      <div className="otp-container">
        <h2>Verify Email</h2>
        <p>A verification code has been sent to you. Enter the code below</p>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <button className="verify-btn" onClick={handleSubmit}>Verify Email</button>
        <div className="footer-links">
          <NavLink to={'/signup'}>← Back To Signup</NavLink>
          <NavLink to={'/signup'}>↻ Resend it</NavLink>
        </div>
      </div>
      }
    </div>
    
  );
};

export default VerifyMail;
