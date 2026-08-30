import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../API/user";
import { UpdateProfileImg, UpdateCoverImg } from "../Actions/user";
import Card from "../components/Card";
import { UpdateBio } from "../Actions/user";
import { FollowUser, UnFollowUser } from "../Actions/user";
import SimpleNavBar from "../components/SimpleNavBar";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import UserGroup from "../components/UserGroup";
import Spinner from "../components/Spinner";

// TODO: need to check for the instant profile and cover update

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [canedit, setedit] = useState(false);

  const [user, setuser] = useState(null);
  const posts = useSelector((state) => state.posts);

  const [profileimg, setprofileimg] = useState(null);
  const [coverimg, setcoverimg] = useState(null);

  const currentUser = useSelector((state) => state.User.userdata);
  const allUsers = useSelector((state) => state.User.allUsers);
  const postofuser = posts?.filter((post) => {
    return post.Author === user?._id;
  });

  const [followedUsers, setFollowedUsers] = useState([]);

  const [isFollow, setisFollow] = useState(
    currentUser?.Following.includes(user?._id) ? true : false
  );

  const params = useParams();
  const dispatch = useDispatch();

  const [Interest, setInterest] = useState("");
  const [Formdata, setFromdata] = useState({
    username: "",
    Interests: [],
    Description: "",
    Password: "",
  });

  //getting the list of all the users user is following
  useEffect(() => {
    setFollowedUsers(allUsers?.filter((x) => user?.Following.includes(x._id)));
  }, [user, allUsers]);

  //for follow and unfollow button logic
  useEffect(() => {
    if (user && currentUser) {
      setisFollow(currentUser?.Following.includes(user?._id) ? true : false);
    }
  }, [currentUser, user]);

  //just counting the popsts related to a user
  function CountPosts() {
    var ct = 0;
    if (posts && user) {
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].Author === user._id) {
          ct++;
        }
      }
    }
    return ct;
  }
  const postcount = CountPosts();

  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, [dispatch]);

  useEffect(() => {
    async function getUserData() {
      const userData = await getUser(params.id);
      setuser(userData.data);
    }
    getUserData();
  }, [params]);

  //handling follow unfollow button logic
  function handlefollow() {
    if (!isFollow) {
      dispatch(FollowUser(currentUser?._id, params.id));
      setuser((user) => {
        return { ...user, Followers: [...user.Followers, currentUser._id] };
      });
    } else {
      dispatch(UnFollowUser(currentUser?._id, params.id));
      const newFollowersList = user.Followers.filter(
        (x) => x !== currentUser._id
      );
      setuser((user) => {
        return { ...user, Followers: [...newFollowersList] };
      });
    }
  }

  //for cover and profile images
  useEffect(() => {
    if (profileimg) {
      setuser((user) => {
        return { ...user, ProfilePicture: profileimg.value };
      });
      dispatch(UpdateProfileImg(profileimg, user));
    }
  }, [profileimg, dispatch]);

  useEffect(() => {
    if (coverimg) {
      setuser((user) => {
        return { ...user, CoverPicture: coverimg };
      });
      dispatch(UpdateCoverImg(coverimg, user));
    }
  }, [coverimg, dispatch]);

  //other functions
  function grantedit() {
    setFromdata({
      username: user.username,
      Interests: user.Interests,
      Description: user.Description,
      Password: "",
    });
    setedit((prev) => !prev);
  }

  function handleeditingProfile() {
    setuser({ ...user, ...Formdata });
    dispatch(UpdateBio(Formdata, user._id));
    setedit((prev) => !prev);
  }

  return user && allUsers && currentUser && posts ? (
    <div className="bg-slate-200 font-Poppins">
      <SimpleNavBar location="Profile Page" />
      <div className="flex lg:mx-7 max-lg:flex-col max-lg:items-center justify-center">
        <div className="flex flex-col">
          <div className="flex flex-col ring-1 lg:w-[60vw] w-screen ring-gray-300 bg-white lg:rounded-md lg:m-5">
            <div className="w-full mb-10">
              {/* Cover Image */}
              <div className="relative w-full h-48 sm:h-64 bg-gray-300">
                <img
                  src={
                    user?.CoverPicture
                      ? PF + user?.CoverPicture
                      : "https://images.unsplash.com/photo-1503264116251-35a269479413"
                  }
                  alt="Cover"
                  className="object-cover w-full h-full lg:rounded-tl-md lg:rounded-tr-md"
                />
                {currentUser?._id === user?._id && (
                  <button
                    onClick={() => {
                      document.getElementById("Coverimage").click();
                    }}
                    className="absolute bottom-1 right-1 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <input
                      id="Coverimage"
                      type="file"
                      accept=".jpg,.png"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setcoverimg(e.target.files[0]);
                      }}
                    ></input>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </button>
                )}
                {user?._id === currentUser?._id &&
                  (!canedit ? (
                    <button
                      onClick={grantedit}
                      className="absolute top-4 right-4 px-6 py-2 text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={handleeditingProfile}
                      className="absolute top-4 right-4 px-6 py-2 text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700"
                    >
                      Save
                    </button>
                  ))}

                {/* Profile Picture */}
                <div className="absolute -bottom-12 left-6">
                  <img
                    src={
                      user?.ProfilePicture
                        ? user.ProfilePicture.startsWith("http")
                          ? user.ProfilePicture
                          : PF + user.ProfilePicture
                        : PF + "dummy-profile-pic.png"
                    }
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  {currentUser?._id === user?._id && (
                    <button
                      onClick={() => {
                        document.getElementById("Profileimage").click();
                      }}
                      className="absolute bottom-1 right-1 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <input
                        id="Profileimage"
                        type="file"
                        accept=".jpg,.png"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setprofileimg(e.target.files[0]);
                        }}
                      ></input>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-full w-screen p-5 font-Poppins ">
              {!canedit ? (
                <div className="lg:text-3xl max-sm:text-2xl">
                  {user?.username}
                </div>
              ) : (
                <div className="mt-3">
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={Formdata.username}
                    onChange={(e) =>
                      setFromdata({ ...Formdata, username: e.target.value })
                    }
                    className="mt-2 p-2 border w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
                  />
                </div>
              )}
              {!canedit && (
                <div className="text-gray-500 lg:text-lg">{user?.emailid}</div>
              )}
              {canedit ? (
                <>
                  <div className="mt-3">
                    <h2 className="block text-lg font-medium text-gray-700">
                      Interests
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {Formdata.Interests.map((interest, index) => (
                        <div
                          key={index}
                          className="flex flex-wrap gap-3 px-4 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm hover:shadow-md transition"
                        >
                          <span className="">{interest}</span>
                          <button
                            onClick={() => {
                              const newInterests = Formdata.Interests.filter(
                                (y) => {
                                  if (y === interest) {
                                    return false;
                                  } else {
                                    return true;
                                  }
                                }
                              );
                              setFromdata({
                                ...Formdata,
                                Interests: newInterests,
                              });
                            }}
                            className="text-black text-xs"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="text"
                        value={Interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="p-2 border w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        placeholder="Add an interest"
                      />
                      <button
                        onClick={() => {
                          setFromdata({
                            ...Formdata,
                            Interests: [...Formdata.Interests, Interest],
                          });
                          setInterest("");
                        }}
                        className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap gap-3 mt-3">
                  {user?.Interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm hover:shadow-md transition"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
              {user?._id !== currentUser?._id && (
                <button
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition duration-300 shadow 
    bg-gray-700 text-white hover:bg-gray-800"
                  onClick={() => {
                    handlefollow();
                  }}
                >
                  {!isFollow ? "Follow" : "Unfollow"}
                </button>
              )}
              {!canedit ? (
                <div className="text-gray-700 lg:text-md mt-7">
                  {user?.Description}
                </div>
              ) : (
                <div className="mt-3">
                  <label
                    htmlFor="intro"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Intro
                  </label>
                  <textarea
                    id="intro"
                    value={Formdata.Description}
                    onChange={(e) => {
                      setuser({ ...user, Description: e.target.value });
                      setFromdata({ ...Formdata, Description: e.target.value });
                    }}
                    className="mt-2 p-2 w-full h-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
                    placeholder="Tell us about yourself"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col ring-1 lg:w-[60vw] w-screen ring-gray-300 bg-white lg:rounded-md lg:m-5 lg:p-5 max-lg:mt-3 max-lg:h-screen max-lg:overflow-y-scroll">
            <div className="text-2xl max-sm:text-xl m-3 ">Posts</div>
            {postofuser?.map((x) => {
              return <Card post={x}></Card>;
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col ring-1 lg:w-[20vw] w-screen ring-gray-300 bg-white lg:rounded-md lg:m-5 max-lg:mt-3 ">
            <div className="flex p-5 gap-5 items-center justify-center text-center">
              <div>
                <p className="text-xl font-bold text-gray-800">
                  {user?.Followers.length}
                </p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{postcount}</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">
                  {user?.Following.length}
                </p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>
          <UserGroup
            Topusers={followedUsers}
            title="Following"
            className="mt-5"
          />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Spinner />
  );
}

export default Profile;
