import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <Provider store={store}>
    <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
    <App />
  </Provider>,
  document.getElementById("root")
);
