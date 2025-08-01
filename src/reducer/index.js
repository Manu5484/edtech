import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice';
import cartReducer from '../slice/cartSlice';
import loaderReducer from '../slice/loderSlice'
import tagReducer from '../slice/tagSlice'
import courseSlice from '../slice/courseSlice'
import courseBuilderReducer from '../slice/courseBuilderSlice';

const rootReducer=combineReducers({
  auth:authReducer,
  profile:profileReducer,
  cart:cartReducer,
  loader:loaderReducer,
  courses:courseSlice,
  tag:tagReducer,
  courseBuilder:courseBuilderReducer,
})

export default rootReducer;