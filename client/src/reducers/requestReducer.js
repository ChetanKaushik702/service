import {
    CREATE_REQUEST_REQUEST,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_FAIL,
    SENT_REQUESTS_REQUEST,
    SENT_REQUESTS_SUCCESS,
    SENT_REQUESTS_FAIL,
    RECEIVED_REQUESTS_REQUEST,
    RECEIVED_REQUESTS_SUCCESS,
    RECEIVED_REQUESTS_FAIL,
    UPDATE_REQUEST_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_FAIL,
    CLEAR_ERRORS,
} from "../constants/requestConstants";

export const newRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REQUEST_REQUEST:
            return { ...state, loading: true, success: false };
        case CREATE_REQUEST_SUCCESS:
            return { ...state, loading: false, success: true };
        case CREATE_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null, success: false };
        default:
            return state;
    }
};

export const sentRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case SENT_REQUESTS_REQUEST:
            return { ...state, loading: true, requests: [] };
        case SENT_REQUESTS_SUCCESS:
            return { ...state, loading: false, requests: action.payload };
        case SENT_REQUESTS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const receivedRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case RECEIVED_REQUESTS_REQUEST:
            return { ...state, loading: true, requests: [] };
        case RECEIVED_REQUESTS_SUCCESS:
            return { ...state, loading: false, requests: action.payload };
        case RECEIVED_REQUESTS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_REQUEST_SUCCESS:
            return {
                ...state,
                requests: state.requests.map((r) =>
                    r._id === action.payload._id ? action.payload : r
                ),
            };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const updateRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_REQUEST_REQUEST:
            return { ...state, loading: true };
        case UPDATE_REQUEST_SUCCESS:
            return { ...state, loading: false };
        case UPDATE_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};
