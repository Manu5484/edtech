import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import CourseCatalog from './pages/CourseCatalog'; 
import { Home } from './pages/Home';
import { Main } from './components/Main';
import Header from './components/Header';
import LoginForm from './components/Login';
import { Signuppage } from './pages/Signuppage';
import { About } from './pages/About';
import Contactus from './pages/Contactus';
import VerifyMail from './components/VerifyMail';
import { Dashboard } from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import { logout, setToken } from "./slice/authSlice";
import { setProfile } from "./slice/profileSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("token"));

    if (localToken) {
      dispatch(setToken(localToken));

      axios.get("http://localhost:4000/api/alluserdata", {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(setProfile(res.data.userdetails));
        } else {
          console.error("Failed to fetch profile");
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("Profile fetch error", err);
        dispatch(logout());
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiresIn = decoded.exp * 1000 - Date.now();

        if (expiresIn <= 0) {
          dispatch(logout());
          navigate("/login");
        } else {
          const timeout = setTimeout(() => {
            dispatch(logout());
            navigate("/login");
          }, expiresIn);

          return () => clearTimeout(timeout);
        }
      } catch (e) {
        dispatch(logout());
        navigate("/login");
      }
    }
  }, [token, dispatch, navigate]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />}>
          <Route index element={<Home />} />
          <Route path='/signup' element={<Signuppage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/catalog/:tagId' element={<CourseCatalog />} />
          <Route path='/verifymail' element={<VerifyMail />} />
          <Route path='/aboutus' element={<About />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
