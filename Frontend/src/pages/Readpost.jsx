import React, { useEffect, useRef, useState } from "react";
import MainNavBar from "../components/MainNavbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../API/user";
import { getPosts } from "../Actions/Posts";
import Comment from "../components/Comment";
import {
  likethePost,
  unlikethePost,
  savethePost,
  unsavethePost,
} from "../Actions/Posts";
import { deletePost } from "../Actions/Posts";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
//css
import "./Readpost.css";

//material ui compontents
import { CircularProgress } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MenuList from "../components/MenuList";
import { AddComment } from "../API/posts";
import Markdownrender from "../components/Markdownrender";
import Footer from "../components/Footer";

//fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComments,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartFilled,
  faBookmark as faBookmarkFilled,
} from "@fortawesome/free-solid-svg-icons";

function Readpost() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const params = useParams();
  const reftocomment = useRef();
  const navigate = useNavigate();
  const Currentuser = useSelector((state) => state.User.userdata);
  const [NewComment, setNewComment] = useState();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [post, setPost] = useState(null);
  const [authoruser, setauthoruser] = useState(null);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [isSaved, setsaved] = useState(
    post?.Saves.includes(Currentuser?._id) ? true : false
  );
  const [isliked, setliked] = useState(false);

  //to handle refresh
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    const temp = posts.filter((curr) => curr._id === params.id)[0];
    setPost(temp);
  }, [posts, params]);

  useEffect(() => {
    const newstate = post?.Likes.includes(Currentuser?._id) ? true : false;
    setliked(newstate);
  }, [post]);

  //TODO: manage in reducer ig
  useEffect(() => {
    async function getUserData() {
      const userData = await getUser(post?.Author);
      setauthoruser(userData.data);
    }
    if (post) {
      getUserData();
    }
  }, [post]);

  function handleAddcomment() {
    setPost({
      ...post,
      comments: [
        ...post.comments,
        { Author: Currentuser?._id, desc: NewComment },
      ],
    });
    AddComment({ Author: Currentuser?._id, desc: NewComment }, post._id);
  }

  function likethearticle() {
    setliked(!isliked);
    if (!isliked) {
      dispatch(likethePost(Currentuser?._id, post?._id));
    } else {
      dispatch(unlikethePost(Currentuser?._id, post?._id));
    }
  }

  //TODO: need to add
  function savethearticle() {
    setsaved(!isSaved);
    if (!isSaved) {
      dispatch(savethePost(Currentuser?._id, post?._id));
    } else {
      dispatch(unsavethePost(Currentuser?._id, post?._id));
    }
  }

  return post && authoruser ? (
    <>
      <MainNavBar></MainNavBar>
      <div className="flex flex-row max-lg:flex-col max-lg:justify-center min-h-screen bg-slate-200 mt-10 pt-10 lg:pl-16 lg:pr-10">
        <div className="flex flex-col max-lg:flex-row pt-10 m-3 text-2xl font-Poppins items-center gap-4">
          <div className="flex flex-col items-center">
            {isliked ? (
              <FontAwesomeIcon
                icon={faHeartFilled}
                className="transition-all duration-300 text-pink-500"
                onClick={likethearticle}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                className="transition-all duration-300 text-pink-500"
                onClick={likethearticle}
              />
            )}
            <span className="text-xl">{post.Likes.length}</span>
          </div>
          <div className="flex flex-col items-center">
            {isSaved ? (
              <FontAwesomeIcon
                icon={faBookmarkFilled}
                className="transition-all duration-300"
                onClick={savethearticle}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBookmark}
                className="transition-all duration-300"
                onClick={savethearticle}
              />
            )}
            <span className="text-xl">{post.Saves.length}</span>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faComments} className="text-orange-500" />
            <span className="text-xl">{post.comments.length}</span>
          </div>
        </div>
        <div className="flex flex-col bg-white mt-10 mb-10 rounded-md max-md:w-screen box-border w-[700px] lg:ml-3 lg:mr-3 ring-1 ring-gray-300 ">
          {post?.CoverImage && (
            <img
              className="object-contain max-md:rounded-md max-md:rounded-b-none"
              alt="Cover"
              src={PF + post?.CoverImage}
            ></img>
          )}
          <div className="p-3">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className="font-Poppins text-6xl">{post?.Title}</h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* {isliked ? (
                <ThumbUpIcon
                  style={{ cursor: "pointer" }}
                  className="icons"
                  fontSize="large"
                  onClick={likethearticle}
                ></ThumbUpIcon>
              ) : (
                <ThumbUpOffAltIcon
                  style={{ cursor: "pointer" }}
                  fontSize="large"
                  className="icons"
                  onClick={likethearticle}
                ></ThumbUpOffAltIcon>
              )}
              <a
                href=" "
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "1.2rem",
                }}
              >
                {post?.Likes.length}
              </a> */}
                {Currentuser?._id === authoruser?._id && (
                  <div style={{ display: "flex", alignItems: "end" }}>
                    <DeleteIcon
                      fontSize="large"
                      style={{ color: "black", cursor: "pointer" }}
                      onClick={() => {
                        dispatch(deletePost(post?._id));
                        navigate("/main");
                      }}
                    ></DeleteIcon>
                    {/* <Button variant="contained" style={{backgroundColor:"black", height:"fit-content"}}>edit</Button> */}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 mb-4 w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full mr-2 p-0">
              <Link to={`/Profile/${authoruser._id}`}>
                <img
                  src={
                    authoruser?.ProfilePicture
                      ? PF + authoruser.ProfilePicture
                      : PF + "dummy-profile-pic.png"
                  }
                ></img>
              </Link>
              <div>
                <Link to={`/Profile/${authoruser._id}`} className="font-Poppins ">
                  <a href="">
                    <b>By</b> {authoruser?.username}
                  </a>
                </Link>
                <div>
                  {
                    monthNames[
                      new Date(post.createdAt.slice(0, 115)).getMonth()
                    ]
                  }{" "}
                  {new Date(post.createdAt.slice(0, 115)).getDate()},{" "}
                  {new Date(post.createdAt.slice(0, 115)).getFullYear()}
                </div>
              </div>
            </div>
            <div>
              {post.Tags.map((tag) => {
                return (
                  <a className="grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-Poppins text-xs font-bold text-gray-900">
                    {tag}
                  </a>
                );
              })}
            </div>

            <div className="text-xl font-Poppins">
              {post && (
                <Markdownrender content={post?.Content}></Markdownrender>
              )}
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className="w-full rounded-lg md:p-3">
              <h3 className="font-semibold font-Poppins text-xl p-1">Discussion</h3>
              <div className="flex flex-col gap-5 m-3">
                <div>
                  <div className="flex w-full justify-between">
                    <div className="p-3 ">
                      <div className="flex gap-3 items-center">
                        <img
                          src="https://avatars.githubusercontent.com/u/22263436?v=4"
                          className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                        />
                        <h3 className="font-bold font-Poppins">
                          User 1
                          <br />
                          <span className="text-sm text-gray-400">
                            Level 1
                          </span>
                        </h3>
                      </div>
                      <p className="text-gray-600 mt-2">
                        this is sample commnent
                      </p>
                     
                    </div>
                   
                  </div>
                  {/* Reply Container  */}
                  <div className="text-gray-300 font-bold pl-14"></div>
                  <div className="flex justify-between border ml-5  rounded-md">
                    <div className="p-3">
                      <div className="flex gap-3 items-center">
                        <img
                          src="https://avatars.githubusercontent.com/u/22263436?v=4"
                          className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                        />
                        <h3 className="font-bold">
                          User 2
                          <br />
                          <span className="text-sm text-gray-400 font-normal">
                            Level 1
                          </span>
                        </h3>
                      </div>
                      <p className="text-gray-600 mt-2">
                        this is sample commnent
                      </p>
                    </div>
                    {/* <div className="flex flex-col gap-3 pr-3 py-3">
                      <div>
                        <svg
                          className="w-6 h-6 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </div>
                      <div>
                        <svg
                          className="w-6 h-6 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </div>
                    </div> */}
                  </div>
                  {/* END Reply Container  */}
                 
                </div>
                {/* END Comment Container  */}
              </div>
              <div className="w-full px-3 mb-2 mt-6">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Comment"
                  required=""
                  defaultValue={""}
                />
              </div>
              <div className="w-full flex justify-end px-3 my-3">
                <input
                  type="submit"
                  className="px-2.5 py-1.5 rounded-md text-white text-sm bg-black text-lg  hover:bg-gray-700 hover:pointer"
                  defaultValue="Post Comment"
                />
              </div>
            </div>

            {/* <div className="CommentPart">
              <h2>Discussion</h2>
              <form className="makecomment">
                <Link to={`/Profile/${authoruser._id}`}>
                  <Avatar src={PF + Currentuser?.ProfilePicture}></Avatar>
                </Link>
                <TextareaAutosize
                  ref={reftocomment}
                  value={NewComment}
                  style={{ flex: 7, height: "40px" }}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                ></TextareaAutosize>
              </form>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    background: "black",
                    color: "white",
                    margin: "10px",
                  }}
                  onClick={() => {
                    handleAddcomment();
                    setNewComment("");
                  }}
                >
                  Add comment
                </Button>
              </div>
              {post.comments.map((data) => {
                return <Comment details={data}></Comment>;
              })}
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <CircularProgress className="flex h-screen w-screen justify-center align-middle text-black"></CircularProgress>
  );
}

export default Readpost;
