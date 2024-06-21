import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FollowUser, TopFollowed, UnFollowUser} from '../Actions/user';

const Usercard = (props) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch=useDispatch();
  const currentuser=useSelector((state)=>state.User.userdata);
  const [isFollow, setisFollow]=useState(currentuser?.Following.includes(props.user._id)?true:false);
  useEffect(()=>{
    const newstate=currentuser?.Following.includes(props.user._id)?true:false;
    setisFollow(newstate);
  },[currentuser,props]);

  useEffect(()=>{
    dispatch(TopFollowed());
  },[dispatch, isFollow])

  async function handlefollow(){
    if(!isFollow){
       dispatch(FollowUser(currentuser?._id,props.user._id));
    }
    else{
      dispatch(UnFollowUser(currentuser?._id,props.user._id));
    }
    setisFollow(!isFollow);
 }
  return (
    <>
        <li key={props.user._id} className="flex justify-between gap-x-6 py-5 min-w-[300px] font-Poppins ">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50"  src={props.user.ProfilePicture? PF+props.user.ProfilePicture : PF+'dummy-profile-pic.png'} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 "> {props.user.username}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500"> {props.user.emailid}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            
          </div>
        </li>
    </>
  //   <Card className='card' sx={{ maxWidth: 345, width:150, height:"fit-content", margin:2}}>
  //   <CardMedia
  //     sx={{ height: 100 }}
  //     image={props.user.ProfilePicture? PF+props.user.ProfilePicture : PF+'dummy-profile-pic.png'}
  //   />
  //   <CardContent>
  //     <Link style={{textDecoration:"none", color:"black", }}to={`/Profile/${props.user._id}`}>
  //     <h2 style={{ margin:"0px", marginLeft:"20px",}}>
  //     {props.user.username}
  //     </h2>
  //     </Link>
  //   </CardContent>
  //   <CardActions>
  //   <Button variant='contained' style={{background:"black", margin:"auto"}} onClick={()=>{
  //     handlefollow();      
  //    }}>{!isFollow?'Follow':'UnFollow'}</Button>
  //   </CardActions>
  // </Card>
  )
}

export default Usercard