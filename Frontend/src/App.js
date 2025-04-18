import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Main from "./pages/Main";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Readpost from "./pages/Readpost";
import LoginPage from "./pages/Login";
import Pagenotfound from "./pages/Pagenotfound";
import Emailverification from "./pages/Emailverification";
import VerifyEmail from "./pages/VerifyEmail";
import SavePage from "./pages/SavePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import SpinnerLogic from "./utils/SpinnerLogic";

function App() {
  const user = useSelector((state) => state.User);
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route
        path="/Login"
        element={
          !user?.isLoggedin ? (
            <LoginPage />
          ) : (
            <Navigate replace to="/Main"></Navigate>
          )
        }
      ></Route>
      <Route
        path="/Main"
        element={
          <ProtectedRoute>
            <SpinnerLogic>
              <Main />
            </SpinnerLogic>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/Post"
        element={
          <ProtectedRoute>
            <SpinnerLogic>
              <Post />
            </SpinnerLogic>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/Profile/:id"
        element={
          <ProtectedRoute>
            <SpinnerLogic>
              <Profile />
            </SpinnerLogic>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/Readpost/:id"
        element={
          <ProtectedRoute>
            <SpinnerLogic>
              <Readpost />
            </SpinnerLogic>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/SavePosts"
        element={
          <ProtectedRoute>
            <SpinnerLogic>
              <SavePage />
            </SpinnerLogic>
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/:id/verify/:token" element={<Emailverification />}></Route>
      <Route path="/VerifyPage" element={<VerifyEmail />}></Route>
      <Route path="*" element={<Pagenotfound />}></Route>
    </Routes>
  );
}

export default App;
