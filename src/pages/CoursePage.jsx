import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setParticularcourse,
  setError,
  clearParticularcourse,
} from '../slice/courseSlice';
import '../static/coursepage.css';
import { setIsloading } from '../slice/loderSlice';
import Loader from '../components/Loader';

const CoursePage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.particularcourse);
  const error = useSelector((state) => state.courses.error);
  const  isLoading  = useSelector((state) => state.courses);

  useEffect(() => {
    const fetchCourse = async () => {
      dispatch(clearParticularcourse());
      dispatch(setIsloading(true));
      try {
        const response = await axios.get(`http://localhost:4000/api/particularcourse?courseId=${courseId}`);
        if (response.data.success) {
          dispatch(setParticularcourse(response.data.courseDetails));
        } else {
          dispatch(setError(response.data.message || "Failed to load course"));
        }
      } catch (err) {
        dispatch(setError(err.message || "Server error"));
      }finally
      {
        dispatch(setIsloading(false));
      }
     } ;

    fetchCourse();
  }, [courseId, dispatch]);

  if (error) return <div className="coursepage">❌ {error}</div>;
  if (!course) return <div className="coursepage">Loading...</div>;

  return (
    <div className='coursepagecontainer'>
      {/* { isLoading?<Loader/>: */}
      <div className="coursepage">
        {/* Existing JSX from earlier message to display the course */}
        <div className="coursepage-header">
          <div className="left">
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <div className="ratings">
              ⭐ {course.ratingAndReviews?.length || 0} reviews | {course.studentsEnrolled?.length || 0} students enrolled
            </div>
            <div className="meta">
              <span>Created By {course.educator?.firstname} {course.educator?.lastname}</span>
              <span>📅 {new Date(course.createdAt).toLocaleDateString()}</span>
              <span>🌐 English</span>
            </div>
          </div>

          <div className="right">
            <img src={course.thumbnailUrl} alt="Course" />
            <div className="price">₹ {course.price}</div>
            <button className="go-to-course">Buy now</button>
            <p className="guarantee">30-Day Money-Back Guarantee</p>
            <div className="includes">
              <strong>This Course Includes:</strong>
              <ul>
                {Array.isArray(course.tags)
                  ? course.tags.map(tag => (
                      <li key={tag._id || tag}>{tag.name || tag}</li>
                    ))
                  : <li>No tags available</li>}
              </ul>
              <button className="share-btn">🔗 Share</button>
            </div>
          </div>
        </div>

        <div className="learn-box">
          <h2>What you'll learn</h2>
          <p>{course.whatYouWillLearn}</p>
        </div>

        <div className="course-content">
          <h2>Course Content</h2>
          <p>
            {course.courseContent?.length || 0} sections •{" "}
            {course.courseContent?.reduce((acc, sec) => acc + sec.subsession.length, 0)} lectures
          </p>
          {course.courseContent?.map((section, i) => (
            <div className="section" key={i}>
              <strong>{section.sectionName}</strong>
              <ul>
                {section.subsession.map((sub, j) => (
                  <li key={j}>{sub.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* } */}
    </div>
  );
};

export default CoursePage;
