import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_SUCCESS,
    CLEAR_ERRORS,
}from "../constants/userConstants";

export const userReducer = (state = {user:null, isAuthenticated:false, loading:true},action) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user:action.payload,
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                user:action.payload,
            };
        case LOAD_USER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            };
        case LOGOUT_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
            };
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
                return {
                  ...state,
                  error: null,
                };
            default:
                return  state;
    }
};
