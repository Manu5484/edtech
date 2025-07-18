import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice';
import cartReducer from '../slice/cartSlice';
import loaderReducer from '../slice/loderSlice'

const rootReducer=combineReducers({
  auth:authReducer,
  profile:profileReducer,
  cart:cartReducer,
  loader:loaderReducer
})

export default rootReducer;