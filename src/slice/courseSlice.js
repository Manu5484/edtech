import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  error: null,
  particularcourse:null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setParticularcourse: (state, action) => {
      state.particularcourse = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCourses: (state) => {
      state.courses = [];
      state.error = null;
    },
    clearParticularcourse: (state) => {
      state.particularcourse = null;
    },
  },
});

export const { setCourses, setError, clearCourses,setParticularcourse , clearParticularcourse } = courseSlice.actions;
export default courseSlice.reducer;
