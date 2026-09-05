import thunk from "redux-thunk";

import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    userReducer,

}from "./reducers/userReducer";
import { forgotPasswordReducer } from "./reducers/forgotPasswordReducer";

const reducer = combineReducers({
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
});

const middleware = [thunk];
const store = createStore(
    reducer,
    
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;