import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setCourseData,
  setCreatedCourse,
  setSessionName,
  setSessions,
  setSubsessionData,
  resetSubsessionData,
} from "../slice/courseBuilderSlice";
import "../static/coursebuilder.css";

export function CourseBuilder() {
  const dispatch = useDispatch();
  const [step, setStep] = useState("course");

  const {
    courseData,
    createdCourse,
    sessionName,
    sessions,
    subsessionData,
  } = useSelector((state) => state.courseBuilder);

  const handleCourseInput = (e) => {
    const { name, value, files } = e.target;
    dispatch(setCourseData({ [name]: files ? files[0] : value }));
  };

  const handleCreateCourse = async () => {
    try {
      const formData = new FormData();
      for (let key in courseData) {
        formData.append(key, courseData[key]);
      }

      const res = await axios.post("https://edtech-l9b9.onrender.com/api/createcourse", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        dispatch(setCreatedCourse(res.data.course));
        setStep("session");
      }
    } catch (error) {
      console.error("Course creation failed", error);
    }
  };

  const handleCreateSession = async () => {
    try {
      const res = await axios.post(
        "https://edtech-l9b9.onrender.com/api/createsession",
        {
          name: sessionName,
          courseId: createdCourse._id,
        },
        { withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        dispatch(setSessions(res.data.coursedetails.courseContent));
        setStep("subsession");
        dispatch(setSessionName(""));
      }
    } catch (error) {
      console.error("Session creation failed", error);
    }
  };

  const handleSubsessionInput = (e) => {
    const { name, value, files } = e.target;
    dispatch(setSubsessionData({ [name]: files ? files[0] : value }));
  };

  const handleCreateSubsession = async () => {
    try {
      const formData = new FormData();
      for (let key in subsessionData) {
        formData.append(key, subsessionData[key]);
      }

      const res = await axios.post("https://edtech-l9b9.onrender.com/api/createsubsession", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        });

      if (res.data.success) {
        alert("Subsession created!");
        dispatch(resetSubsessionData());
      }
    } catch (error) {
      console.error("Subsession creation failed", error);
    }
  };

  return (
    <div className="builder-container">
      <h2>Educator Course Builder</h2>

      {step === "course" && (
        <div className="form-section">
          <h3>Create Course</h3>
          <input type="text" name="name" placeholder="Course Name" onChange={handleCourseInput} />
          <textarea name="description" placeholder="Description" onChange={handleCourseInput} />
          <textarea name="whatYouWillLearn" placeholder="What you'll learn" onChange={handleCourseInput} />
          <input type="number" name="price" placeholder="Price" onChange={handleCourseInput} />
          <input type="text" name="tags" placeholder="Tag" onChange={handleCourseInput} />
          <input type="file" name="thumbnailImage" accept="image/*" onChange={handleCourseInput} />
          <button className="createcourse-button" onClick={handleCreateCourse}>Create Course</button>
        </div>
      )}

      {step === "session" && (
        <div className="form-section">
          <h3>Create Session</h3>
          <input type="text" value={sessionName} placeholder="Session Name" onChange={(e) => dispatch(setSessionName(e.target.value))} />
          <button className="createcourse-button" onClick={handleCreateSession}>Add Session</button>

          <ul>
            {sessions.map((s) => (
              <li key={s._id}>{s.name}</li>
            ))}
          </ul>
        </div>
      )}

      {step === "subsession" && (
        <div className="form-section">
          <h3>Create Subsession</h3>
          <input type="text" name="title" placeholder="Title" onChange={handleSubsessionInput} />
          <input type="text" name="timeDuration" placeholder="Time Duration" onChange={handleSubsessionInput} />
          <textarea name="description" placeholder="Description" onChange={handleSubsessionInput} />
          <select name="sessionId" onChange={handleSubsessionInput}>
            <option value="">Select Session</option>
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
          <input type="file" name="videoFile" accept="video/*" onChange={handleSubsessionInput} />
          <button className="createcourse-button" onClick={handleCreateSubsession}>Upload Subsession</button>
        </div>
      )}
    </div>
  );
}
