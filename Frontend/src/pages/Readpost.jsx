import React, { useEffect, useRef, useState } from "react";
import MainNavBar from "../components/MainNavbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../API/user";
import { getPosts } from "../Actions/Posts";
import Comment from "../components/Comment";
import { likethePost, unlikethePost, savethePost, unsavethePost } from '../Actions/Posts';
import { deletePost } from "../Actions/Posts";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
//css
import "./Readpost.css";

//material ui compontents
import { CircularProgress } from '@mui/material';
import {Avatar} from '@mui/material';
import {Button} from '@mui/material';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MenuList from "../components/MenuList";
import { AddComment } from "../API/posts";
import Markdownrender from "../components/Markdownrender";




function Readpost() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const params=useParams();
  const reftocomment=useRef();
  const navigate=useNavigate();
  const Currentuser=useSelector((state)=>state.User.userdata);
  const [NewComment, setNewComment]=useState();
  const dispatch=useDispatch();
  const posts=useSelector((state)=>state.posts);
  const [post,setPost]=useState(null);
  const [authoruser,setauthoruser]=useState(null);
  const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
   ];

  const [isSaved,setsaved]=useState(post?.Saves.includes(Currentuser?._id)?true:false);
  const [isliked,setliked]=useState(  false);


  //to handle refresh
  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch])


  useEffect(()=>{
    const temp=posts.filter((curr)=>(curr._id===params.id))[0];
    setPost(temp);
   
  },[posts,params])

  useEffect(()=>{
    const newstate=post?.Likes.includes(Currentuser?._id)?true:false;
    setliked(newstate);
  },[post]);


  //TODO: manage in reducer ig
  useEffect(()=>{
      async function getUserData(){
       const userData=await getUser(post?.Author);
       setauthoruser(userData.data);
     }
     if(post){
      getUserData();
    } 
  },[post]);

  function handleAddcomment(){
    setPost({...post,comments:[...post.comments,{Author:Currentuser?._id,desc:NewComment}]});
    AddComment({Author:Currentuser?._id,desc:NewComment},post._id);
  }

  function likethearticle(){
    setliked(!isliked);
    if(!isliked){
       dispatch(likethePost(Currentuser?._id, post?._id));
    }
    else{
       dispatch(unlikethePost(Currentuser?._id, post?._id))
    }
  }

  //TODO: need to add
  function savethearticle(){
    setsaved(!isSaved);
    if(!isSaved){
       dispatch(savethePost(Currentuser?._id, post?._id));
    }
    else{
       dispatch(unsavethePost(Currentuser?._id, post?._id))
    }
  }


  return (
    (post && authoruser)?
    <>
    <MainNavBar></MainNavBar>
    <div className="Readpost">
      <MenuList></MenuList>
      <div className="Reading">
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <h1 className="Heading">{post?.Title}</h1>
            <div style={{display:"flex", alignItems:"center"}}>
            {isliked?<ThumbUpIcon style={{cursor:"pointer"}} className='icons' fontSize="large" onClick={likethearticle}></ThumbUpIcon>:<ThumbUpOffAltIcon style={{cursor:"pointer"}} fontSize="large" className='icons' onClick={likethearticle}></ThumbUpOffAltIcon>}<a href=" " style={{textDecoration:"none", color:"black", fontSize:"1.2rem"}}>{post?.Likes.length}</a>
            {Currentuser?._id===authoruser?._id && <div style={{display:"flex", alignItems:"end"}}>
                 <DeleteIcon fontSize='large' style={{color:"black", cursor:"pointer"}} onClick={()=>{
                   dispatch(deletePost(post?._id));
                   navigate("/main");
                 }}></DeleteIcon>
                 {/* <Button variant="contained" style={{backgroundColor:"black", height:"fit-content"}}>edit</Button> */}
              </div>
}
            </div>
        </div>
        
        <div className="persondetails" style={{justifyContent:"flex-start"}}>
          <Link to={`/Profile/${authoruser._id}`}><img src={(authoruser?.ProfilePicture?PF+authoruser.ProfilePicture:PF+'dummy-profile-pic.png')}></img></Link>
          <div>
            <Link to={`/Profile/${authoruser._id}`}><a href=""><b>By</b> {authoruser?.username}</a></Link>
            <div>{
            monthNames[new Date(post.createdAt.slice(0,115)).getMonth()]} {new Date(post.createdAt.slice(0,115)).getDate()}, {new Date(post.createdAt.slice(0,115)).getFullYear()}</div>
          </div>
        </div>
        <div className="Tags">
          {post.Tags.map((tag)=>{
            return <a href="">{tag}</a>
          })
          }
        </div>
        <div style={{textAlign:"center"}}>
          {post?.CoverImage && <img style={{width:"300px", height:"300px"}}src={PF+post?.CoverImage}></img>}
        </div>
        <div className="Contentpart">
          {post && <Markdownrender content={post?.Content}></Markdownrender>}
        </div>
      <div style={{borderTop:"2px solid black"}}></div>
      <div className="CommentPart">
        <h2>Discussion</h2>
        <form className="makecomment">
        <Link to={`/Profile/${authoruser._id}`}><Avatar src={PF+Currentuser?.ProfilePicture}></Avatar></Link>
            <TextareaAutosize ref={reftocomment} value={NewComment} style={{flex:7,height:"40px"}} onChange={(e)=>{
                 setNewComment(e.target.value);
            }}></TextareaAutosize>
        </form>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
        <Button variant='contained' size="small" style={{background:"black", color:"white", margin:"10px"}} onClick={()=>{
           handleAddcomment();
           setNewComment("");
        }}>Add comment</Button>
        </div>
        {
          post.comments.map((data)=>{
             return <Comment details={data}></Comment>
          })
        }
      </div>
      </div>
      </div>
    </>
    :<CircularProgress style={{color:"black"}}></CircularProgress>
  );
}

export default Readpost;
