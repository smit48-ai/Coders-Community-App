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
    <Card className='card' sx={{ maxWidth: 345, width:150, height:"fit-content", margin:2}}>
    <CardMedia
      sx={{ height: 100 }}
      image={props.user.ProfilePicture? PF+props.user.ProfilePicture : PF+'dummy-profile-pic.png'}
    />
    <CardContent>
      <Link style={{textDecoration:"none", color:"black", }}to={`/Profile/${props.user._id}`}>
      <h2 style={{ margin:"0px", marginLeft:"20px",}}>
      {props.user.username}
      </h2>
      </Link>
    </CardContent>
    <CardActions>
    <Button variant='contained' style={{background:"black", margin:"auto"}} onClick={()=>{
      handlefollow();      
     }}>{!isFollow?'Follow':'UnFollow'}</Button>
    </CardActions>
  </Card>
  )
}

export default Usercard