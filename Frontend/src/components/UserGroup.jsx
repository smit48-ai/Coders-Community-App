import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TopFollowed } from '../Actions/user';
import Usercard from '../components/usercard';
import './Usergroup.css';

const UserGroup = () => {
  const Topusers=useSelector((state)=>state.User.Topusers);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(TopFollowed());
  },[dispatch]);

  return (
    <div className='usergroup'>
    <h2 className='TopFollow-heading' style={{margin:"70px auto 12px"}}>Top Followed Users</h2>
     <div style={{display:"flex", flexWrap:"wrap", overflowY:"scroll", height:"70vh"}}>
     {Topusers && Topusers.map((x)=>{
        return <Usercard className="usercard" key={Topusers._id} user={x}/>
    })
   }
   </div>
  </div>
   
   
  );
}

export default UserGroup