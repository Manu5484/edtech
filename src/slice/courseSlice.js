import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCourses: (state) => {
      state.courses = [];
      state.error = null;
    },
  },
});

export const { setCourses, setError, clearCourses } = courseSlice.actions;
export default courseSlice.reducer;
