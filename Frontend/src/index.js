import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { posts } from "./Reducers/PostReducers";
import { User } from "./Reducers/UserReducers";
const store = configureStore({ reducer: { posts, User }, devTools: true });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App className="font-Poppins" />
    </Provider>
  </BrowserRouter>
);
