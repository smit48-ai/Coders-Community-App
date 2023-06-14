import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../Actions/Posts';
import Card from './Card'
import './Feedpage.css'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


//TODO: sort the posts by latest
function Feedpage(){
     const dispatch=useDispatch();
     const navigate=useNavigate();
     const allposts=useSelector((state)=>state.posts);
     useEffect(()=>{
         dispatch(getPosts());
     },[dispatch]);
     
     return <div className='Feedpage'>
            <div className='typesoffeed'>
                 <ul>
                  <li style={{textDecoration:"underline"}}>Your feed</li>
                  <li>Recommended</li>
                  <li>Top</li>
                 </ul>
            </div>
            <div className='feeds'>
             {allposts? allposts?.map((x)=>{
               return <Card key={x._id} post={x}/>
             }):<CircularProgress style={{color:"black"}}></CircularProgress>}    
           </div> 
     </div>
}

export default Feedpage;