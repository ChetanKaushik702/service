import thunk from "redux-thunk";

import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    userReducer,

}from "./reducers/userReducer";
import { forgotPasswordReducer } from "./reducers/forgotPasswordReducer";
import {
    listingsReducer,
    listingDetailsReducer,
    myListingsReducer,
    newListingReducer,
} from "./reducers/listingReducer";

const reducer = combineReducers({
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    listings: listingsReducer,
    listingDetails: listingDetailsReducer,
    myListings: myListingsReducer,
    newListing: newListingReducer,
});

const middleware = [thunk];
const store = createStore(
    reducer,
    
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;