import React, { useEffect, useRef, useState } from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { logout } from '../Actions/Auth';
import { getCurrentUser } from '../Actions/user';
import { useDispatch, useSelector } from 'react-redux';
import isAuthenticated from '../assests/isAuthenticated';
import { postbysearch } from '../Actions/Posts';

//css
import './MainNavbar.css';

//Material ui
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from './MenuList';
import SearchIcon from '@mui/icons-material/Search';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';





//TODO: edit search bar
function MainNavBar(props){
    // console.log("Mainnavbar rendered");

    ///state to check that wether the menu is open or not
    const [open,setopen]= useState(false);
    const reftosearch=useRef();
    const [serachitem,setSearchitem]=useState("");
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const user = useSelector((state)=>state.User.userdata);

    function HandleLogout(){
        dispatch(logout());
    }
    function slidingmenu(){
        setopen(!open);
    }
    return <nav className='Navbar'>
            <div className='hameburger'>
                <MenuIcon onClick={slidingmenu} className='menuicon' fontSize='large' sx={{ display: { xs: 'block', md: 'none' }}}/>
                <Link to="/Main" style={{textDecoration:"none", color:"white"}}><h1>Transfer</h1></Link>
            </div>
            {open && <MenuList isopen={open} closemenu={slidingmenu}/>}
            {location.pathname==='/Main' && <div className='SearchBar'>
                 <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <input ref={reftosearch} value={serachitem} type="search" className="searchbar" onChange={(e)=>{
                        setSearchitem(e.target.value);
                  }}></input>
                  <SearchIcon fontSize="medium" style={{cursor:"pointer", border:"2px solid white", borderRadius:"0 10px 10px 0 "}} onClick={(e)=>{
                      dispatch(postbysearch(serachitem));
                  }}></SearchIcon>
                </ButtonGroup>
            </div>}
            <div className='Menu'>
               <NotificationsIcon className="notification-icon" fontSize='large'/>
               <Link to={`/Profile/${user?._id}`}>
               <Avatar src={PF + user?.ProfilePicture} />
               </Link>
               <LogoutIcon onClick={HandleLogout} style={{cursor:"pointer"}}></LogoutIcon>
            </div>
    </nav>
}

export default MainNavBar;