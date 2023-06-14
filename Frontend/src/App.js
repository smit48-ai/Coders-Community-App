import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


//React Components
import Home from './pages/Home';
import Main from './pages/Main';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Readpost from './pages/Readpost';
import LoginPage from './pages/Login';
import Pagenotfound from'./pages/Pagenotfound';
import isAuthenticated from './assests/isAuthenticated';
import { getCurrentUser } from './Actions/user';
import { logout } from './Actions/Auth';
import Emailverification from './pages/Emailverification';
import VerifyEmail from './pages/VerifyEmail';
import SavePage from './pages/SavePage';


function App() {
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.User);
    const [isLoggedin,setisLoggedin]=useState(false);
    useEffect(()=>{
      if(isAuthenticated()){
        dispatch(getCurrentUser());
      }
    },[dispatch]);
    useEffect(()=>{
       setisLoggedin(isAuthenticated());
    },[user]);
    
  return (
    
        <Routes>
           <Route exact path="/" element={<Home/>}></Route>
           <Route exact path="/Login" element={!isLoggedin || !user?.userdata?.isEmailVerified?<LoginPage/>:<Navigate replace to="/Main"></Navigate>}></Route>
           <Route path="/Main" element={isLoggedin?<Main/>:<Navigate replace to="/Login"></Navigate>}></Route>
           <Route path="/Post" element={isLoggedin?<Post/>:<Navigate to="/Login"></Navigate>}></Route>
           <Route path="/Profile/:id" element={isLoggedin?<Profile/>:<Navigate to="/Login"></Navigate>}></Route>
           <Route path="/Readpost/:id" element={isLoggedin?<Readpost/>:<Navigate to="/Login"></Navigate>}></Route>
           <Route path="/SavePosts" element={isLoggedin?<SavePage/>:<Navigate to="/Login"></Navigate>}></Route>
           <Route path="/:id/verify/:token" element={<Emailverification/>}></Route>
           <Route path="/VerifyPage" element={<VerifyEmail/>}></Route>
           <Route path="*" element={<Pagenotfound/>}></Route>
        </Routes>

  );
}

export default App;
