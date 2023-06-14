import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import "./Comment.css"
import { useDispatch } from "react-redux";
import { getUser } from "../API/user";
import { Link } from "react-router-dom";


export default Comment=(props)=>{
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    const [CommentAuthor, SetCommentAuthor]=useState(null)

    useEffect(()=>{
      async function settheauthorofcomment(){
        const data=await getUser(props.details.Author);
        SetCommentAuthor(data.data);
      }
      settheauthorofcomment();
    },[props])

    return (
      <>
        <div class="commentCard">
          <Link to={`/Profile/${CommentAuthor?._id}`}><Avatar src={CommentAuthor?.ProfilePicture? PF+CommentAuthor.ProfilePicture: PF+"dummy_profile_img.png"}></Avatar></Link>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <Link style={{textDecoration:"none"}} to={`/Profile/${CommentAuthor?._id}`}><div style={{color:"grey"}}>{CommentAuthor?.username}</div></Link>
                <div>{props.details.desc}</div>
            </div>
        </div>
      </>
    );

};