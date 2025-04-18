import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//material ui
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

//actions
import { createPost } from "../Actions/Posts";
import { useNavigate } from "react-router-dom";
import TextEditor from "./TextEditor";

function Postform() {
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const CurrentUser = useSelector((state) => state.User.userdata);
  const [TagName, setTagName] = useState("");
  const [formdata, setfromdata] = useState({
    Title: "",
    Author: "",
    Tags: [],
    Content: "",
    CoverImage: null,
  });

  //reffernce to textarea element same as selectior in js
  const textarea = useRef(null);

  //Publish the post
  function Publish(event) {
    event.preventDefault();
    formdata.Author = CurrentUser._id;
    dispatch(createPost(formdata));
    setopen(true);
    setTimeout(() => {
      setopen(false);
    }, 3000);
    setfromdata({
      Title: "",
      Author: "",
      Tags: [],
      Content: "",
      CoverImage: null,
      Likes: 0,
    });
  }

  return (
    <form
      id="postform"
      method="post"
      encType="multipart/form-data"
      onSubmit={Publish}
      className="w-full h-full lg:p-5 sm:pt-5 max-lg:p-5"
    >
      <div className="font-Poppins">
        <div className="mt-3 mb-3">
          <div style={{ display: "flex" }}>
            <input
              id="Coverimage"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setfromdata({ ...formdata, CoverImage: e.target.files[0] });
              }}
            ></input>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-950 text-white font-bold font-Poppins py-2 px-4 rounded mb-3 mt-3"
              onClick={() => {
                document.getElementById("Coverimage").click();
              }}
            >
              Cover Image
            </button>
            <h3>{formdata.CoverImage?.name}</h3>
          </div>
          <div className="">
            <input
              type="text"
              required={true}
              placeholder="Title.."
              name="Title"
              value={formdata.Title}
              onChange={(e) =>
                setfromdata({ ...formdata, Title: e.target.value })
              }
              className="text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </div>
        </div>
        <TextEditor formdata={formdata} setfromdata={setfromdata} />
      </div>
      <button
        type="submit"
        className="bg-gray-900 hover:bg-gray-950 text-white font-bold font-Poppins py-2 px-4 rounded mt-5"
        onClick={Publish}
      >
        Publish
      </button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          variant="contained"
          severity="success"
          sx={{ width: "100%", background: "green", color: "white" }}
        >
          Post is Published successfully
        </Alert>
      </Snackbar>
    </form>
  );
}
export default Postform;
