import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCourses,
  setError,
  clearCourses,
} from "../slice/courseSlice";
import { setIsloading } from "../slice/loderSlice";
import Loader from "../components/Loader";
import { Coursecatalogcomp } from "../components/catalogpage/Coursecatalogcomp";

const CourseCatalog = () => {
  const { tagId } = useParams();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setIsloading(true));
      dispatch(clearCourses());
  
      try {
        const res = await axios.get(`http://localhost:4000/api/tagpage?tagId=${tagId}`);
        console.log(res.data); 
  
        if (res.data.success) {
          dispatch(setCourses(res.data.coursedetails));
        } else {
          dispatch(setError(res.data.message || "Failed to fetch courses"));
        }
      } catch (err) {
        dispatch(setError(err.response?.data?.message || "Server error"));
      } finally {
        dispatch(setIsloading(false));
      }
    };
  
    if (tagId) fetchCourses();
  }, [tagId, dispatch]);
  

  return (
    <div className="coursecatalog-page">
      {isLoading ? <Loader /> : <Coursecatalogcomp />}
    </div>
  );
};

export default CourseCatalog;
