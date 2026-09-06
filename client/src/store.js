import thunk from "redux-thunk";

import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    userReducer,

}from "./reducers/userReducer";
import { forgotPasswordReducer } from "./reducers/forgotPasswordReducer";
import { profileReducer } from "./reducers/profileReducer";
import {
    listingsReducer,
    listingDetailsReducer,
    myListingsReducer,
    newListingReducer,
} from "./reducers/listingReducer";
import {
    newRequestReducer,
    sentRequestsReducer,
    receivedRequestsReducer,
    updateRequestReducer,
} from "./reducers/requestReducer";

const reducer = combineReducers({
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    profile: profileReducer,
    listings: listingsReducer,
    listingDetails: listingDetailsReducer,
    myListings: myListingsReducer,
    newListing: newListingReducer,
    newRequest: newRequestReducer,
    sentRequests: sentRequestsReducer,
    receivedRequests: receivedRequestsReducer,
    updateRequest: updateRequestReducer,
});

const middleware = [thunk];
const store = createStore(
    reducer,
    
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;