import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

//material ui compontents
import { AddComment } from "../API/posts";
import Markdownrender from "../components/Markdownrender";
import Footer from "../components/Footer";
import { TrashIcon } from "@heroicons/react/outline";

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
import Spinner from "../components/Spinner";
import SimpleNavBar from "../components/SimpleNavBar";

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
  }, [post, Currentuser]);

  useEffect(() => {
    const newstate = post?.Saves.includes(Currentuser?._id) ? true : false;
    setsaved(newstate);
  }, [post, Currentuser]);

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
      <SimpleNavBar location={"Read Post"} />
      <div className="flex flex-row max-lg:flex-col max-lg:justify-center min-h-screen bg-slate-200 lg:pl-16 lg:pr-10">
        <div className="hidden lg:block">
          <div className="flex flex-col lg:pt-10 lg:m-3 text-2xl font-Poppins items-center gap-4">
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
        </div>

        <div className="flex flex-col bg-white lg:mt-10 lg:mb-10  lg:rounded-md max-md:w-screen box-border w-[1000px] lg:ml-3 lg:mr-3 ring-1 ring-gray-300 ">
          <div className="block lg:hidden">
            <div className="flex mt-5 mb-3 mr-3 ml-3 text-1xl font-Poppins items-center gap-4 justify-end">
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
                <FontAwesomeIcon
                  icon={faComments}
                  className="text-orange-500"
                />
                <span className="text-xl">{post.comments.length}</span>
              </div>
            </div>
          </div>
          {post?.CoverImage && (
            <img
              className="object-contain max-md:rounded-md max-md:rounded-b-none"
              alt="Cover"
              src={PF + post?.CoverImage}
            ></img>
          )}
          <div className="p-3">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className="font-Poppins text-6xl max-sm:text-3xl">
                {post?.Title}
              </h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                {Currentuser?._id === authoruser?._id && (
                  <div style={{ display: "flex", alignItems: "end" }}>
                    <TrashIcon
                      className="h-6 w-6 text-red-500 md:h-10 md:w-10 cursor-pointer"
                      onClick={() => {
                        dispatch(deletePost(post?._id));
                        navigate("/main");
                      }}
                    ></TrashIcon>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center mt-4 mb-4">
              <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full mr-2 p-0">
                <Link to={`/Profile/${authoruser._id}`}>
                  <img
                    src={
                      authoruser?.ProfilePicture
                        ? authoruser.ProfilePicture.startsWith("https")
                          ? authoruser.ProfilePicture
                          : PF + authoruser.ProfilePicture
                        : PF + "dummy-profile-pic.png"
                    }
                    alt="profile"
                  ></img>
                </Link>
              </div>
              <div className="font-Poppins text-sm flex flex-col ml-2">
                <Link
                  to={`/Profile/${authoruser._id}`}
                  className="font-Poppins text-black"
                >
                  <b>By</b> {authoruser?.username}
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

            <div className="text-xl font-Poppins">
              {post && (
                <Markdownrender content={post?.Content}></Markdownrender>
              )}
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div
              className="w-full rounded-lg md:p-3 bg-gray-100  shadow-lg border border-gray-200  rounded-md p-4 my-6"
              style={{
                boxShadow: "inset 0 1px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3 className="font-semibold font-Poppins text-xl p-1">
                Discussion
              </h3>
              <div className="flex flex-col gap-5 m-3 font-Poppins ">
                {post.comments.map((data) => {
                  return <Comment details={data}></Comment>;
                })}
              </div>
              <div className="w-full px-3 mb-2 mt-6 font-Poppins">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Comment"
                  required=""
                  defaultValue={""}
                  ref={reftocomment}
                  value={NewComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex justify-end px-3 my-3 font-Poppins">
                <input
                  type="submit"
                  className="px-2.5 py-1.5 rounded-md text-white text-sm bg-black text-lg  hover:bg-gray-700 hover:pointer"
                  defaultValue="Post Comment"
                  onClick={() => {
                    handleAddcomment();
                    setNewComment("");
                  }}
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
    <Spinner />
  );
}

export default Readpost;
