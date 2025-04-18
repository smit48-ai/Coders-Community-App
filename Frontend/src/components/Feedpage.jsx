import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Actions/Posts";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

//TODO: sort the posts by latest
function Feedpage() {
  const dispatch = useDispatch();
  const allposts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    //TODO: Future Implementation of Recommended Posts
    <div className="mx-0 lg:min-w-[650px] min-w-screen">
      <div className=" mx-0">
        {allposts ? (
          allposts?.map((x) => {
            return <Card key={x._id} post={x} />;
          })
        ) : (
          <CircularProgress style={{ color: "black" }}></CircularProgress>
        )}
      </div>
    </div>
  );
}

export default Feedpage;
