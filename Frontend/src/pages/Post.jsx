import React from 'react';
import Header from '../components/Header';
import Postform from '../components/Postform';
import './Post.css';
import MainNavBar from '../components/MainNavbar';
import MenuList from '../components/MenuList';

function Post(){
     
    return <div className='Postpage'>
           <MainNavBar></MainNavBar>
           <div style={{display:"flex", overflowY:"scroll"}}>
              <Postform></Postform>
           </div>
    </div>
 }
 
 export default Post;