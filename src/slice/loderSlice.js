import {createSlice} from '@reduxjs/toolkit'

const initialState={
  isloading:false,
}

const loaderSlice=createSlice({
  name:"loader",
  initialState,
  reducers:{
    setIsloading(state, action) {
      state.isloading = action.payload; 
    }
  }
})

export const {setIsloading}=loaderSlice.actions;
export default loaderSlice.reducer;