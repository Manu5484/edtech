import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseData: {
    name: "",
    description: "",
    whatYouWillLearn: "",
    price: "",
    tags: "",
    thumbnailImage: null,
  },
  createdCourse: null,
  sessionName: "",
  sessions: [],
  subsessionData: {
    title: "",
    timeDuration: "",
    description: "",
    videoFile: null,
    sessionId: "",
  },
};

const courseBuilderSlice = createSlice({
  name: 'courseBuilder',
  initialState,
  reducers: {
    setCourseData(state, action) {
      state.courseData = { ...state.courseData, ...action.payload };
    },
    setCreatedCourse(state, action) {
      state.createdCourse = action.payload;
    },
    setSessionName(state, action) {
      state.sessionName = action.payload;
    },
    setSessions(state, action) {
      state.sessions = action.payload;
    },
    setSubsessionData(state, action) {
      state.subsessionData = { ...state.subsessionData, ...action.payload };
    },
    resetSubsessionData(state) {
      state.subsessionData = {
        title: "",
        timeDuration: "",
        description: "",
        videoFile: null,
        sessionId: "",
      };
    },
  },
});

export const {
  setCourseData,
  setCreatedCourse,
  setSessionName,
  setSessions,
  setSubsessionData,
  resetSubsessionData,
} = courseBuilderSlice.actions;

export default courseBuilderSlice.reducer;
