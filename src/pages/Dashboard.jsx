import React, { useEffect, useState } from "react";
import axios from "axios";
import "../static/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, clearProfile } from "../slice/profileSlice";
import { logout } from "../slice/authSlice";

export function Dashboard() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ gender: "", dob: "", mobile: "", about: "" });
  const token = useSelector((state) => state.auth.token);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://edtech-l9b9.onrender.com/api/alluserdata", {  headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
       });
        if (res.data.success) {
          dispatch(setProfile(res.data.userdetails));
          setFormData(res.data.userdetails.profiledata);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSave = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token")); // or use Redux state
        const res = await axios.put(
          "https://edtech-l9b9.onrender.com/api/updateprofile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
    
        if (res.data.success) {
          dispatch(setProfile({
            ...profile,
            profiledata: res.data.updatedProfileDetails,
          }));
          setEditMode(false);
        }
      } catch (err) {
        console.error("Error updating profile:", err);
      }
    };
    
    

  const handleDelete = async () => {
    try {
      await axios.delete("https://edtech-l9b9.onrender.com/api/deleteaccount", {  headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
     });
      dispatch(clearProfile());
      dispatch(logout());
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!profile) return <div className="dashboard">Loading...</div>;

  const { firstname, lastname, email, userimage, accounttype } = profile;

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>

      <div className="profile-card">
        <img className="avatar" src={userimage} alt="User" />
        <div className="profile-info">
          <h3>{firstname} {lastname}</h3>
          <p><b>Email:</b> {email}</p>
          <p><b>Account Type:</b> {accounttype}</p>
        </div>
      </div>

      <div className="info-section">
        <h3>Personal Details</h3>

        <div className="info-grid">
          <div className="info-field">
            <label>Gender:</label>
            {editMode ? (
              <input name="gender" value={formData.gender||""} onChange={handleChange} />
            ) : (
              <span>{formData.gender || "Not provided"}</span>
            )}
          </div>

          <div className="info-field">
            <label>Date of Birth:</label>
            {editMode ? (
              <input type="date" name="dob" value={formData.dob||""} onChange={handleChange} />
            ) : (
              <span>{formData.dob || "Not provided"}</span>
            )}
          </div>

          <div className="info-field">
            <label>Mobile:</label>
            {editMode ? (
              <input name="mobile" value={formData.mobile||""} onChange={handleChange} />
            ) : (
              <span>{formData.mobile || "Not provided"}</span>
            )}
          </div>

          <div className="info-field">
            <label>About:</label>
            {editMode ? (
              <textarea name="about" value={formData.about||""} onChange={handleChange} />
            ) : (
              <span>{formData.about || "Not provided"}</span>
            )}
          </div>
        </div>

        <div className="edit-buttons">
          {editMode ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-btn" onClick={handleEditToggle}>Edit Profile</button>
          )}
        </div>
      </div>

      <div className="actions">
        <button className="logout" onClick={handleLogout}>Logout</button>
        <button className="delete" onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
}
