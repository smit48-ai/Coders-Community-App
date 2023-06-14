import React, { useEffect, useState } from 'react';
import { getUser } from '../API/user';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likethePost, unlikethePost, savethePost, unsavethePost , deletePost} from '../Actions/Posts';
//css
import './Card.css';

//material ui
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';



function Card(props){
   const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
   ];
  
   const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const date=new Date(props.post.createdAt.slice(0,115));
    const currentuser=useSelector((state)=>state.User.userdata);
    const [isSaved,setsaved]=useState(props.post.Saves.includes(currentuser._id)?true:false);
    const [isliked,setliked]=useState(props.post.Likes.includes(currentuser._id)?true:false);
    const [authoruser,setauthoruser]=useState({});
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    function likethearticle(){
      setliked(!isliked);
      if(!isliked){
         dispatch(likethePost(currentuser?._id, props.post._id));
      }
      else{
         dispatch(unlikethePost(currentuser?._id, props.post._id))
      }
    }

    function savethearticle(){
      setsaved(!isSaved);
      if(!isSaved){
         dispatch(savethePost(currentuser?._id, props.post._id));
      }
      else{
         dispatch(unsavethePost(currentuser?._id, props.post._id))
      }
    }
    
   useEffect(()=>{
      async function getUserData(){
      const userData=await getUser(props.post.Author);
      setauthoruser(userData.data);
    }
    getUserData();
   },[props]);

    return <div className='Card'>
         {props.post.CoverImage && <Link to={`/ReadPost/${props.post._id}`}><img src={PF + props.post.CoverImage}></img></Link>}
         <div className='mainsection'>
            <div>
              <h1 className='Heading' onClick={()=>{
                navigate(`/ReadPost/${props.post._id}`)
              }}>{props.post.Title}</h1>
            
            </div>
        
         <div className='persondetails'>
            <div style={{display:"flex", alignItems:"center"}}>
            <Link to={`/Profile/${authoruser?._id}`}><img src={authoruser.ProfilePicture?PF+authoruser.ProfilePicture:PF+'dummy-profile-pic.png'}></img></Link>
               <div>
                  <a href=""><Link to={`/Profile/${authoruser?._id}`}>By {authoruser.username}</Link></a>
                  <div>{monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</div>
               </div>
            </div>
             
               {currentuser?._id===authoruser?._id && <div style={{display:"flex", alignItems:"end"}}>
                 <DeleteIcon fontSize='large' style={{color:"black", cursor:"pointer"}} onClick={()=>{
                   dispatch(deletePost(props.post._id));
                 }}></DeleteIcon>
                 {/* <Button variant="contained" style={{backgroundColor:"black", height:"fit-content"}}>edit</Button> */}
              </div>
}
         </div>
         <div className='Tags'>
            {props.post.Tags.map((tag)=>{
                 return <a href=" ">{tag}</a>
              })
            }
         </div>
         <div className='btn'>
            <div className='btn-first'>
               {isliked?<ThumbUpIcon style={{cursor:"pointer"}} className='icons' onClick={likethearticle}></ThumbUpIcon>:<ThumbUpOffAltIcon  style={{cursor:"pointer"}} className='icons' onClick={likethearticle}></ThumbUpOffAltIcon>}<a href=" ">{props.post.Likes.length} likes</a>
               <CommentIcon className='icons'></CommentIcon><a href=" ">{props.post.comments.length} comments</a>
            </div>
            <span>{isSaved?<BookmarkIcon  style={{cursor:"pointer"}} className='icons' onClick={savethearticle}></BookmarkIcon>:<BookmarkBorderOutlinedIcon  style={{cursor:"pointer"}} className='icons' onClick={savethearticle}></BookmarkBorderOutlinedIcon>}</span>
         </div>
         </div>
    </div>
}
export default Card;