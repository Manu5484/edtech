import {createSlice} from '@reduxjs/toolkit'

const initialState={
  profile:null,
}

const profileSlice=createSlice({
  name:"profile",
  initialState,
  reducers:{
    setProfile:(state,value)=>{
      state.token=value.playload
    },
  }
})

export const {setProfile}=profileSlice.actions;
export default profileSlice.reducer;