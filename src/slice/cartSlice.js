import {createSlice} from '@reduxjs/toolkit'

const initialState={
  totalItems:localStorage.getItem("totalitems")?JSON.parse(localStorage.getItem("totalitems")):0,
}

const cartSlice=createSlice({
  name:"cart",
  initialState,
  reducers:{
    setTotalItems:(state,value)=>{
      state.totalItems=value.playload
    },
  }
})

export const {setTotalItems}=cartSlice.actions;
export default cartSlice.reducer;