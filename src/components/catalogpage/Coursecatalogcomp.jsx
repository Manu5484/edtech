import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../static/CourseCatalog.css";
import {NavLink} from 'react-router-dom';

export const Coursecatalogcomp = () => {
  const { tagId } = useParams();
  const { courses } = useSelector((state) => state.courses);

  const { tagName } = useSelector((state) => state.tag); 

  return (
    <div className="catalog-container">
      <div className="breadcrumb">
        Home / Catalog / <span>{tagName || tagId}</span>
      </div>

      <h1 className="title">{tagName || tagId}</h1>
      <p className="subtitle">Explore courses to get you started</p>

      <div className="tabs">
        <span className="active">Most Popular</span>
        <span>New</span>
      </div>

      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="course-card" key={course._id}>
              <NavLink to={`/course/${course._id}`}>
                <img
                  className="thumbnail"
                  src={course.thumbnailUrl}
                  alt="course thumbnail"
                />
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>⭐ {course.ratingAndReviews?.averageRating || "4.5"}</span>
                  <span>₹ {course.price}</span>
                </div>
              </NavLink>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};