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

export const listingsReducer = (state = { listings: [] }, action) => {
    switch (action.type) {
        case LISTING_LIST_REQUEST:
            return { ...state, loading: true, listings: [] };
        case LISTING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                listings: action.payload.listings,
                total: action.payload.total,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case LISTING_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const listingDetailsReducer = (state = { listing: {} }, action) => {
    switch (action.type) {
        case LISTING_DETAIL_REQUEST:
            return { ...state, loading: true };
        case LISTING_DETAIL_SUCCESS:
            return { ...state, loading: false, listing: action.payload };
        case LISTING_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const myListingsReducer = (state = { listings: [] }, action) => {
    switch (action.type) {
        case MY_LISTINGS_REQUEST:
            return { ...state, loading: true, listings: [] };
        case MY_LISTINGS_SUCCESS:
            return { ...state, loading: false, listings: action.payload };
        case MY_LISTINGS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const newListingReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_LISTING_REQUEST:
        case UPDATE_LISTING_REQUEST:
        case DELETE_LISTING_REQUEST:
            return { ...state, loading: true };
        case NEW_LISTING_SUCCESS:
            return { ...state, loading: false, success: true, listing: action.payload };
        case UPDATE_LISTING_SUCCESS:
            return { ...state, loading: false, isUpdated: true, listing: action.payload };
        case DELETE_LISTING_SUCCESS:
            return { ...state, loading: false, isDeleted: true };
        case NEW_LISTING_FAIL:
        case UPDATE_LISTING_FAIL:
        case DELETE_LISTING_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null, success: false, isUpdated: false, isDeleted: false };
        default:
            return state;
    }
};
