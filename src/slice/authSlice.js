import {createSlice} from '@reduxjs/toolkit'

const initialState={
  token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
  signupData: null, 
}

const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    setToken:(state,value)=>{
      state.token=value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    clearSignupData(state) {
      state.signupData = null;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    }
  }
})

export const {setToken,setSignupData,clearSignupData,logout}=authSlice.actions;
export default authSlice.reducer;