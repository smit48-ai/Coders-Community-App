import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, getCurrentUser, TopFollowed } from "../Actions/user";
import { getPosts } from "../Actions/Posts";
import isAuthenticated from "./isAuthenticated";

const SpinnerLogic = ({ children }) => {
  console.log("Spinner Logic");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    if (isAuthenticated()) {
      setInterval(() => {
        console.log("Polling for new data");
        dispatch(getCurrentUser());
        dispatch(getPosts());
        dispatch(getAllUsers());
        dispatch(TopFollowed());
      }, 10000);
    }
  }, [dispatch]);
  if (user.userdata && posts) {
    return children;
  } else return <Spinner />;
};

export default SpinnerLogic;
