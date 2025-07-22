import { createSlice } from '@reduxjs/toolkit';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tagName: null,
  },
  reducers: {
    setTagName: (state, action) => {
      state.tagName = action.payload;
    },
    clearTagName: (state) => {
      state.tagName = null;
    },
  },
});

export const { setTagName, clearTagName } = tagSlice.actions;
export default tagSlice.reducer;
