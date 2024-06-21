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
     
     return <div className=' mx-0'>
            <div className='font-Poppins mx-0'>
                 <ul className='flex gap-2 text-xl'>
                  <li className='hover:bg-white hover:text-blue-500 p-2 rounded-md hover:cursor-pointer'>Feed</li>
                  <li className='hover:bg-white hover:text-blue-500 p-2 rounded-md hover:cursor-pointer'>Recommended</li>
                  <li className='hover:bg-white hover:text-blue-500 p-2 rounded-md hover:cursor-pointer'>Top</li>
                 </ul>
            </div>
            <div className=' mx-0'>
             {allposts? allposts?.map((x)=>{
               return <Card key={x._id} post={x}/>
             }):<CircularProgress style={{color:"black"}}></CircularProgress>}    
           </div> 
     </div>
}

export default Feedpage;