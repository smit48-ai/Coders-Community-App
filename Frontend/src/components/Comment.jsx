import React, { useEffect, useState } from "react";
import { getUser } from "../API/user";
import { Link } from "react-router-dom";

export default Comment = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [CommentAuthor, SetCommentAuthor] = useState(null);

  useEffect(() => {
    async function settheauthorofcomment() {
      const data = await getUser(props.details.Author);
      SetCommentAuthor(data.data);
    }
    settheauthorofcomment();
  }, [props]);

  return (
    <>
      <div>
        <div className="flex w-full justify-between">
          <div className="p-3">
            <Link to={`/Profile/${CommentAuthor?._id}`}>
              <div className="flex gap-3 items-center">
                <img
                  src={
                    CommentAuthor?.ProfilePicture
                      ? CommentAuthor.ProfilePicture.startsWith("https")
                        ? CommentAuthor.ProfilePicture
                        : PF + CommentAuthor.ProfilePicture
                      : PF + "dummy_profile_img.png"
                  }
                  className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                  alt="profile"
                />
                <h3 className="font-bold font-Poppins">
                  {CommentAuthor?.username}
                </h3>
              </div>
            </Link>
            <p className="text-gray-600 mt-2">{props.details.desc}</p>
          </div>
        </div>
        <div className="text-gray-300 font-bold pl-14"></div>
      </div>
    </>
  );
};
