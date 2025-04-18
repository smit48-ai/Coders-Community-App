import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Card from "../components/Card";
import { getPosts } from "../Actions/Posts";
import Footer from "../components/Footer";
import SimpleNavBar from "../components/SimpleNavBar";

const SavePage = () => {
  const allposts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [SavedPost, SetSavedPosts] = useState([]);
  const CurrentUser = useSelector((state) => state.User.userdata);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  useEffect(() => {
    if (allposts) {
      const newSavedPosts = allposts?.filter((post) =>
        post.Saves.includes(CurrentUser?._id)
      );
      SetSavedPosts(newSavedPosts);
    }
  }, [allposts, CurrentUser]);

  return (
    <div className="min-h-screen bg-slate-200">
      <SimpleNavBar location="Your Collection" />
      <div className="flex justify-center mt-3 min-h-screen">
        <div className="flex flex-col">
          {SavedPost.map((x) => {
            return (
              <div>
                <Card key={x._id} post={x}></Card>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavePage;
