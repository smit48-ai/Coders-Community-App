import React, { useEffect } from 'react'
import Menulist from "../components/MenuList";
import {useDispatch, useSelector} from "react-redux";
import { useState } from 'react';
import Card from "../components/Card";
import MainNavBar from '../components/MainNavbar';
import { getPosts } from '../Actions/Posts';
import './SavePage.css';

const SavePage = () => {
  const allposts=useSelector((state)=>state.posts);
  const dispatch=useDispatch();
  const [SavedPost,SetSavedPosts]=useState([]);
  const CurrentUser=useSelector((state)=>state.User.userdata);
  useEffect(()=>{
      dispatch(getPosts());
  },[dispatch])
  useEffect(()=>{
    if(allposts){
      const newSavedPosts=allposts?.filter((post)=>post.Saves.includes(CurrentUser?._id));
      SetSavedPosts(newSavedPosts);
    }
  },[allposts,CurrentUser]);

  return (
    <div style={{backgroundColor:"#EEEE", height:"140vh"}}>
    <MainNavBar></MainNavBar>
    <div className='Saves-container'>
        <h1 style={{}}>Your Saved Posts</h1>
        <div style={{display:"flex", gap:"10px", flexWrap:"wrap", height:"70vh", overflowY:"scroll"}}>
             {
                SavedPost.map((x)=>{
                    return <div>
                        <Card key={x._id} post={x}></Card>
                    </div>
                })
             }
        </div>
    </div>
    </div>
  )
}

export default SavePage