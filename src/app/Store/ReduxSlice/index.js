import { combineReducers } from "redux";


import modalReducer from "./modalSlice";



export default combineReducers({

    modal: modalReducer,
})