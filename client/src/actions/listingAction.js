import {
    LISTING_LIST_REQUEST,
    LISTING_LIST_SUCCESS,
    LISTING_LIST_FAIL,
    LISTING_DETAIL_REQUEST,
    LISTING_DETAIL_SUCCESS,
    LISTING_DETAIL_FAIL,
    MY_LISTINGS_REQUEST,
    MY_LISTINGS_SUCCESS,
    MY_LISTINGS_FAIL,
    NEW_LISTING_REQUEST,
    NEW_LISTING_SUCCESS,
    NEW_LISTING_FAIL,
    UPDATE_LISTING_REQUEST,
    UPDATE_LISTING_SUCCESS,
    UPDATE_LISTING_FAIL,
    DELETE_LISTING_REQUEST,
    DELETE_LISTING_SUCCESS,
    DELETE_LISTING_FAIL,
    CLEAR_ERRORS,
} from "../constants/listingConstants";
import axios from "axios";

// browse/search listings
export const getListings = (queryString = "") => async (dispatch) => {
    try {
        dispatch({ type: LISTING_LIST_REQUEST });
        const { data } = await axios.get(`/api/v1/listings${queryString}`);
        dispatch({ type: LISTING_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LISTING_LIST_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

// single listing detail
export const getListingDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: LISTING_DETAIL_REQUEST });
        const { data } = await axios.get(`/api/v1/listings/${id}`);
        dispatch({ type: LISTING_DETAIL_SUCCESS, payload: data.listing });
    } catch (error) {
        dispatch({ type: LISTING_DETAIL_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

// professional's own listings
export const getMyListings = () => async (dispatch) => {
    try {
        dispatch({ type: MY_LISTINGS_REQUEST });
        const { data } = await axios.get(`/api/v1/listings/me/mine`);
        dispatch({ type: MY_LISTINGS_SUCCESS, payload: data.listings });
    } catch (error) {
        dispatch({ type: MY_LISTINGS_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

// create a listing
export const createListing = (listingData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_LISTING_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/listings`, listingData, config);
        dispatch({ type: NEW_LISTING_SUCCESS, payload: data.listing });
    } catch (error) {
        dispatch({ type: NEW_LISTING_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

// update a listing
export const updateListing = (id, listingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LISTING_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/listings/${id}`, listingData, config);
        dispatch({ type: UPDATE_LISTING_SUCCESS, payload: data.listing });
    } catch (error) {
        dispatch({ type: UPDATE_LISTING_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

// delete a listing
export const deleteListing = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LISTING_REQUEST });
        await axios.delete(`/api/v1/listings/${id}`);
        dispatch({ type: DELETE_LISTING_SUCCESS });
    } catch (error) {
        dispatch({ type: DELETE_LISTING_FAIL, payload: error.response?.data?.message || "Something went wrong. Please try again." });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
