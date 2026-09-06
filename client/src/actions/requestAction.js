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
import axios from "axios";

export const createRequest = (listingId, message) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REQUEST_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.post(`/api/v1/requests`, { listingId, message }, config);
        dispatch({ type: CREATE_REQUEST_SUCCESS });
    } catch (error) {
        dispatch({ type: CREATE_REQUEST_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

export const getSentRequests = () => async (dispatch) => {
    try {
        dispatch({ type: SENT_REQUESTS_REQUEST });
        const { data } = await axios.get(`/api/v1/requests/me/sent`);
        dispatch({ type: SENT_REQUESTS_SUCCESS, payload: data.requests });
    } catch (error) {
        dispatch({ type: SENT_REQUESTS_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

export const getReceivedRequests = () => async (dispatch) => {
    try {
        dispatch({ type: RECEIVED_REQUESTS_REQUEST });
        const { data } = await axios.get(`/api/v1/requests/me/received`);
        dispatch({ type: RECEIVED_REQUESTS_SUCCESS, payload: data.requests });
    } catch (error) {
        dispatch({ type: RECEIVED_REQUESTS_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

export const updateRequestStatus = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REQUEST_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/requests/${id}`, { status }, config);
        dispatch({ type: UPDATE_REQUEST_SUCCESS, payload: data.request });
    } catch (error) {
        dispatch({ type: UPDATE_REQUEST_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
