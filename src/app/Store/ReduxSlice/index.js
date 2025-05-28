import { combineReducers } from "redux";


import modalReducer from "./modalSlice";
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'
import profileReducer from './updateProfileSlice'
import jobsReducer from './jobsSlice'
import postsReducer from './postSlice'
import loginReducer from './loginSlice'



export default combineReducers({

    modal: modalReducer,
    auth: authReducer,
    categories: categoriesReducer,
     updaterofile: profileReducer,
     jobs: jobsReducer,
     posts: postsReducer,
     login: loginReducer,
})