import React from "react";
import Postform from "../components/Postform";
import MainNavBar from "../components/MainNavbar";
import { useNavigate } from "react-router-dom";
import SimpleNavBar from "../components/SimpleNavBar";
import Footer from "../components/Footer";

function Post() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-200 min-h-screen ">
      <SimpleNavBar location={"Create Post"} />
      <Postform></Postform>
      <Footer />
    </div>
  );
}

export default Post;
