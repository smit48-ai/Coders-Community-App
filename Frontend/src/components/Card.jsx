import React, { useEffect, useState } from "react";
import { getUser } from "../API/user";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  likethePost,
  unlikethePost,
  savethePost,
  unsavethePost,
} from "../Actions/Posts";

//css
import "./Card.css";

//fontawesome icons
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

function Card(props) {
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

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const date = new Date(props.post.createdAt.slice(0, 115));
  const currentuser = useSelector((state) => state.User.userdata);
  const [isSaved, setsaved] = useState(
    props.post.Saves.includes(currentuser._id) ? true : false
  );
  const [isliked, setliked] = useState(
    props.post.Likes.includes(currentuser._id) ? true : false
  );
  const [authoruser, setauthoruser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function likethearticle() {
    setliked(!isliked);
    if (!isliked) {
      dispatch(likethePost(currentuser?._id, props.post._id));
    } else {
      dispatch(unlikethePost(currentuser?._id, props.post._id));
    }
  }

  function savethearticle() {
    setsaved(!isSaved);
    if (!isSaved) {
      dispatch(savethePost(currentuser?._id, props.post._id));
    } else {
      dispatch(unsavethePost(currentuser?._id, props.post._id));
    }
  }

  //  write a program to handle button click
  useEffect(() => {
    async function getUserData() {
      const userData = await getUser(props.post.Author);
      setauthoruser(userData.data);
    }
    getUserData();
  }, [props]);

  return (
    <div className="sm:rounded-md ring-1 ring-gray-300 bg-white max-w-[700px] max-sm:w-screen w-[700px] font-Poppins mb-3">
      <Link to={`/ReadPost/${props.post._id}`}>
        {props.post.CoverImage && (
          <img
            src={PF + props.post.CoverImage}
            className="object-contain sm:rounded-md sm:rounded-b-none"
            alt="Cover"
          ></img>
        )}
      </Link>
      <div className="p-2.5">
        <h1
          className="mb-3 font-Poppins text-[2.5rem] text-wrap"
          onClick={() => {
            navigate(`/ReadPost/${props.post._id}`);
          }}
        >
          {props?.post.Title}
        </h1>

        <div className="flex items-center justify-between">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/Profile/${authoruser?._id}`}>
              <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full mr-2 p-0">
                <img
                  src={
                    authoruser.ProfilePicture
                      ? authoruser.ProfilePicture.startsWith("https")
                        ? authoruser.ProfilePicture
                        : PF + authoruser.ProfilePicture
                      : PF + "dummy-profile-pic.png"
                  }
                  alt="Profile-Pic"
                  className="w-full h-full rounded-full"
                />
              </div>
            </Link>
            <div>
              <a href="">
                <Link to={`/Profile/${authoruser?._id}`}>
                  By {authoruser.username}
                </Link>
              </a>
              <div>
                {monthNames[date.getMonth()]} {date.getDate()},{" "}
                {date.getFullYear()}
              </div>
            </div>
          </div>
        </div>
        <div className="Tags">
          {props.post.Tags.map((tag) => {
            return <a href=" ">{tag}</a>;
          })}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
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
            <span className="w-[10px]">{props.post.Likes.length}</span>
            <span className="mr-3"> likes</span>
            <FontAwesomeIcon icon={faComments} className="text-orange-500" />
            <span>{props.post.comments.length} comments</span>
          </div>
          <span>
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
          </span>
        </div>
      </div>
    </div>
  );
}
export default Card;
